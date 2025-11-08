/**
 * Cart Service Types
 *
 * Type definitions for cart service requests and responses.
 */

import type { CartItem } from '../models/cart';

export interface CartResponse {
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
}

export interface AddToCartRequest {
  productId: string | number;
  variantId?: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface ApplyPromoCodeRequest {
  code: string;
}

export interface CartValidationIssue {
  itemId: string;
  type: 'out_of_stock' | 'price_changed' | 'unavailable';
  message: string;
}

export interface CartValidationResponse {
  isValid: boolean;
  issues: CartValidationIssue[];
}
