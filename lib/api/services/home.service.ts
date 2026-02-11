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
   */
  async getNewArrivals(): Promise<HomeProduct[]> {
    const response = await get<HomeProduct[]>('/home/new-arrival-products');
    return response.data;
  },

  /**
   * Fetches best seller products for the home page
   * @returns List of best seller products
   */
  async getBestSellers(): Promise<HomeProduct[]> {
    const response = await get<HomeProduct[]>('/home/best-seller-products');
    return response.data;
  },

  /**
   * Fetches featured categories for the home page
   * @returns List of featured categories
   */
  async getCategories(): Promise<HomeCategory[]> {
    const response = await get<HomeCategory[]>('/home/categories');
    return response.data;
  },

  /**
   * Fetches featured brands for the home page
   * @returns List of featured brands
   */
  async getBrands(): Promise<HomeBrand[]> {
    const response = await get<HomeBrand[]>('/home/brands');
    return response.data;
  },
};
