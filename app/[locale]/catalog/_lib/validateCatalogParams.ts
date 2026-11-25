import { cache } from 'react';
import { ApiException } from '@/lib/api/client';
import { productsService } from '@/lib/api/services/products.service';
import type { ProductFilters } from '@/types';

export type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

/**
 * Parses a comma-separated list of positive integers (e.g. "1,2,3").
 * Returns `null` when malformed (e.g. "Serums", "-1", "0", "1,,2").
 */
function parsePositiveIdList(raw: string): number[] | null {
  const tokens = raw.split(',').map((s) => s.trim());
  if (tokens.length === 0 || tokens.some((t) => !/^[1-9]\d*$/.test(t))) {
    return null;
  }
  return tokens.map(Number);
}

/**
 * Validates catalog query parameters. Returns parsed `ProductFilters` when
 * valid, or `null` when a known filter param is malformed (caller should 404).
 */
export function parseAndValidateCatalogParams(
  searchParams: RawSearchParams,
): ProductFilters | null {
  const filters: ProductFilters = { page: 1, limit: 1 };

  const rawCategoryIds =
    firstValue(searchParams.categoryIds) ?? firstValue(searchParams.categoryId);
  if (rawCategoryIds !== undefined) {
    const ids = parsePositiveIdList(rawCategoryIds);
    if (!ids) return null;
    filters.categoryIds = ids;
  }

  const rawBrandIds = firstValue(searchParams.brandIds);
  if (rawBrandIds !== undefined) {
    const ids = parsePositiveIdList(rawBrandIds);
    if (!ids) return null;
    filters.brandIds = ids;
  }

  const rawSkinTypeIds = firstValue(searchParams.skinTypeIds);
  if (rawSkinTypeIds !== undefined) {
    const ids = parsePositiveIdList(rawSkinTypeIds);
    if (!ids) return null;
    filters.skinTypeIds = ids;
  }

  const rawSkinConcernIds = firstValue(searchParams.skinConcernIds);
  if (rawSkinConcernIds !== undefined) {
    const ids = parsePositiveIdList(rawSkinConcernIds);
    if (!ids) return null;
    filters.skinConcernIds = ids;
  }

  const rawMinPrice = firstValue(searchParams.minPrice);
  if (rawMinPrice !== undefined && rawMinPrice !== '') {
    const n = Number(rawMinPrice);
    if (!Number.isFinite(n) || n < 0) return null;
    filters.minPrice = n;
  }

  const rawMaxPrice = firstValue(searchParams.maxPrice);
  if (rawMaxPrice !== undefined && rawMaxPrice !== '') {
    const n = Number(rawMaxPrice);
    if (!Number.isFinite(n) || n < 0) return null;
    filters.maxPrice = n;
  }

  if (
    filters.minPrice !== undefined &&
    filters.maxPrice !== undefined &&
    filters.minPrice > filters.maxPrice
  ) {
    return null;
  }

  const rawSale = firstValue(searchParams.sale);
  if (rawSale !== undefined) {
    if (!['true', 'false', '1', '0'].includes(rawSale)) return null;
    if (rawSale === 'true' || rawSale === '1') filters.sale = true;
  }

  const rawRecommended = firstValue(searchParams.recommended);
  if (rawRecommended !== undefined) {
    if (!['true', 'false', '1', '0'].includes(rawRecommended)) return null;
    if (rawRecommended === 'true' || rawRecommended === '1') filters.recommended = true;
  }

  const rawSortOrder = firstValue(searchParams.sortOrder);
  if (rawSortOrder !== undefined) {
    if (rawSortOrder !== 'asc' && rawSortOrder !== 'desc') return null;
    filters.sortOrder = rawSortOrder;
  }

  const rawSortBy = firstValue(searchParams.sortBy);
  if (rawSortBy !== undefined && rawSortBy.trim()) {
    filters.sortBy = rawSortBy.trim();
  }

  const rawSearch = firstValue(searchParams.searchQuery);
  if (rawSearch !== undefined && rawSearch.trim()) {
    filters.searchQuery = rawSearch.trim();
  }

  return filters;
}

/**
 * Validates catalog query parameters both syntactically and against the backend
 * API (when ID filters are supplied) so unknown/non-existent IDs return a
 * clean HTTP 404 instead of rendering a backend 422 message on a 200 OK page.
 */
export const validateCatalogRequest = cache(async (
  serializedSearchParams: string,
): Promise<boolean> => {
  const searchParams: RawSearchParams = serializedSearchParams
    ? (JSON.parse(serializedSearchParams) as RawSearchParams)
    : {};
  const parsed = parseAndValidateCatalogParams(searchParams);
  if (!parsed) return false;

  const hasIdFilter = Boolean(
    parsed.categoryIds?.length ||
      parsed.brandIds?.length ||
      parsed.skinTypeIds?.length ||
      parsed.skinConcernIds?.length,
  );

  if (!hasIdFilter) return true;

  try {
    await productsService.getProducts(parsed);
    return true;
  } catch (err) {
    if (err instanceof ApiException && (err.statusCode === 422 || err.statusCode === 404)) {
      return false;
    }
    // Transient network / 5xx error — do not incorrectly 404 valid catalog pages
    return true;
  }
});
