import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart as addToCartAction, updateCartItem, removeFromCart } from "../store/slices/cartsSlice";
import posthog from "posthog-js";

/**
 * Custom hook for managing product cart operations
 * @param {Object} product - The product object
 * @returns {Object} Cart item, handlers, and loading state
 */
export function useProductCart(product) {
  const dispatch = useAppDispatch();
  const { cart, isLoading } = useAppSelector((state) => state.cart);

  // Check if product is already in cart
  const cartItem = cart?.items.find((item) => item.productId === product?.id);

  const handleAddToCart = async (onSuccess) => {
    if (!product) return;

    try {
      await dispatch(addToCartAction({
        productId: product.id,
        quantity: 1,
      })).unwrap();

      posthog.capture('product_added_to_cart', {
        product_id: product.id,
        product_name_en: product.nameEn,
        product_name_ar: product.nameAr,
        price: product.price,
        quantity: 1,
      });

      // Callback for success (e.g., show mini cart)
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      posthog.captureException(error);
      console.error('Failed to add to cart:', error);
    }
  };

  const handleIncrement = async () => {
    if (!product || !cartItem) return;

    const newQuantity = (cartItem.quantity || 0) + 1;

    // Check stock limit
    if (product.stock && newQuantity > product.stock) {
      return;
    }

    try {
      await dispatch(updateCartItem({
        itemId: cartItem.id,
        quantity: newQuantity
      })).unwrap();
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const handleDecrement = async () => {
    if (!product || !cartItem) return;

    const currentQty = cartItem.quantity || 0;

    // If quantity is 1, remove the item instead of decrementing
    if (currentQty <= 1) {
      try {
        await dispatch(removeFromCart(cartItem.id)).unwrap();
        posthog.capture('product_removed_from_cart', {
          product_id: product.id,
          product_name_en: product.nameEn,
          product_name_ar: product.nameAr,
          price: product.price,
        });
      } catch (error) {
        posthog.captureException(error);
        console.error('Failed to remove from cart:', error);
      }
      return;
    }

    const newQuantity = currentQty - 1;
    try {
      await dispatch(updateCartItem({
        itemId: cartItem.id,
        quantity: newQuantity
      })).unwrap();
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  return {
    cartItem,
    isLoading,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
  };
}
