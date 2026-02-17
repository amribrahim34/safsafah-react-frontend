import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, setFilters, fetchAllFilters } from '@/store/slices/productsSlice';
import type { ProductFilters } from '@/types';
import type { Locale } from '@/lib/locale-navigation';
import type { FilterState } from '@/components/catalog/filters/Filters';

/**
 * Custom hook for managing catalog filter state.
 *
 * Encapsulates all filter-related state, URL synchronization,
 * and Redux interactions for the catalog page.
 */
export function useCatalogFilters(lang: Locale) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

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
    limit: 12,
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
    dispatch(fetchAllFilters());
  }, [dispatch]);

  /**
   * Initialize filters from URL parameters
   */
  useEffect(() => {
    isSyncingFromUrl.current = true;

    const searchQueryParam = searchParams.get('searchQuery');
    const brandIdsParam = searchParams.get('brandIds');
    const categoryIdsParam = searchParams.get('categoryIds');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const sortByParam = searchParams.get('sortBy');

    if (searchQueryParam) setSearchQuery(searchQueryParam);
    else setSearchQuery('');

    if (brandIdsParam) {
      const brandIds = brandIdsParam.split(',').map((id) => Number(id.trim()));
      setSelectedBrandIds(brandIds);
    } else {
      setSelectedBrandIds([]);
    }

    if (categoryIdsParam) {
      const categoryIds = categoryIdsParam.split(',').map((id) => Number(id.trim()));
      setSelectedCategoryIds(categoryIds);
    } else {
      setSelectedCategoryIds([]);
    }

    if (sortByParam) setSortValue(sortByParam);
    else setSortValue('relevance');

    if (minPriceParam || maxPriceParam) {
      const min = minPriceParam ? Number(minPriceParam) : 0;
      const max = maxPriceParam ? Number(maxPriceParam) : 0;
      setPriceRange([min, max]);
    }

    const filters: ProductFilters = {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 12,
      categoryIds: categoryIdsParam ? categoryIdsParam.split(',').map(id => Number(id.trim())) : undefined,
      brandIds: brandIdsParam ? brandIdsParam.split(',').map(id => Number(id.trim())) : undefined,
      skinTypeId: searchParams.get('skinTypeId') ? Number(searchParams.get('skinTypeId')) : undefined,
      searchQuery: searchQueryParam || undefined,
      minPrice: minPriceParam ? Number(minPriceParam) : undefined,
      maxPrice: maxPriceParam ? Number(maxPriceParam) : undefined,
      sortBy: sortByParam || undefined,
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || undefined,
    };

    setLocalFilters(filters);
    dispatch(setFilters(filters));

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
   * Apply filters — converts UI state to API filters and updates URL
   */
  const applyFilters = useCallback(() => {
    const validMinPrice = !isNaN(priceRange[0]) && priceRange[0] >= 0 ? priceRange[0] : 0;
    const validMaxPrice = !isNaN(priceRange[1]) && priceRange[1] >= 0 ? priceRange[1] : 5000;

    const categoryIds = selectedCategoryIds.length > 0 ? selectedCategoryIds : undefined;
    const brandIds = selectedBrandIds.length > 0 ? selectedBrandIds : undefined;

    const hasPriceChanged = validMinPrice !== 0 || validMaxPrice !== 5000;

    const filters: ProductFilters = {
      page: 1,
      limit: 12,
      searchQuery: searchQuery.trim() || undefined,
      brandIds,
      categoryIds,
      minPrice: hasPriceChanged ? validMinPrice : undefined,
      maxPrice: hasPriceChanged ? validMaxPrice : undefined,
    };

    setLocalFilters(filters);

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        // Handle arrays by joining with comma
        if (Array.isArray(value)) {
          params.set(key, value.join(','));
        } else {
          params.set(key, String(value));
        }
      }
    });

    router.push(`/catalog?${params.toString()}`);
  }, [priceRange, selectedCategoryIds, selectedBrandIds, searchQuery, router]);

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
    [localFilters, searchParams, router],
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
    [localFilters, searchParams, router],
  );

  /**
   * Clear all filters
   */
  const clearAllFilters = useCallback(() => {
    const resetFilters: ProductFilters = { page: 1, limit: 12 };
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
    [localFilters, searchParams, router],
  );

  /**
   * Build filter pills for display
   */
  const filterPills = useMemo(() => {
    const pills: Array<{ key: string; label: string; value: any }> = [];
    const isRTL = lang === 'ar';

    if (localFilters.searchQuery) {
      pills.push({
        key: 'searchQuery',
        label: `${isRTL ? 'بحث' : 'Search'}: ${localFilters.searchQuery}`,
        value: localFilters.searchQuery,
      });
    }

    if (localFilters.categoryIds && localFilters.categoryIds.length > 0) {
      const findCategory = (categories: any[], id: number): string | null => {
        for (const cat of categories) {
          if (cat.id === id) return isRTL ? cat.nameAr : cat.nameEn;
          if (cat.children?.length) {
            const found = findCategory(cat.children, id);
            if (found) return found;
          }
        }
        return null;
      };

      const categoryNames = localFilters.categoryIds
        .map(id => findCategory(catalogFilters.categories, id))
        .filter(Boolean);
      
      pills.push({
        key: 'categoryIds',
        label: categoryNames.length > 0 
          ? `${isRTL ? 'الفئات' : 'Categories'}: ${categoryNames.join(', ')}`
          : `${isRTL ? 'الفئات' : 'Categories'}: ${localFilters.categoryIds.join(', ')}`,
        value: localFilters.categoryIds,
      });
    }

    if (localFilters.brandIds && localFilters.brandIds.length > 0) {
      const brandNames = localFilters.brandIds
        .map(id => {
          const brand = catalogFilters.brands.find((b: any) => b.id === id);
          return brand ? (isRTL ? brand.nameAr : brand.nameEn) : null;
        })
        .filter(Boolean);
      
      pills.push({
        key: 'brandIds',
        label: brandNames.length > 0
          ? `${isRTL ? 'العلامات التجارية' : 'Brands'}: ${brandNames.join(', ')}`
          : `${isRTL ? 'العلامات التجارية' : 'Brands'}: ${localFilters.brandIds.join(', ')}`,
        value: localFilters.brandIds,
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
  }, [localFilters, catalogFilters, lang]);

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
    [clearFilter],
  );

  /**
   * FilterState object compatible with the Filters component interface
   */
  const filterState: FilterState = useMemo(
    () => ({
      q: searchQuery,
      setQ: setSearchQuery,
      brandIds: selectedBrandIds,
      setBrandIds: setSelectedBrandIds,
      categoryIds: selectedCategoryIds,
      setCategoryIds: setSelectedCategoryIds,
      onSale,
      setOnSale,
      price: priceRange,
      setPrice: setPriceRange,
      tags: selectedTags,
      setTags: setSelectedTags,
      skins: selectedSkins,
      setSkins: setSelectedSkins,
    }),
    [searchQuery, selectedBrandIds, selectedCategoryIds, onSale, priceRange, selectedTags, selectedSkins],
  );

  return {
    filterState,
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
    sortValue,
  };
}
