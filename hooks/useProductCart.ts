import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart as addToCartAction, updateCartItem, removeFromCart } from "../store/slices/cartsSlice";
import type { Product } from "@/types/models/product";
import posthog from "posthog-js";
import { addToCart as fbAddToCart } from "@/lib/fbpixel";

export function useProductCart(product: Product | null | undefined) {
  const dispatch = useAppDispatch();
  const { cart, isLoading } = useAppSelector((state) => state.cart);

  const cartItem = cart?.items.find((item) => item.productId === product?.id);

  const handleAddToCart = async (onSuccess?: () => void): Promise<void> => {
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
      fbAddToCart(product, 1);

      onSuccess?.();
    } catch (error) {
      posthog.captureException(error);
      console.error('Failed to add to cart:', error);
    }
  };

  const handleIncrement = async (): Promise<void> => {
    if (!product || !cartItem) return;

    const newQuantity = (cartItem.quantity || 0) + 1;

    if (product.stock && newQuantity > product.stock) {
      return;
    }

    try {
      await dispatch(updateCartItem({
        itemId: cartItem.id,
        quantity: newQuantity,
      })).unwrap();
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const handleDecrement = async (): Promise<void> => {
    if (!product || !cartItem) return;

    const currentQty = cartItem.quantity || 0;

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
        quantity: newQuantity,
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
