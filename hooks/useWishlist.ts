import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToWishlist, removeFromWishlist } from "../store/slices/wishlistSlice";
import {
  setCurrentProductWishlistStatus,
  silentFetchProductById,
} from "../store/slices/productsSlice";
import type { Product } from "@/types/models/product";
import posthog from "posthog-js";

export function useWishlist(product: Product | null | undefined) {
  const dispatch = useAppDispatch();
  const { loadingProductId } = useAppSelector((state) => state.wishlist);

  // Read from Redux currentProduct when IDs match (so optimistic updates trigger a re-render),
  // falling back to the prop for contexts outside the product detail page.
  const reduxWishlistStatus = useAppSelector((state) =>
    state.products.currentProduct?.id === product?.id
      ? state.products.currentProduct?.isInWishlist
      : undefined
  );
  const isInWishlist = reduxWishlistStatus ?? product?.isInWishlist ?? false;

  // True only while this specific product's API call is in-flight
  const isLoading = loadingProductId === product?.id;

  const handleToggleWishlist = async (
    onSuccess?: (action: "added" | "removed") => void
  ) => {
    if (!product || isLoading) return;

    const previousValue = isInWishlist;
    const nextValue = !isInWishlist;

    // 1. Optimistic update
    dispatch(setCurrentProductWishlistStatus(nextValue));

    try {
      // 2. API call
      if (previousValue) {
        await dispatch(removeFromWishlist(product.id)).unwrap();
      } else {
        await dispatch(addToWishlist(product.id)).unwrap();
      }

      // 3. Silent background re-fetch for authoritative server state
      dispatch(silentFetchProductById(product.id));

      if (previousValue) {
        posthog.capture("wishlist_item_removed", {
          product_id: product.id,
          product_name_en: product.nameEn,
          product_name_ar: product.nameAr,
          price: product.price,
        });
      } else {
        posthog.capture("wishlist_item_added", {
          product_id: product.id,
          product_name_en: product.nameEn,
          product_name_ar: product.nameAr,
          price: product.price,
        });
      }

      onSuccess?.(previousValue ? "removed" : "added");
    } catch (error) {
      posthog.captureException(error);
      console.error("Failed to toggle wishlist:", error);
      // 4. Rollback on failure
      dispatch(setCurrentProductWishlistStatus(previousValue));
    }
  };

  return {
    isInWishlist,
    isLoading,
    handleToggleWishlist,
  };
}
