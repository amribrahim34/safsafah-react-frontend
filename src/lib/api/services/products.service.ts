/**
 * Products Service
 *
 * Handles all product-related API calls including fetching products,
 * product details, reviews, and wishlist management.
 */

import { get, post, del } from '../client';
import type {
  Product,
  ProductFilters,
  ProductSearchResult,
  ProductReview,
  WishlistItem,
  RecentlyViewedProduct,
  ApiResponse,
} from '@/types';

export const productsService = {
  /**
   * Fetches a list of products with optional filters
   * @param filters - Product filtering and pagination options
   * @returns Paginated product search results
   */
  async getProducts(filters?: ProductFilters): Promise<ProductSearchResult> {
    const response = await get<ProductSearchResult>('/products', filters);
    return response.data;
  },

  /**
   * Fetches a single product by ID
   * @param productId - The product ID
   * @returns Product details
   */
  async getProduct(productId: string | number): Promise<Product> {
    const response = await get<Product>(`/products/${productId}`);
    return response.data;
  },

  /**
   * Fetches products by brand
   * @param brandSlug - Brand identifier
   * @param filters - Additional filtering options
   * @returns List of products for the specified brand
   */
  async getProductsByBrand(
    brandSlug: string,
    filters?: ProductFilters
  ): Promise<ProductSearchResult> {
    const response = await get<ProductSearchResult>(`/brands/${brandSlug}/products`, filters);
    return response.data;
  },

  /**
   * Fetches products by category
   * @param categorySlug - Category identifier
   * @param filters - Additional filtering options
   * @returns List of products in the specified category
   */
  async getProductsByCategory(
    categorySlug: string,
    filters?: ProductFilters
  ): Promise<ProductSearchResult> {
    const response = await get<ProductSearchResult>(
      `/categories/${categorySlug}/products`,
      filters
    );
    return response.data;
  },

  /**
   * Searches products by query string
   * @param query - Search query
   * @param filters - Additional filtering options
   * @returns Search results
   */
  async searchProducts(query: string, filters?: ProductFilters): Promise<ProductSearchResult> {
    const response = await get<ProductSearchResult>('/products/search', {
      q: query,
      ...filters,
    });
    return response.data;
  },

  /**
   * Fetches product reviews
   * @param productId - The product ID
   * @param page - Page number
   * @param limit - Results per page
   * @returns List of product reviews
   */
  async getProductReviews(
    productId: string | number,
    page = 1,
    limit = 10
  ): Promise<ApiResponse<ProductReview[]>> {
    return await get<ProductReview[]>(`/products/${productId}/reviews`, { page, limit });
  },

  /**
   * Submits a product review
   * @param productId - The product ID
   * @param review - Review data
   * @returns Created review
   */
  async submitReview(
    productId: string | number,
    review: Omit<ProductReview, 'id' | 'userId' | 'userName' | 'date'>
  ): Promise<ProductReview> {
    const response = await post<ProductReview>(`/products/${productId}/reviews`, review);
    return response.data;
  },

  /**
   * Fetches user's wishlist
   * @returns List of wishlist items
   */
  async getWishlist(): Promise<WishlistItem[]> {
    const response = await get<WishlistItem[]>('/wishlist');
    return response.data;
  },

  /**
   * Adds a product to wishlist
   * @param productId - The product ID to add
   * @returns Created wishlist item
   */
  async addToWishlist(productId: string | number): Promise<WishlistItem> {
    const response = await post<WishlistItem>('/wishlist', { productId });
    return response.data;
  },

  /**
   * Removes a product from wishlist
   * @param productId - The product ID to remove
   * @returns Success response
   */
  async removeFromWishlist(productId: string | number): Promise<void> {
    const response = await del<void>(`/wishlist/${productId}`);
    return response.data;
  },

  /**
   * Fetches recently viewed products
   * @param limit - Number of products to return
   * @returns List of recently viewed products
   */
  async getRecentlyViewed(limit = 10): Promise<RecentlyViewedProduct[]> {
    const response = await get<RecentlyViewedProduct[]>('/products/recently-viewed', { limit });
    return response.data;
  },

  /**
   * Records a product view
   * @param productId - The product ID that was viewed
   * @returns Success response
   */
  async recordProductView(productId: string | number): Promise<void> {
    const response = await post<void>('/products/record-view', { productId });
    return response.data;
  },

  /**
   * Fetches featured or new arrival products
   * @param type - Type of products ('featured' | 'new-arrivals' | 'bestsellers')
   * @param limit - Number of products to return
   * @returns List of products
   */
  async getFeaturedProducts(
    type: 'featured' | 'new-arrivals' | 'bestsellers' = 'featured',
    limit = 12
  ): Promise<Product[]> {
    const response = await get<Product[]>(`/products/${type}`, { limit });
    return response.data;
  },
};
