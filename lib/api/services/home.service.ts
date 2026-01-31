/**
 * Home Service
 *
 * Handles all home page-related API calls including fetching
 * new arrivals, best sellers, featured categories, and brands.
 */

import { get } from '../client';
import type { HomeProduct, HomeCategory, HomeBrand } from '@/types';

export const homeService = {
  /**
   * Fetches new arrival products for the home page
   * @returns List of new arrival products
   * @note Backend returns array directly (not wrapped in ApiResponse)
   */
  async getNewArrivals(): Promise<HomeProduct[]> {
    const response = await get<any>('/home/new-arrival-products');
    return response as unknown as HomeProduct[];
  },

  /**
   * Fetches best seller products for the home page
   * @returns List of best seller products
   * @note Backend returns array directly (not wrapped in ApiResponse)
   */
  async getBestSellers(): Promise<HomeProduct[]> {
    const response = await get<any>('/home/best-seller-products');
    return response as unknown as HomeProduct[];
  },

  /**
   * Fetches featured categories for the home page
   * @returns List of featured categories
   * @note Backend returns array directly (not wrapped in ApiResponse)
   */
  async getCategories(): Promise<HomeCategory[]> {
    const response = await get<any>('/home/categories');
    return response as unknown as HomeCategory[];
  },

  /**
   * Fetches featured brands for the home page
   * @returns List of featured brands
   * @note Backend returns array directly (not wrapped in ApiResponse)
   */
  async getBrands(): Promise<HomeBrand[]> {
    const response = await get<any>('/home/brands');
    return response as unknown as HomeBrand[];
  },
};
