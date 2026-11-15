/**
 * Shared types for reusable landing-page order components.
 * Any landing page that uses <LandingExpressOrder> imports from here.
 */

/**
 * Standard shipping rules across Safsafah:
 * Matches OrderCalculationService.php in the backend:
 * - Default shipping cost: 50 EGP
 * - Free shipping threshold: 2000 EGP
 */
export const STANDARD_SHIPPING_COST = 50;
export const FREE_SHIPPING_THRESHOLD = 2000;

export const calculateShipping = (subtotal: number): number => {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
};

export interface LandingBundle {
  units: number;
  price: number;
  originalPrice: number;
  /** Shipping fee in EGP — 0 means free shipping */
  shipping: number;
  badgeAr: string;
  badgeEn: string;
}

export interface LandingProductMeta {
  /** Backend product id — MUST match a valid product in the API */
  id: number;
  nameAr: string;
  nameEn: string;
  price: number;
  originalPrice: number;
  /** Used for the order confirmation copy */
  unitLabelAr: string;
  unitLabelEn: string;
}

export type LandingLang = 'ar' | 'en';
