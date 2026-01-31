// Home page API response types

/**
 * Simplified product model returned by home endpoints
 * (new arrivals, best sellers)
 */
export interface HomeProduct {
  id: number;
  nameAr: string;
  nameEn: string;
  image: string | null;
  price: number;
  brandNameAr: string | null;
  brandNameEn: string | null;
  categoryNameAr: string | null;
  categoryNameEn: string | null;
  rating: number;
  ratingCount: number;
}

/**
 * Category model for home page
 */
export interface HomeCategory {
  id: number;
  nameAr: string;
  nameEn: string;
  image: string | null;
}

/**
 * Brand model for home page
 */
export interface HomeBrand {
  id: number;
  nameAr: string;
  nameEn: string;
  logo: string | null;
}
