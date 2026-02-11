'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, setFilters, fetchCatalogFilters } from '@/store/slices/productsSlice';
import type { ProductFilters } from '@/types';

/**
 * Filter state interface for UI components
 */
interface FilterUIState {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedBrandIds: number[];
  setSelectedBrandIds: (ids: number[]) => void;
  selectedCategoryIds: number[];
  setSelectedCategoryIds: (ids: number[]) => void;
  onSale: boolean;
  setOnSale: (v: boolean) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  selectedSkins: string[];
  setSelectedSkins: (skins: string[]) => void;
  sortValue: string;
  setSortValue: (v: string) => void;
}

/**
 * Return type for useCatalogFilters hook
 */
interface UseCatalogFiltersReturn {
  // Filter UI state
  uiState: FilterUIState;
  
  // Redux state
  products: any[];
  total: number;
  page: number;
  limit: number;
  catalogFilters: any;
  isLoading: boolean;
  isLoadingCatalogFilters: boolean;
  error: string | null;
  
  // Actions
  applyFilters: () => void;
  clearAllFilters: () => void;
  clearFilter: (key: keyof ProductFilters) => void;
  handlePageChange: (newPage: number) => void;
  handleSortChange: (value: string) => void;
  
  // Filter pills
  filterPills: Array<{ key: string; label: string; value: any }>;
  handlePillRemove: (pill: { key: string; value: any }) => void;
  
  // Drawer state
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (v: boolean) => void;
  
  // Local filters for API
  localFilters: ProductFilters;
}

/**
 * Custom hook for managing catalog filter state
 * 
 * Encapsulates all filter-related state, URL synchronization,
 * and Redux interactions for the catalog page.
 */
export function useCatalogFilters(lang: string): UseCatalogFiltersReturn {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Track if we're syncing from URL to prevent auto-apply loop
  const isSyncingFromUrl = useRef(false);

  // Redux state
  const {
    products,
    total,
    page,
    limit,
    catalogFilters,
    isLoading,
    isLoadingCatalogFilters,
    error,
  } = useAppSelector((state) => state.products);

  // Local filter state for component UI
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [onSale, setOnSale] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSkins, setSelectedSkins] = useState<string[]>([]);
  const [sortValue, setSortValue] = useState<string>('relevance');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // Local filter state for API
  const [localFilters, setLocalFilters] = useState<ProductFilters>({
    page: 1,
    limit: 10,
  });

  /**
   * Initialize price range from hardcoded defaults (only when no URL price params)
   */
  useEffect(() => {
    const hasUrlPriceParams = searchParams.get('minPrice') || searchParams.get('maxPrice');
    if (!hasUrlPriceParams) {
      setPriceRange([0, 5000]);
    }
  }, [searchParams]);

  /**
   * Fetch catalog filters on mount
   */
  useEffect(() => {
    dispatch(fetchCatalogFilters());
  }, [dispatch]);

  /**
   * Prevent body scroll when filter drawer is open
   */
  useEffect(() => {
    if (isFilterDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFilterDrawerOpen]);

  /**
   * Initialize filters from URL parameters
   */
  useEffect(() => {
    isSyncingFromUrl.current = true;

    const searchQueryParam = searchParams.get('searchQuery');
    const brandIdParam = searchParams.get('brandId');
    const categoryIdParam = searchParams.get('categoryId');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const sortByParam = searchParams.get('sortBy');

    // Sync UI state from URL
    if (searchQueryParam) setSearchQuery(searchQueryParam);
    else setSearchQuery('');

    if (brandIdParam) {
      const brandIds = brandIdParam.split(',').map((id) => Number(id.trim()));
      setSelectedBrandIds(brandIds);
    } else {
      setSelectedBrandIds([]);
    }

    if (categoryIdParam) {
      const categoryIds = categoryIdParam.split(',').map((id) => Number(id.trim()));
      setSelectedCategoryIds(categoryIds);
    } else {
      setSelectedCategoryIds([]);
    }

    if (sortByParam) setSortValue(sortByParam);
    else setSortValue('relevance');

    // Update price range from URL if params exist
    if (minPriceParam || maxPriceParam) {
      const min = minPriceParam ? Number(minPriceParam) : 0;
      const max = maxPriceParam ? Number(maxPriceParam) : 0;
      setPriceRange([min, max]);
    }

    const filters: ProductFilters = {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 10,
      categoryId: searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : undefined,
      brandId: brandIdParam ? Number(brandIdParam) : undefined,
      skinTypeId: searchParams.get('skinTypeId') ? Number(searchParams.get('skinTypeId')) : undefined,
      searchQuery: searchQueryParam || undefined,
      minPrice: minPriceParam ? Number(minPriceParam) : undefined,
      maxPrice: maxPriceParam ? Number(maxPriceParam) : undefined,
      sortBy: sortByParam || undefined,
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || undefined,
    };

    setLocalFilters(filters);
    dispatch(setFilters(filters));

    // Reset flag after state updates
    setTimeout(() => {
      isSyncingFromUrl.current = false;
    }, 0);
  }, [searchParams, dispatch]);

  /**
   * Fetch products when filters change
   */
  useEffect(() => {
    dispatch(fetchProducts(localFilters));
  }, [dispatch, localFilters]);

  /**
   * Apply filters - converts UI state to API filters and updates URL
   */
  const applyFilters = useCallback(() => {
    // Ensure price range values are valid numbers
    const validMinPrice = !isNaN(priceRange[0]) && priceRange[0] >= 0 ? priceRange[0] : 0;
    const validMaxPrice = !isNaN(priceRange[1]) && priceRange[1] >= 0 ? priceRange[1] : 5000;

    // Use first category/brand ID if multiple selected (backend currently supports single)
    const categoryId = selectedCategoryIds.length > 0 ? selectedCategoryIds[0] : undefined;
    const brandId = selectedBrandIds.length > 0 ? selectedBrandIds[0] : undefined;

    // Check if user has modified price from the default range
    const hasPriceChanged = validMinPrice !== 0 || validMaxPrice !== 5000;

    const filters: ProductFilters = {
      page: 1,
      limit: 12,
      searchQuery: searchQuery.trim() || undefined,
      brandId: brandId,
      categoryId: categoryId,
      minPrice: hasPriceChanged ? validMinPrice : undefined,
      maxPrice: hasPriceChanged ? validMaxPrice : undefined,
    };

    setLocalFilters(filters);

    // Update URL
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });

    const newUrl = `/catalog?${params.toString()}`;
    router.push(newUrl);
  }, [
    priceRange,
    selectedCategoryIds,
    selectedBrandIds,
    searchQuery,
    router,
  ]);

  /**
   * Handle page change
   */
  const handlePageChange = useCallback(
    (newPage: number) => {
      const updatedFilters = { ...localFilters, page: newPage };
      setLocalFilters(updatedFilters);

      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(newPage));
      router.push(`/catalog?${params.toString()}`);
    },
    [localFilters, searchParams, router]
  );

  /**
   * Handle sort change
   */
  const handleSortChange = useCallback(
    (value: string) => {
      setSortValue(value);
      const [sortBy, sortOrder] = value.split('-');
      const filters = {
        ...localFilters,
        sortBy: sortBy === 'relevance' ? undefined : sortBy,
        sortOrder: sortOrder as 'asc' | 'desc' | undefined,
      };
      setLocalFilters(filters);

      const params = new URLSearchParams(searchParams.toString());
      if (sortBy && sortBy !== 'relevance') {
        params.set('sortBy', sortBy);
        if (sortOrder) params.set('sortOrder', sortOrder);
      } else {
        params.delete('sortBy');
        params.delete('sortOrder');
      }
      router.push(`/catalog?${params.toString()}`);
    },
    [localFilters, searchParams, router]
  );

  /**
   * Clear all filters
   */
  const clearAllFilters = useCallback(() => {
    const resetFilters: ProductFilters = { page: 1, limit: 10 };
    setLocalFilters(resetFilters);
    router.push('/catalog');
  }, [router]);

  /**
   * Clear specific filter
   */
  const clearFilter = useCallback(
    (filterKey: keyof ProductFilters) => {
      const updatedFilters = { ...localFilters };
      delete updatedFilters[filterKey];
      setLocalFilters(updatedFilters);

      const params = new URLSearchParams(searchParams.toString());
      params.delete(filterKey);
      router.push(`/catalog?${params.toString()}`);
    },
    [localFilters, searchParams, router]
  );

  /**
   * Build filter pills for display
   */
  const filterPills = (() => {
    const pills: Array<{ key: string; label: string; value: any }> = [];
    const isRTL = lang === 'ar';

    if (localFilters.searchQuery) {
      pills.push({
        key: 'searchQuery',
        label: `${isRTL ? 'بحث' : 'Search'}: ${localFilters.searchQuery}`,
        value: localFilters.searchQuery,
      });
    }

    if (localFilters.categoryId) {
      // Find category name from catalogFilters
      const findCategory = (categories: any[], id: number): string | null => {
        for (const cat of categories) {
          if (cat.id === id) {
            return isRTL ? cat.nameAr : cat.nameEn;
          }
          if (cat.children && cat.children.length > 0) {
            const found = findCategory(cat.children, id);
            if (found) return found;
          }
        }
        return null;
      };

      const categoryName = findCategory(catalogFilters.categories, localFilters.categoryId);
      pills.push({
        key: 'categoryId',
        label: categoryName || `${isRTL ? 'الفئة' : 'Category'}: ${localFilters.categoryId}`,
        value: localFilters.categoryId,
      });
    }

    if (localFilters.brandId) {
      const brand = catalogFilters.brands.find((b: any) => b.id === localFilters.brandId);
      const brandName = brand ? (isRTL ? brand.nameAr : brand.nameEn) : null;
      pills.push({
        key: 'brandId',
        label: brandName || `${isRTL ? 'العلامة التجارية' : 'Brand'}: ${localFilters.brandId}`,
        value: localFilters.brandId,
      });
    }

    if (localFilters.minPrice || localFilters.maxPrice) {
      const min = localFilters.minPrice || 0;
      const max = localFilters.maxPrice || 5000;
      pills.push({
        key: 'price',
        label: `${min}–${max} ${isRTL ? 'ج.م' : 'EGP'}`,
        value: { min, max },
      });
    }

    return pills;
  })();

  /**
   * Handle pill removal
   */
  const handlePillRemove = useCallback(
    (pill: { key: string; value: any }) => {
      if (pill.key === 'price') {
        clearFilter('minPrice');
        clearFilter('maxPrice');
      } else {
        clearFilter(pill.key as keyof ProductFilters);
      }
    },
    [clearFilter]
  );

  return {
    uiState: {
      searchQuery,
      setSearchQuery,
      selectedBrandIds,
      setSelectedBrandIds,
      selectedCategoryIds,
      setSelectedCategoryIds,
      onSale,
      setOnSale,
      priceRange,
      setPriceRange,
      selectedTags,
      setSelectedTags,
      selectedSkins,
      setSelectedSkins,
      sortValue,
      setSortValue,
    },
    products,
    total,
    page,
    limit,
    catalogFilters,
    isLoading,
    isLoadingCatalogFilters,
    error,
    applyFilters,
    clearAllFilters,
    clearFilter,
    handlePageChange,
    handleSortChange,
    filterPills,
    handlePillRemove,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    localFilters,
  };
}
