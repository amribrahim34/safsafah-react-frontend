import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToWishlist, removeFromWishlist } from "../store/slices/wishlistSlice";
import {
  setCurrentProductWishlistStatus,
  silentFetchProductById,
} from "../store/slices/productsSlice";

/**
 * useWishlist
 *
 * Manages wishlist state for a single product.
 *
 * Strategy:
 *  1. Optimistic update  — flip `isInWishlist` in Redux immediately so the
 *     button re-renders without waiting for the network.
 *  2. API call           — add / remove on the backend.
 *  3. Silent re-fetch    — pull fresh product data (including the authoritative
 *     `isInWishlist` value) without triggering the page loading skeleton.
 *  4. Rollback on error  — if the API call fails, restore the previous value.
 *
 * @param {Object} product - Product object (must have `id` and `isInWishlist`)
 */
export function useWishlist(product) {
  const dispatch = useAppDispatch();
  const { loadingProductId } = useAppSelector((state) => state.wishlist);

  // Read backend-supplied field from currentProduct
  const isInWishlist = product?.isInWishlist ?? false;

  // True only while this specific product's API call is in-flight
  const isLoading = loadingProductId === product?.id;

  /**
   * Toggle wishlist membership.
   * Updates the UI immediately and syncs with the server in the background.
   *
   * @param {Function} [onSuccess] - Optional callback receiving 'added' | 'removed'
   */
  const handleToggleWishlist = async (onSuccess) => {
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

      onSuccess?.(previousValue ? "removed" : "added");
    } catch (error) {
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
