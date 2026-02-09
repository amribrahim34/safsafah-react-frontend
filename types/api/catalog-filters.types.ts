/**
 * Catalog Filters API Types
 *
 * Type definitions for the catalog filters endpoint response.
 * Used for fetching available filter options (categories and brands).
 */

/**
 * Brand filter option
 */
export interface CatalogFilterBrand {
  id: number;
  nameAr: string;
  nameEn: string;
}

/**
 * Category filter option with hierarchical structure
 */
export interface CatalogFilterCategory {
  id: number;
  nameAr: string;
  nameEn: string;
  children: CatalogFilterCategory[];
}

/**
 * Catalog filters API response
 */
export interface CatalogFiltersResponse {
  categories: CatalogFilterCategory[];
  brands: CatalogFilterBrand[];
}
