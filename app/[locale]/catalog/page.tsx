'use client';

import { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BRAND } from '@/content/brand';
import { COPY } from '@/content/copy';
import { useDir } from '@/hooks/useDir';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, setFilters } from '@/store/slices/productsSlice';
import type { Language, ProductFilters } from '@/types';

import PromoBar from '@/components/header/PromoBar';
import Header from '@/components/header/Header';
import ProductGrid from '@/components/products/ProductGrid';
import BottomTabs from '@/components/appchrome/BottomTabs';
import FloatingCart from '@/components/appchrome/FloatingCart';
import Footer from '@/components/footer/Footer';
import Filters from '@/components/catalog/filters/Filters';
import SortBar from '@/components/catalog/sortbar/SortBar';
import ResultsMeta from '@/components/catalog/resultmeta/ResultsMeta';
import FilterPillBar from '@/components/catalog/filters/FilterPillBar';

// Wrapper to handle Suspense boundary requirement
export default function CatalogPage() {
  return (
    <Suspense fallback={<CatalogLoading />}>
      <CatalogPageContent />
    </Suspense>
  );
}

function CatalogPageContent() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [lang, setLang] = useState<Language>('ar');
  const T = useMemo(() => COPY[lang], [lang]);
  useDir();

  // Track if we're syncing from URL to prevent auto-apply loop
  const isSyncingFromUrl = useRef(false);

  // Redux state
  const { products, total, page, limit, facets, isLoading, error } = useAppSelector(
    (state) => state.products
  );

  // Local filter state for component UI
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSub, setSelectedSub] = useState<string>('');
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
   * Initialize price range from facets (only when no URL price params)
   */
  useEffect(() => {
    const hasUrlPriceParams = searchParams.get('minPrice') || searchParams.get('maxPrice');
    if (!hasUrlPriceParams && facets.priceRange.min !== undefined && facets.priceRange.max !== undefined) {
      // Only set if values are valid numbers
      const min = facets.priceRange.min || 0;
      const max = facets.priceRange.max || 1000;
      if (!isNaN(min) && !isNaN(max) && min <= max) {
        setPriceRange([min, max]);
      }
    }
  }, [facets.priceRange.min, facets.priceRange.max, searchParams]);

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
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const sortByParam = searchParams.get('sortBy');

    // Sync UI state from URL
    if (searchQueryParam) setSearchQuery(searchQueryParam);
    else setSearchQuery('');

    if (brandIdParam) setSelectedBrands([Number(brandIdParam)]);
    else setSelectedBrands([]);

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
   * Auto-apply filters removed - filters now apply only when user clicks Apply button
   */
  // Removed auto-apply to improve UX - filters execute on button click only


  /**
   * Apply filters - converts UI state to API filters and updates URL
   */
  const applyFilters = () => {
    // Ensure price range values are valid numbers
    const validMinPrice = !isNaN(priceRange[0]) && priceRange[0] >= 0 ? priceRange[0] : facets.priceRange.min || 0;
    const validMaxPrice = !isNaN(priceRange[1]) && priceRange[1] >= 0 ? priceRange[1] : facets.priceRange.max || 1000;
    
    const filters: ProductFilters = {
      page: 1, // Reset to page 1 when filters change
      limit: 10,
      searchQuery: searchQuery.trim() || undefined,
      brandId: selectedBrands.length > 0 ? selectedBrands[0] : undefined,
      minPrice: validMinPrice !== facets.priceRange.min ? validMinPrice : undefined,
      maxPrice: validMaxPrice !== facets.priceRange.max ? validMaxPrice : undefined,
    };

    setLocalFilters(filters);

    // Update URL
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });
    router.push(`/catalog?${params.toString()}`);
  };


  /**
   * Handle page change
   */
  const handlePageChange = (newPage: number) => {
    const updatedFilters = { ...localFilters, page: newPage };
    setLocalFilters(updatedFilters);

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`/catalog?${params.toString()}`);
  };

  /**
   * Clear all filters
   */
  const clearAllFilters = () => {
    const resetFilters: ProductFilters = { page: 1, limit: 10 };
    setLocalFilters(resetFilters);
    router.push('/catalog');
  };

  /**
   * Clear specific filter
   */
  const clearFilter = (filterKey: keyof ProductFilters) => {
    const updatedFilters = { ...localFilters };
    delete updatedFilters[filterKey];
    setLocalFilters(updatedFilters);

    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete(filterKey);
    router.push(`/catalog?${params.toString()}`);
  };

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

    if (localFilters.categoryId) {
      const categoryName = facets.categories.find((c) => c === String(localFilters.categoryId));
      pills.push({
        key: 'categoryId',
        label: categoryName || `${isRTL ? 'الفئة' : 'Category'}: ${localFilters.categoryId}`,
        value: localFilters.categoryId,
      });
    }

    if (localFilters.brandId) {
      const brandName = facets.brands.find((b) => b === String(localFilters.brandId));
      pills.push({
        key: 'brandId',
        label: brandName || `${isRTL ? 'العلامة التجارية' : 'Brand'}: ${localFilters.brandId}`,
        value: localFilters.brandId,
      });
    }

    if (localFilters.minPrice || localFilters.maxPrice) {
      const min = localFilters.minPrice || facets.priceRange.min;
      const max = localFilters.maxPrice || facets.priceRange.max;
      pills.push({
        key: 'price',
        label: `${min}–${max} ${isRTL ? 'ج.م' : 'EGP'}`,
        value: { min, max },
      });
    }

    return pills;
  }, [localFilters, facets, lang]);

  /**
   * Handle pill removal
   */
  const handlePillRemove = (pill: { key: string; value: any }) => {
    if (pill.key === 'price') {
      clearFilter('minPrice');
      clearFilter('maxPrice');
    } else {
      clearFilter(pill.key as keyof ProductFilters);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar
        text={T.promo}
        brand={BRAND}
      />
      <Header brand={BRAND} searchPlaceholder={T.search} />

      {/* Page title + sort */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-extrabold">
            {lang === 'ar' ? 'المنتجات' : 'Products'}
          </h1>
          <SortBar
            lang={lang}
            sort={sortValue}
            onChange={(value: string) => {
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
            }}
            brand={BRAND}
          />
        </div>
      </section>

      {/* Filters + Results */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="w-full py-3 px-4 rounded-xl border-2 font-semibold transition-all hover:shadow-md flex items-center justify-center gap-2"
            style={{ borderColor: BRAND.primary, color: BRAND.primary }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            {lang === 'ar' ? 'الفلاتر' : 'Filters'}
            {filterPills.length > 0 && ` (${filterPills.length})`}
          </button>
        </div>

        {/* Mobile Filter Drawer Backdrop */}
        {isFilterDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsFilterDrawerOpen(false)}
          />
        )}

        {/* Mobile Filter Drawer */}
        <div
          className={`fixed inset-x-0 bottom-0 bg-white z-50 md:hidden transform transition-transform duration-300 ease-in-out rounded-t-3xl ${
            isFilterDrawerOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ maxHeight: '85vh' }}
        >
          <div className="flex flex-col h-full">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <h3 className="text-lg font-bold">{lang === 'ar' ? 'الفلاتر' : 'Filters'}</h3>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-2 hover:bg-neutral-100 rounded-xl transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Drawer Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              <Filters
                lang={lang}
                brandTokens={BRAND}
                facets={{
                  brands: facets.brands,
                  categories: facets.categories,
                  subsByCat: {},
                  priceMin: facets.priceRange.min,
                  priceMax: facets.priceRange.max,
                  tags: facets.tags,
                  skins: facets.skinTypes,
                }}
                state={{
                  q: searchQuery,
                  setQ: setSearchQuery,
                  brand: selectedBrands.map(String),
                  setBrand: (brands: string[]) => setSelectedBrands(brands.map(Number)),
                  category: selectedCategory,
                  setCategory: setSelectedCategory,
                  sub: selectedSub,
                  setSub: setSelectedSub,
                  onSale: onSale,
                  setOnSale: setOnSale,
                  price: priceRange,
                  setPrice: setPriceRange,
                  tags: selectedTags,
                  setTags: setSelectedTags,
                  skins: selectedSkins,
                  setSkins: setSelectedSkins,
                }}
              />
            </div>

            {/* Drawer Footer - Apply Button */}
            <div className="p-4 border-t border-neutral-200 bg-white">
              <button
                onClick={() => {
                  setIsFilterDrawerOpen(false);
                  applyFilters();
                }}
                className="w-full py-3 px-4 rounded-xl text-white font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: BRAND.primary }}
              >
                {lang === 'ar' ? 'تطبيق الفلاتر' : 'Apply Filters'}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop & Mobile Grid */}
        <div className="grid md:grid-cols-[280px,1fr] gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block">
          <Filters
            lang={lang}
            brandTokens={BRAND}
            facets={{
              brands: facets.brands,
              categories: facets.categories,
              subsByCat: {}, // Not supported by API yet
              priceMin: facets.priceRange.min,
              priceMax: facets.priceRange.max,
              tags: facets.tags,
              skins: facets.skinTypes,
            }}
            state={{
              q: searchQuery,
              setQ: setSearchQuery,
              brand: selectedBrands.map(String), // Convert to string array for UI
              setBrand: (brands: string[]) => setSelectedBrands(brands.map(Number)),
              category: selectedCategory,
              setCategory: setSelectedCategory,
              sub: selectedSub,
              setSub: setSelectedSub,
              onSale: onSale,
              setOnSale: setOnSale,
              price: priceRange,
              setPrice: setPriceRange,
              tags: selectedTags,
              setTags: setSelectedTags,
              skins: selectedSkins,
              setSkins: setSelectedSkins,
            }}
          />
          
          {/* Apply Filters Button for Desktop */}
          <button
            onClick={applyFilters}
            className="mt-4 w-full py-3 px-4 rounded-xl text-white font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: BRAND.primary }}
          >
            {lang === 'ar' ? 'تطبيق الفلاتر' : 'Apply Filters'}
          </button>
          </aside>

          <main>
          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-10">
              <p className="text-lg">{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-10">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          )}

          {/* Results */}
          {!isLoading && !error && (
            <>
              <ResultsMeta lang={lang} count={products.length} total={total} />
              <FilterPillBar
                pills={filterPills}
                onClear={handlePillRemove}
                onClearAll={clearAllFilters}
                brand={BRAND}
                lang={lang}
              />
              <ProductGrid products={products} lang={lang} brand={BRAND} />

              {/* Pagination */}
              {total > limit && (
                <div className="flex justify-center gap-2 mt-8">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                    className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ borderColor: BRAND.primary, color: BRAND.primary }}
                  >
                    {lang === 'ar' ? 'السابق' : 'Previous'}
                  </button>
                  <span className="px-4 py-2">
                    {lang === 'ar'
                      ? `صفحة ${page} من ${Math.ceil(total / limit)}`
                      : `Page ${page} of ${Math.ceil(total / limit)}`}
                  </span>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= Math.ceil(total / limit)}
                    className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ borderColor: BRAND.primary, color: BRAND.primary }}
                  >
                    {lang === 'ar' ? 'التالي' : 'Next'}
                  </button>
                </div>
              )}
            </>
          )}
          </main>
        </div>
      </section>

      {/* Trust + Footer */}
      {/* <section className="max-w-7xl mx-auto px-4 pb-10">
        <USPGrid brand={BRAND} lang={lang} copy={T} />
      </section> */}
      <Footer brand={BRAND} />

      <FloatingCart brand={BRAND} />
      <BottomTabs
        labels={{
          home: lang === 'ar' ? 'الرئيسية' : 'Home',
          cats: lang === 'ar' ? 'الفئات' : 'Categories',
          cart: lang === 'ar' ? 'السلة' : 'Bag',
          wish: lang === 'ar' ? 'المفضلة' : 'Wishlist',
          account: lang === 'ar' ? 'حسابي' : 'Account',
        }}
      />
    </div>
  );
}

function CatalogLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4"></div>
        <p className="text-neutral-600">Loading catalog...</p>
      </div>
    </div>
  );
}
