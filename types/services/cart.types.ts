/**
 * Cart Service Types
 *
 * Type definitions for cart service requests and responses.
 */

export interface CartItemResponse {
  id: number;
  productId: number;
  productNameEn: string;
  productNameAr: string;
  productPrice: number;
  productImage: string;
  quantity: number;
  subtotal: number;
}

export interface CartResponse {
  cartId: number;
  items: CartItemResponse[];
  totalItems: number;
  totalPrice: number;
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
