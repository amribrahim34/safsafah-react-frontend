import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, fetchAllFilters } from '@/store/slices/productsSlice';
import type { Product, ProductFilters } from '@/types';
import type { Locale } from '@/lib/locale-navigation';
import type { FilterState } from '@/components/catalog/filters/Filters';

type BaseFilters = Omit<ProductFilters, 'page' | 'limit'>;

export function useCatalogFilters(lang: Locale) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isSyncingFromUrl = useRef(false);

  // Infinite scroll refs — no state re-renders needed for these
  const filterGenerationRef = useRef<number>(0);
  const infinitePageRef = useRef<number>(1);

  // Redux state
  const {
    total,
    catalogFilters,
    isLoading,
    isLoadingCatalogFilters,
    error,
  } = useAppSelector((state) => state.products);

  // Local filter UI state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [onSale, setOnSale] = useState<boolean>(false);
  const [recommended, setRecommended] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSkinTypeIds, setSelectedSkinTypeIds] = useState<number[]>([]);
  const [selectedSkinConcernIds, setSelectedSkinConcernIds] = useState<number[]>([]);
  const [sortValue, setSortValue] = useState<string>('relevance');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // URL is the single source of truth — baseFilters mirrors URL filter params (no page/limit)
  const [baseFilters, setBaseFilters] = useState<BaseFilters>({});

  // Accumulated product buffer — replaces on filter change, appends on scroll
  const [accumulatedProducts, setAccumulatedProducts] = useState<Product[]>([]);

  // Derived loading states
  const isInitialLoading = isLoading && infinitePageRef.current === 1;
  const isLoadingMore = isLoading && infinitePageRef.current > 1;
  const hasMore = total > 0 && accumulatedProducts.length < total;

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
   * URL sync — the single place that calls setBaseFilters.
   * Reads all filter params from the URL and syncs UI + filter state.
   * Does NOT read page/limit (infinite scroll always starts at page 1).
   */
  useEffect(() => {
    isSyncingFromUrl.current = true;

    const searchQueryParam = searchParams.get('searchQuery');
    const brandIdsParam = searchParams.get('brandIds');
    const categoryIdsParam = searchParams.get('categoryIds');
    const skinTypeIdsParam = searchParams.get('skinTypeIds');
    const skinConcernIdsParam = searchParams.get('skinConcernIds');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const sortByParam = searchParams.get('sortBy');
    const sortOrderParam = searchParams.get('sortOrder');
    const recommendedParam = searchParams.get('recommended');
    const saleParam = searchParams.get('sale');

    if (searchQueryParam) setSearchQuery(searchQueryParam);
    else setSearchQuery('');

    if (brandIdsParam) {
      setSelectedBrandIds(brandIdsParam.split(',').map((id) => Number(id.trim())));
    } else {
      setSelectedBrandIds([]);
    }

    if (categoryIdsParam) {
      setSelectedCategoryIds(categoryIdsParam.split(',').map((id) => Number(id.trim())));
    } else {
      setSelectedCategoryIds([]);
    }

    if (skinTypeIdsParam) {
      setSelectedSkinTypeIds(skinTypeIdsParam.split(',').map((id) => Number(id.trim())));
    } else {
      setSelectedSkinTypeIds([]);
    }

    if (skinConcernIdsParam) {
      setSelectedSkinConcernIds(skinConcernIdsParam.split(',').map((id) => Number(id.trim())));
    } else {
      setSelectedSkinConcernIds([]);
    }

    if (sortByParam) setSortValue(sortByParam);
    else setSortValue('relevance');

    setRecommended(recommendedParam === 'true');
    setOnSale(saleParam === 'true');

    if (minPriceParam || maxPriceParam) {
      const min = minPriceParam ? Number(minPriceParam) : 0;
      const max = maxPriceParam ? Number(maxPriceParam) : 0;
      setPriceRange([min, max]);
    }

    const filters: BaseFilters = {
      categoryIds: categoryIdsParam ? categoryIdsParam.split(',').map(id => Number(id.trim())) : undefined,
      brandIds: brandIdsParam ? brandIdsParam.split(',').map(id => Number(id.trim())) : undefined,
      skinTypeIds: skinTypeIdsParam ? skinTypeIdsParam.split(',').map(id => Number(id.trim())) : undefined,
      skinConcernIds: skinConcernIdsParam ? skinConcernIdsParam.split(',').map(id => Number(id.trim())) : undefined,
      searchQuery: searchQueryParam || undefined,
      minPrice: minPriceParam ? Number(minPriceParam) : undefined,
      maxPrice: maxPriceParam ? Number(maxPriceParam) : undefined,
      sortBy: sortByParam || undefined,
      sortOrder: sortOrderParam as 'asc' | 'desc' | undefined,
      recommended: recommendedParam === 'true' ? true : undefined,
      sale: saleParam === 'true' ? true : undefined,
    };

    setBaseFilters(filters);

    setTimeout(() => {
      isSyncingFromUrl.current = false;
    }, 0);
  }, [searchParams]);

  /**
   * Filter-change fetch effect.
   * Fires whenever baseFilters changes (URL sync or direct action).
   * Always resets to page 1 and replaces the accumulated buffer.
   */
  useEffect(() => {
    const generation = ++filterGenerationRef.current;
    infinitePageRef.current = 1;

    dispatch(fetchProducts({ ...baseFilters, page: 1, limit: 12 }))
      .unwrap()
      .then((result) => {
        if (filterGenerationRef.current !== generation) return;
        setAccumulatedProducts(result.products);
      })
      .catch(() => {});
  }, [baseFilters, dispatch]);

  /**
   * Load next page — called by IntersectionObserver in the page component.
   */
  const loadMore = useCallback(() => {
    if (isLoading) return;
    if (total > 0 && accumulatedProducts.length >= total) return;

    const nextPage = infinitePageRef.current + 1;
    const generation = filterGenerationRef.current;

    infinitePageRef.current = nextPage;
    dispatch(fetchProducts({ ...baseFilters, page: nextPage, limit: 12 }))
      .unwrap()
      .then((result) => {
        if (filterGenerationRef.current !== generation) return;
        setAccumulatedProducts((prev) => {
          const existingIds = new Set(prev.map(p => p.id));
          return [...prev, ...result.products.filter(p => !existingIds.has(p.id))];
        });
      })
      .catch(() => {
        infinitePageRef.current = nextPage - 1;
      });
  }, [isLoading, accumulatedProducts.length, total, baseFilters, dispatch]);

  /**
   * Apply filters — builds URL params and pushes to router.
   * URL sync effect is the sole caller of setBaseFilters; no direct call here.
   */
  const applyFilters = useCallback(() => {
    const validMinPrice = !isNaN(priceRange[0]) && priceRange[0] >= 0 ? priceRange[0] : 0;
    const validMaxPrice = !isNaN(priceRange[1]) && priceRange[1] >= 0 ? priceRange[1] : 5000;

    const categoryIds = selectedCategoryIds.length > 0 ? selectedCategoryIds : undefined;
    const brandIds = selectedBrandIds.length > 0 ? selectedBrandIds : undefined;
    const skinTypeIds = selectedSkinTypeIds.length > 0 ? selectedSkinTypeIds : undefined;
    const skinConcernIds = selectedSkinConcernIds.length > 0 ? selectedSkinConcernIds : undefined;

    const hasPriceChanged = validMinPrice !== 0 || validMaxPrice !== 5000;

    const filters: BaseFilters = {
      searchQuery: searchQuery.trim() || undefined,
      brandIds,
      categoryIds,
      skinTypeIds,
      skinConcernIds,
      minPrice: hasPriceChanged ? validMinPrice : undefined,
      maxPrice: hasPriceChanged ? validMaxPrice : undefined,
      recommended: recommended || undefined,
      sale: onSale || undefined,
    };

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          params.set(key, value.join(','));
        } else {
          params.set(key, String(value));
        }
      }
    });

    router.push(`/${lang}/catalog?${params.toString()}`);
  }, [priceRange, selectedCategoryIds, selectedBrandIds, selectedSkinTypeIds, selectedSkinConcernIds, searchQuery, recommended, onSale, router, lang]);

  /**
   * Handle sort change — updates URL only.
   */
  const handleSortChange = useCallback(
    (value: string) => {
      setSortValue(value);
      const [sortBy, sortOrder] = value.split('-');

      const params = new URLSearchParams(searchParams.toString());
      params.delete('page');

      if (sortBy && sortBy !== 'relevance') {
        params.set('sortBy', sortBy);
        if (sortOrder) params.set('sortOrder', sortOrder);
      } else {
        params.delete('sortBy');
        params.delete('sortOrder');
      }

      router.push(`/${lang}/catalog?${params.toString()}`);
    },
    [searchParams, router, lang],
  );

  /**
   * Clear all filters — resets to clean catalog URL.
   */
  const clearAllFilters = useCallback(() => {
    router.push(`/${lang}/catalog`);
  }, [router, lang]);

  /**
   * Clear a specific filter — removes it from URL.
   */
  const clearFilter = useCallback(
    (filterKey: keyof ProductFilters) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(filterKey as string);
      params.delete('page');
      router.push(`/${lang}/catalog?${params.toString()}`);
    },
    [searchParams, router, lang],
  );

  /**
   * Build filter pills for display
   */
  const filterPills = useMemo(() => {
    const pills: Array<{ key: string; label: string; value: any }> = [];
    const isRTL = lang === 'ar';

    if (baseFilters.searchQuery) {
      pills.push({
        key: 'searchQuery',
        label: `${isRTL ? 'بحث' : 'Search'}: ${baseFilters.searchQuery}`,
        value: baseFilters.searchQuery,
      });
    }

    if (baseFilters.categoryIds && baseFilters.categoryIds.length > 0) {
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

      const categoryNames = baseFilters.categoryIds
        .map(id => findCategory(catalogFilters.categories, id))
        .filter(Boolean);

      pills.push({
        key: 'categoryIds',
        label: categoryNames.length > 0
          ? `${isRTL ? 'الفئات' : 'Categories'}: ${categoryNames.join(', ')}`
          : `${isRTL ? 'الفئات' : 'Categories'}: ${baseFilters.categoryIds.join(', ')}`,
        value: baseFilters.categoryIds,
      });
    }

    if (baseFilters.brandIds && baseFilters.brandIds.length > 0) {
      const brandNames = baseFilters.brandIds
        .map(id => {
          const brand = catalogFilters.brands.find((b: any) => b.id === id);
          return brand ? (isRTL ? brand.nameAr : brand.nameEn) : null;
        })
        .filter(Boolean);

      pills.push({
        key: 'brandIds',
        label: brandNames.length > 0
          ? `${isRTL ? 'العلامات التجارية' : 'Brands'}: ${brandNames.join(', ')}`
          : `${isRTL ? 'العلامات التجارية' : 'Brands'}: ${baseFilters.brandIds.join(', ')}`,
        value: baseFilters.brandIds,
      });
    }

    if (baseFilters.skinTypeIds && baseFilters.skinTypeIds.length > 0) {
      const skinTypeNames = baseFilters.skinTypeIds
        .map(id => {
          const skinType = catalogFilters.skinTypes?.find((st: any) => st.id === id);
          return skinType ? (isRTL ? (skinType.nameAr || skinType.name_ar) : (skinType.nameEn || skinType.name_en)) : null;
        })
        .filter(Boolean);

      pills.push({
        key: 'skinTypeIds',
        label: skinTypeNames.length > 0
          ? `${isRTL ? 'نوع البشرة' : 'Skin Type'}: ${skinTypeNames.join(', ')}`
          : `${isRTL ? 'نوع البشرة' : 'Skin Type'}: ${baseFilters.skinTypeIds.join(', ')}`,
        value: baseFilters.skinTypeIds,
      });
    }

    if (baseFilters.skinConcernIds && baseFilters.skinConcernIds.length > 0) {
      const skinConcernNames = baseFilters.skinConcernIds
        .map(id => {
          const skinConcern = catalogFilters.skinConcerns?.find((sc: any) => sc.id === id);
          return skinConcern ? (isRTL ? (skinConcern.nameAr || skinConcern.name_ar) : (skinConcern.nameEn || skinConcern.name_en)) : null;
        })
        .filter(Boolean);

      pills.push({
        key: 'skinConcernIds',
        label: skinConcernNames.length > 0
          ? `${isRTL ? 'مشاكل البشرة' : 'Skin Concern'}: ${skinConcernNames.join(', ')}`
          : `${isRTL ? 'مشاكل البشرة' : 'Skin Concern'}: ${baseFilters.skinConcernIds.join(', ')}`,
        value: baseFilters.skinConcernIds,
      });
    }

    if (baseFilters.recommended) {
      pills.push({
        key: 'recommended',
        label: isRTL ? 'موصى به' : 'Recommended',
        value: true,
      });
    }

    if (baseFilters.sale) {
      pills.push({
        key: 'sale',
        label: isRTL ? 'خصومات فقط' : 'Discount only',
        value: true,
      });
    }

    if (baseFilters.minPrice || baseFilters.maxPrice) {
      const min = baseFilters.minPrice || 0;
      const max = baseFilters.maxPrice || 5000;
      pills.push({
        key: 'price',
        label: `${min}–${max} ${isRTL ? 'ج.م' : 'EGP'}`,
        value: { min, max },
      });
    }

    return pills;
  }, [baseFilters, catalogFilters, lang]);

  /**
   * Handle pill removal
   */
  const handlePillRemove = useCallback(
    (pill: { key: string; value: any }) => {
      if (pill.key === 'price') {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('minPrice');
        params.delete('maxPrice');
        params.delete('page');
        router.push(`/${lang}/catalog?${params.toString()}`);
      } else {
        clearFilter(pill.key as keyof ProductFilters);
      }
    },
    [clearFilter, searchParams, router, lang],
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
      skinTypeIds: selectedSkinTypeIds,
      setSkinTypeIds: setSelectedSkinTypeIds,
      skinConcernIds: selectedSkinConcernIds,
      setSkinConcernIds: setSelectedSkinConcernIds,
      recommended,
      setRecommended,
    }),
    [searchQuery, selectedBrandIds, selectedCategoryIds, onSale, priceRange, selectedTags, selectedSkinTypeIds, selectedSkinConcernIds, recommended],
  );

  return {
    filterState,
    products: accumulatedProducts,
    total,
    catalogFilters,
    isLoading,
    isInitialLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    isLoadingCatalogFilters,
    error,
    applyFilters,
    clearAllFilters,
    clearFilter,
    handleSortChange,
    filterPills,
    handlePillRemove,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    sortValue,
  };
}
