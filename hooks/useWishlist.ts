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
 * Strategy:
 *  1. Local state drives the UI so optimistic updates are instant.
 *  2. On mount, a client-side fetch hydrates the auth-aware `isInWishlist`
 *     value (SSR fetches are unauthenticated, so the initial prop may be wrong).
 *  3. A useEffect syncs local state whenever Redux receives a fresh value from
 *     any silentFetchProductById call (mount or post-toggle).
 *  4. On toggle: optimistic update → API call → silent re-fetch to confirm.
 *  5. Rollback on error.
 */
export function useWishlist(product: Product | null | undefined) {
  const dispatch = useAppDispatch();
  const { loadingProductId } = useAppSelector((state) => state.wishlist);

  // Local state is the source of truth for the button — gives instant feedback.
  const [isInWishlist, setIsInWishlist] = useState<boolean>(
    product?.isInWishlist ?? false
  );

  // Subscribe to Redux so we pick up the result of every silentFetchProductById.
  const reduxProductId = useAppSelector(
    (state) => state.products.currentProduct?.id
  );
  const reduxWishlistStatus = useAppSelector(
    (state) => state.products.currentProduct?.isInWishlist
  );

  // Sync local state whenever Redux has a fresh authoritative value for this product.
  useEffect(() => {
    if (reduxProductId === product?.id && reduxWishlistStatus !== undefined) {
      setIsInWishlist(reduxWishlistStatus);
    }
  }, [reduxProductId, reduxWishlistStatus, product?.id]);

  // On mount, fetch client-side to get the auth-aware wishlist status.
  // This corrects the SSR-supplied prop which may lack authentication context.
  useEffect(() => {
    if (product?.id) {
      dispatch(silentFetchProductById(product.id));
    }
  }, [product?.id, dispatch]);

  const isLoading = loadingProductId === product?.id;

  const handleToggleWishlist = async (
    onSuccess?: (action: "added" | "removed") => void
  ) => {
    if (!product || isLoading) return;

    const previousValue = isInWishlist;
    const nextValue = !previousValue;

    // 1. Optimistic update — instant UI feedback before any network round-trip.
    setIsInWishlist(nextValue);
    dispatch(setCurrentProductWishlistStatus(nextValue));

    try {
      // 2. API call
      if (previousValue) {
        await dispatch(removeFromWishlist(product.id)).unwrap();
      } else {
        await dispatch(addToWishlist(product.id)).unwrap();
      }

      // 3. Silent background re-fetch to confirm the server's authoritative state.
      dispatch(silentFetchProductById(product.id));

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
      // 4. Rollback on failure.
      setIsInWishlist(previousValue);
      dispatch(setCurrentProductWishlistStatus(previousValue));
    }
  };

  return { isInWishlist, isLoading, handleToggleWishlist };
}
