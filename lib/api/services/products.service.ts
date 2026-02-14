/**
 * Products Service
 *
 * Handles all product-related API calls including fetching products,
 * product details, reviews, and wishlist management.
 */

import { get, post, del, put } from '../client';
import type {
  Product,
  ProductFilters,
  ProductSearchResult,
  ProductReview,
  WishlistItem,
  RecentlyViewedProduct,
  ApiResponse,
  CatalogFiltersResponse,
} from '@/types';

export const productsService = {
  /**
   * Fetches a list of products with optional filters
   * @param filters - Product filtering and pagination options
   * @returns Paginated product search results
   */
  async getProducts(filters?: ProductFilters): Promise<ProductSearchResult> {
    // Laravel API returns: {data: Product[], links: {}, meta: {current_page, per_page, total}}
    // The get() function returns this directly, NOT wrapped in ApiResponse
    const response = await get<{
      data: Product[];
      meta: {
        current_page: number;
        per_page: number;
        total: number;
      };
    }>('/products', filters as Record<string, unknown>);

    return {
      products: response.data,
      total: response.meta.total,
      page: response.meta.current_page,
      limit: response.meta.per_page,
    };
  },

  /**
   * Fetches a single product by ID
   * @param productId - The product ID
   * @returns Product details
   * @note Backend returns Product directly (not wrapped in ApiResponse)
   */
  async getProduct(productId: string | number): Promise<Product> {
    const response = await get<any>(`/products/${productId}`);
    // API returns product directly, not wrapped
    return response as unknown as Product;
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
    const response = await get<ProductSearchResult>(`/brands/${brandSlug}/products`, filters as Record<string, unknown>);
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
      filters as Record<string, unknown>
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
   * @param rating - Rating (1-5)
   * @param comment - Review comment
   * @returns Created review
   */
  async submitReview(
    productId: string | number,
    rating: number,
    comment: string
  ): Promise<any> {
    const response = await post<any>('/reviews', {
      productId,
      rating,
      comment,
    });
    return response as any;
  },

  /**
   * Updates an existing review
   * @param reviewId - The review ID
   * @param rating - Updated rating (1-5)
   * @param comment - Updated review comment
   * @returns Updated review
   */
  async updateReview(
    reviewId: string | number,
    rating: number,
    comment: string
  ): Promise<any> {
    const response = await put<any>(`/reviews/${reviewId}/update`, {
      rating,
      comment,
    });
    return response as any;
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

  /**
   * Fetches catalog filter options (categories and brands)
   * @returns Available filter options for the catalog
   * @note Backend returns CatalogFiltersResponse directly (not wrapped in ApiResponse)
   */
  async getCatalogFilters(): Promise<CatalogFiltersResponse> {
    const response = await get<any>('/catalog-filters');
    return response as unknown as CatalogFiltersResponse;
  },

  /**
   * Fetches active ingredients for filter
   * @returns List of active ingredients
   */
  async getActiveIngredients(): Promise<any[]> {
    const response = await get<any>('/filters/active-ingredients');
    return response.data || response;
  },

  /**
   * Fetches brands for filter
   * @returns List of brands
   */
  async getBrands(): Promise<any[]> {
    const response = await get<any>('/filters/brands');
    return response.data || response;
  },

  /**
   * Fetches categories for filter
   * @returns List of categories
   */
  async getCategories(): Promise<any[]> {
    const response = await get<any>('/filters/categories');
    return response.data || response;
  },

  /**
   * Fetches skin concerns for filter
   * @returns List of skin concerns
   */
  async getSkinConcerns(): Promise<any[]> {
    const response = await get<any>('/filters/skin-concerns');
    return response.data || response;
  },

  /**
   * Fetches skin types for filter
   * @returns List of skin types
   */
  async getSkinTypes(): Promise<any[]> {
    const response = await get<any>('/filters/skin-types');
    return response.data || response;
  },
};
