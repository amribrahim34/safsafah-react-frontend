/**
 * Cart Service
 *
 * Handles all shopping cart-related API calls including adding items,
 * updating quantities, and applying promo codes.
 */

import { get, post, patch, del } from '../client';
import type {
  CartResponse,
  AddToCartRequest,
  UpdateCartItemRequest,
  ApplyPromoCodeRequest,
  CartValidationResponse,
} from '@/types';

export const cartService = {
  /**
   * Fetches the current user's cart
   * @returns Cart data with items and totals
   */
  async getCart(): Promise<CartResponse> {
    const response = await get<CartResponse>('/cart');
    return response.data;
  },

  /**
   * Adds an item to the cart
   * @param item - Item to add with product ID, variant, and quantity
   * @returns Updated cart
   */
  async addToCart(item: AddToCartRequest): Promise<CartResponse> {
    const response = await post<CartResponse, AddToCartRequest>('/cart/items', item);
    return response.data;
  },

  /**
   * Updates cart item quantity
   * @param itemId - Cart item ID
   * @param quantity - New quantity
   * @returns Updated cart
   */
  async updateCartItem(itemId: string, quantity: number): Promise<CartResponse> {
    const response = await patch<CartResponse, UpdateCartItemRequest>(`/cart/items/${itemId}`, {
      quantity,
    });
    return response.data;
  },

  /**
   * Removes an item from the cart
   * @param itemId - Cart item ID to remove
   * @returns Updated cart
   */
  async removeFromCart(itemId: string): Promise<CartResponse> {
    const response = await del<CartResponse>(`/cart/items/${itemId}`);
    return response.data;
  },

  /**
   * Clears all items from the cart
   * @returns Empty cart
   */
  async clearCart(): Promise<CartResponse> {
    const response = await del<CartResponse>('/cart');
    return response.data;
  },

  /**
   * Applies a promo code to the cart
   * @param code - Promo code to apply
   * @returns Updated cart with discount applied
   */
  async applyPromoCode(code: string): Promise<CartResponse> {
    const response = await post<CartResponse, ApplyPromoCodeRequest>('/cart/promo-code', {
      code,
    });
    return response.data;
  },

  /**
   * Removes the applied promo code from the cart
   * @returns Updated cart without promo code
   */
  async removePromoCode(): Promise<CartResponse> {
    const response = await del<CartResponse>('/cart/promo-code');
    return response.data;
  },

  /**
   * Validates cart items (checks stock, prices, etc.)
   * @returns Validation result with any issues
   */
  async validateCart(): Promise<CartValidationResponse> {
    const response = await get<CartValidationResponse>('/cart/validate');
    return response.data;
  },

  /**
   * Syncs local cart with server cart (useful after login)
   * @param localItems - Items from local storage
   * @returns Merged cart
   */
  async syncCart(localItems: AddToCartRequest[]): Promise<CartResponse> {
    const response = await post<CartResponse, { items: AddToCartRequest[] }>('/cart/sync', {
      items: localItems,
    });
    return response.data;
  },
};
