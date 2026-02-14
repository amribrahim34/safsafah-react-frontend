'use client';

import { useMemo, Suspense } from 'react';
import { useLocale } from '@/lib/locale-navigation';
import { useDir } from '@/hooks/useDir';
import { BRAND } from '@/content/brand';
import { COPY } from '@/content/copy';

import PromoBar from '@/components/header/PromoBar';
import Header from '@/components/header/Header';
import ProductGrid from '@/components/products/ProductGrid';
import BottomTabs from '@/components/appchrome/BottomTabs';
import FloatingCart from '@/components/appchrome/FloatingCart';
import Footer from '@/components/footer/Footer';
import SortBar from '@/components/catalog/sortbar/SortBar';
import ResultsMeta from '@/components/catalog/resultmeta/ResultsMeta';
import FilterPillBar from '@/components/catalog/filters/FilterPillBar';

import { useCatalogFilters } from './_hooks/useCatalogFilters';
import MobileFilterDrawer from './_components/MobileFilterDrawer';
import DesktopFilterSidebar from './_components/DesktopFilterSidebar';
import Pagination from './_components/Pagination';
import CatalogLoading from './_components/CatalogLoading';

export default function CatalogPage() {
  return (
    <Suspense fallback={<CatalogLoading />}>
      <CatalogPageContent />
    </Suspense>
  );
}

function CatalogPageContent() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const T = useMemo(() => COPY[locale], [locale]);
  useDir();

  const {
    filterState,
    products,
    total,
    page,
    limit,
    catalogFilters,
    isLoading,
    error,
    applyFilters,
    clearAllFilters,
    handlePageChange,
    handleSortChange,
    filterPills,
    handlePillRemove,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    sortValue,
  } = useCatalogFilters(locale);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} />

      {/* Page title + sort */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-extrabold">
            {isRTL ? 'المنتجات' : 'Products'}
          </h1>
          <SortBar
            lang={locale}
            sort={sortValue}
            onChange={handleSortChange}
            brand={BRAND}
          />
        </div>
      </section>

      {/* Filters + Results */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        {/* Mobile filter button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="w-full py-3 px-4 rounded-xl border-2 font-semibold transition-all hover:shadow-md flex items-center justify-center gap-2"
            style={{ borderColor: BRAND.primary, color: BRAND.primary }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            {isRTL ? 'الفلاتر' : 'Filters'}
            {filterPills.length > 0 && ` (${filterPills.length})`}
          </button>
        </div>

        <MobileFilterDrawer
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          lang={locale}
          brand={BRAND}
          catalogFilters={catalogFilters}
          filterState={filterState}
          onApply={applyFilters}
        />

        <div className="grid md:grid-cols-[280px,1fr] gap-6">
          <DesktopFilterSidebar
            lang={locale}
            brand={BRAND}
            catalogFilters={catalogFilters}
            filterState={filterState}
            onApply={applyFilters}
          />

          <main>
            {isLoading && (
              <div className="text-center py-10">
                <p className="text-lg">{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
              </div>
            )}

            {error && (
              <div className="text-center py-10">
                <p className="text-red-600 text-lg">{error}</p>
              </div>
            )}

            {!isLoading && !error && (
              <>
                <ResultsMeta lang={locale} count={products.length} total={total} />
                <FilterPillBar
                  pills={filterPills}
                  onClear={handlePillRemove}
                  onClearAll={clearAllFilters}
                  brand={BRAND}
                  lang={locale}
                />
                <ProductGrid products={products} lang={locale} brand={BRAND} />
                <Pagination
                  page={page}
                  total={total}
                  limit={limit}
                  lang={locale}
                  brand={BRAND}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </main>
        </div>
      </section>

      <Footer brand={BRAND} />
      <FloatingCart brand={BRAND} />
      <BottomTabs
        labels={{
          home: isRTL ? 'الرئيسية' : 'Home',
          cats: isRTL ? 'الفئات' : 'Categories',
          cart: isRTL ? 'السلة' : 'Bag',
          wish: isRTL ? 'المفضلة' : 'Wishlist',
          account: isRTL ? 'حسابي' : 'Account',
        }}
      />
    </div>
  );
}
