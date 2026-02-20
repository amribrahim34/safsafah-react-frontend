// Product related types based on actual API response
import { LocalizedText } from './common';

export interface ProductBrand {
  id: number;
  nameAr: string;
  nameEn: string;
  logo: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCategory {
  id: number;
  nameAr: string;
  nameEn: string;
  image: string | null;
  parentId: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  category: ProductCategory;
  brand: ProductBrand;
  price: number;
  image: string;
  sku: string;
  canAddRating?: boolean;
  averageRating?: number;
  reviews?: ProductReview[];
  tags?: string[];
  images?: string[];
  skinTypes?: string[];
  skinConcerns?: string[];
  onSale?: boolean;
  inStock?: boolean;
  stock?: number;
  isInWishlist?: boolean;
  usage?: LocalizedText;
  ingredients?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price: number;
  stock: number;
  sku: string;
  image?: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  isPrimary?: boolean;
  order?: number;
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified?: boolean;
  images?: string[];
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  categoryIds?: number[];
  brandIds?: number[];
  skinTypeIds?: number[];
  skinConcernIds?: number[];
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface RecentlyViewedProduct {
  id: string;
  userId: string;
  productId: string;
  viewedAt: string;
  product: Product;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  addedAt: string;
  product: Product;
}
