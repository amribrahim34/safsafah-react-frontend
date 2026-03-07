/**
 * Shared local types for the product page and its components.
 * These sit alongside the page to avoid polluting the global types directory
 * with types that are only used here.
 */

import type { BrandColors } from '@/types/models/brand';
import type { Product, ProductReview } from '@/types/models/product';
import type { CartItem } from '@/types/models/cart';

export type { BrandColors, Product, ProductReview, CartItem };

/** The shape of a user review as returned by the local reviews state. */
export interface LocalReview {
  id: string;
  userId?: string;
  user_id?: string;
  userName?: string;
  rating: number;
  comment?: string;
  createdAt: string;
}
