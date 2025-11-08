// Product related types based on actual API response
import { LocalizedText } from './common';

export interface Product {
  id: number;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  categoryId: number;
  brandId: number;
  price: number;
  image: string;
  sku: string;
  rating?: number;
  tags?: string[];
  images?: string[];
  skinTypes?: string[];
  onSale?: boolean;
  inStock?: boolean;
  stock?: number;
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

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  order?: number;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  categoryId?: number;
  brandId?: number;
  skinTypeId?: number;
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
  facets: {
    brands: string[];
    categories: string[];
    tags: string[];
    skinTypes: string[];
    priceRange: {
      min: number;
      max: number;
    };
  };
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
