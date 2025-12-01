import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToWishlist, removeFromWishlist } from "../store/slices/wishlistSlice";
import { fetchProductById } from "../store/slices/productsSlice";

/**
 * Custom hook for managing wishlist operations
 * @param {Object} product - The product object (must have inWishList field)
 * @returns {Object} Wishlist state and handlers
 */
export function useWishlist(product) {
  const dispatch = useAppDispatch();
  const { loadingProductId } = useAppSelector((state) => state.wishlist);

  // Check if product is in wishlist using the backend-provided field
  const isInWishlist = product?.inWishList ?? false;

  // Check if this specific product is being loaded
  const isLoadingThisProduct = loadingProductId === product?.id;

  /**
   * Toggle wishlist - add if not in wishlist, remove if already in wishlist
   */
  const handleToggleWishlist = async (onSuccess) => {
    if (!product) return;

    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist(product.id)).unwrap();
      } else {
        await dispatch(addToWishlist(product.id)).unwrap();
      }

      // Refresh product data to get updated inWishList status
      await dispatch(fetchProductById(product.id));

      // Callback for success (e.g., show toast notification)
      if (onSuccess) {
        onSuccess(isInWishlist ? 'removed' : 'added');
      }
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
    }
  };

  /**
   * Add to wishlist
   */
  const handleAddToWishlist = async (onSuccess) => {
    if (!product || isInWishlist) return;

    try {
      await dispatch(addToWishlist(product.id)).unwrap();

      // Refresh product data to get updated inWishList status
      await dispatch(fetchProductById(product.id));

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

  /**
   * Remove from wishlist
   */
  const handleRemoveFromWishlist = async (onSuccess) => {
    if (!product || !isInWishlist) return;

    try {
      await dispatch(removeFromWishlist(product.id)).unwrap();

      // Refresh product data to get updated inWishList status
      await dispatch(fetchProductById(product.id));

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  return {
    isInWishlist,
    isLoading: isLoadingThisProduct,
    handleToggleWishlist,
    handleAddToWishlist,
    handleRemoveFromWishlist,
  };
}
