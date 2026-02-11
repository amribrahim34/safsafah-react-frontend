// Home page API response types

/**
 * Simplified product model returned by home endpoints
 * (new arrivals, best sellers)
 */
export interface HomeProduct {
  id: number;
  nameAr: string;
  nameEn: string;
  image: string;
  price: number;
  brand: {
    name_ar: string;
    name_en: string;
  };
  category: {
    name_ar: string;
    name_en: string;
  };
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
  image: string;
}

/**
 * Brand model for home page
 */
export interface HomeBrand {
  id: number;
  nameAr: string;
  nameEn: string;
  logo: string;
}
