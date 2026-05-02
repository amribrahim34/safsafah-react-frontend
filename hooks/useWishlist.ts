import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToWishlist, removeFromWishlist } from "../store/slices/wishlistSlice";
import {
  setCurrentProductWishlistStatus,
  silentFetchProductById,
} from "../store/slices/productsSlice";
import type { Product } from "@/types/models/product";
import posthog from "posthog-js";

/**
 * Manages wishlist state for a single product.
 *
 * Value priority (highest to lowest):
 *  1. optimisticStatus — set immediately on click, cleared once server confirms.
 *  2. reduxWishlistStatus — authoritative value from silentFetchProductById.
 *  3. product.isInWishlist — SSR prop (may lack auth context, used as fallback only).
 *
 * On mount a client-side fetch is fired to hydrate the auth-aware status,
 * correcting any unauthenticated SSR value.
 */
export function useWishlist(product: Product | null | undefined) {
  const dispatch = useAppDispatch();
  const { loadingProductId } = useAppSelector((state) => state.wishlist);

  // null = no pending change; boolean = user clicked and server hasn't confirmed yet.
  const [optimisticStatus, setOptimisticStatus] = useState<boolean | null>(null);

  // Authoritative value populated by every silentFetchProductById call.
  const reduxWishlistStatus = useAppSelector((state) =>
    state.products.currentProduct?.id === product?.id
      ? state.products.currentProduct?.isInWishlist
      : undefined
  );

  // Client-side fetch on mount to get the auth-aware status.
  // SSR runs without the user's auth cookie so the initial prop value may be stale.
  useEffect(() => {
    if (product?.id) {
      dispatch(silentFetchProductById(product.id));
    }
  }, [product?.id, dispatch]);

  // Derived — no setState in effects.
  const isInWishlist =
    optimisticStatus !== null
      ? optimisticStatus
      : (reduxWishlistStatus ?? product?.isInWishlist ?? false);

  const isLoading = loadingProductId === product?.id;

  const handleToggleWishlist = async (
    onSuccess?: (action: "added" | "removed") => void
  ) => {
    if (!product || isLoading) return;

    const previousValue = isInWishlist;
    const nextValue = !previousValue;

    // 1. Optimistic update — instant UI feedback, no network wait.
    setOptimisticStatus(nextValue);
    dispatch(setCurrentProductWishlistStatus(nextValue));

    try {
      // 2. API call.
      if (previousValue) {
        await dispatch(removeFromWishlist(product.id)).unwrap();
      } else {
        await dispatch(addToWishlist(product.id)).unwrap();
      }

      // 3. Background re-fetch to confirm server state.
      //    Once Redux is updated, clear the optimistic override and let Redux drive.
      //    If the fetch fails we keep the optimistic value — the API call succeeded,
      //    so it reflects the correct server state.
      dispatch(silentFetchProductById(product.id))
        .unwrap()
        .then(() => setOptimisticStatus(null))
        .catch(() => undefined);

      posthog.capture(
        previousValue ? "wishlist_item_removed" : "wishlist_item_added",
        {
          product_id: product.id,
          product_name_en: product.nameEn,
          product_name_ar: product.nameAr,
          price: product.price,
        }
      );

      onSuccess?.(previousValue ? "removed" : "added");
    } catch (error) {
      posthog.captureException(error);
      console.error("Failed to toggle wishlist:", error);
      // 4. Rollback on API failure — restore both the UI and Redux.
      setOptimisticStatus(previousValue);
      dispatch(setCurrentProductWishlistStatus(previousValue));
    }
  };

  return { isInWishlist, isLoading, handleToggleWishlist };
}
