'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BRAND } from '../../content/brand';
import { COPY } from '../../content/copy';
import { useDir } from '../../hooks/useDir';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, setFilters } from '@/store/slices/productsSlice';
import type { Language, ProductFilters } from '@/types';

import PromoBar from '../../components/header/PromoBar';
import Header from '../../components/header/Header';
import ProductGrid from '../../components/products/ProductGrid';
import BottomTabs from '../../components/appchrome/BottomTabs';
import FloatingCart from '../../components/appchrome/FloatingCart';
import Footer from '../../components/footer/Footer';
import USPGrid from '../../components/usp/USPGrid';
import Filters from '../../components/catalog/filters/Filters';
import SortBar from '../../components/catalog/sortbar/SortBar';
import ResultsMeta from '../../components/catalog/resultmeta/ResultsMeta';
import FilterPillBar from '../../components/catalog/filters/FilterPillBar';

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [lang, setLang] = useState<Language>('ar');
  const T = useMemo(() => COPY[lang], [lang]);
  useDir(lang);

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
      setPriceRange([facets.priceRange.min, facets.priceRange.max]);
    }
  }, [facets.priceRange.min, facets.priceRange.max, searchParams]);

  /**
   * Initialize filters from URL parameters
   */
  useEffect(() => {
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
  const applyFilters = () => {
    const filters: ProductFilters = {
      page: 1, // Reset to page 1 when filters change
      limit: 10,
      searchQuery: searchQuery.trim() || undefined,
      brandId: selectedBrands.length > 0 ? selectedBrands[0] : undefined,
      minPrice: priceRange[0] !== facets.priceRange.min ? priceRange[0] : undefined,
      maxPrice: priceRange[1] !== facets.priceRange.max ? priceRange[1] : undefined,
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
        lang={lang}
        onToggleLang={() => setLang(lang === 'ar' ? 'en' : 'ar')}
        brand={BRAND}
      />
      <Header brand={BRAND} searchPlaceholder={T.search} lang={lang} />

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
      <section className="max-w-7xl mx-auto px-4 py-4 grid md:grid-cols-[280px,1fr] gap-6">
        <aside>
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
      </section>

      {/* Trust + Footer */}
      {/* <section className="max-w-7xl mx-auto px-4 pb-10">
        <USPGrid brand={BRAND} lang={lang} copy={T} />
      </section> */}
      <Footer brand={BRAND} lang={lang} copy={T} />

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
