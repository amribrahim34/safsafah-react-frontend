/**
 * Wishlist Service
 *
 * Handles all wishlist-related API calls including adding and removing items.
 */

import { post, del } from '../client';
import type {
  WishlistItemResponse,
} from '@/types';

export const wishlistService = {
  /**
   * Adds a product to the wishlist
   * @param productId - Product ID to add
   * @returns Wishlist item data
   */
  async addToWishlist(productId: string | number): Promise<WishlistItemResponse> {
    const response = await post<WishlistItemResponse>(`/wishlist/${productId}`);
    // Backend returns wishlist item data directly
    return response as any;
  },

  /**
   * Removes a product from the wishlist
   * @param productId - Product ID to remove
   * @returns Empty response
   */
  async removeFromWishlist(productId: string | number): Promise<void> {
    await del<void>(`/wishlist/${productId}`);
  },
};
