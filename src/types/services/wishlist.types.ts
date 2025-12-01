/**
 * Wishlist Service Types
 *
 * Type definitions for wishlist service requests and responses.
 */

export interface WishlistItemResponse {
  id: number;
  userId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistResponse {
  items: WishlistItemResponse[];
  totalItems: number;
}

export interface AddToWishlistRequest {
  productId: string | number;
}

export interface RemoveFromWishlistRequest {
  productId: string | number;
}
