// Cart and shopping related types based on actual usage
import { LocalizedText } from './common';

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  variant: string;
  quantity: number;
  price: number;
  total: number;
  img: string;
  name: LocalizedText;
  brand: string;
  stock: number;
  inStock: boolean;
  sku?: string;
  addedAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

export interface PromoCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minOrderAmount: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  applicableProducts?: string[];
  applicableCategories?: string[];
  description?: string;
}

export interface AppliedPromoCode {
  code: string;
  discount: number;
  type: string;
  description: string;
  isValid: boolean;
  errorMessage?: string;
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  hasFreeShipping: boolean;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
}

export interface CartOperationResult {
  success: boolean;
  message: string;
  cart: Cart;
  errors: string[];
}

export interface RemoveFromCartRequest {
  itemId: string;
  userId?: string;
}

export interface CartValidationResult {
  isValid: boolean;
  errors: string[];
  unavailableItems: CartItem[];
  priceChangedItems: CartItem[];
}
