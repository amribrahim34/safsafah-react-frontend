'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import { useLocale } from '@/lib/locale-navigation';
import { useDir } from '@/hooks/useDir';

import BlogLoading from './_components/BlogLoading';
import BlogHero from './_components/BlogHero';
import BlogGrid from './_components/BlogGrid';
import BlogSidebar from './_components/BlogSidebar';
import MobileBlogFilters from './_components/MobileBlogFilters';
import { useBlogFilters } from './_hooks/useBlogFilters';

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogPageContent />
    </Suspense>
  );
}

function BlogPageContent() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const { t, i18n } = useTranslation('blog');
  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
  }, [locale, i18n]);
  useDir();

  const {
    posts,
    total,
    hasMore,
    isLoading,
    isInitialLoading,
    isLoadingMore,
    error,
    loadMore,
    categories,
    searchQuery,
    handleSearchChange,
    selectedCategoryId,
    handleCategorySelect,
    featuredPost,
  } = useBlogFilters(locale);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);

  return (
    <div className="min-h-screen bg-brand-cream" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Hero — featured post */}
      {featuredPost && !isInitialLoading && (
        <BlogHero post={featuredPost} locale={locale} />
      )}

      {/* Page heading */}
      <section className="max-w-7xl mx-auto px-4 pt-12 pb-6">
        <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-brand-charcoal">
          {t('title')}
        </h1>
        <p className="text-neutral-500 mt-2 text-sm tracking-wide">
          {t('subtitle')}
        </p>
      </section>

      {/* Mobile filters */}
      <MobileBlogFilters
        locale={locale}
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={handleCategorySelect}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Main layout */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-[280px,1fr] gap-10">

          {/* Desktop Sidebar */}
          <BlogSidebar
            locale={locale}
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={handleCategorySelect}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            recentPosts={posts.slice(0, 3)}
          />

          {/* Posts area */}
          <main>
            {/* Results count */}
            {!isInitialLoading && !error && posts.length > 0 && (
              <p className="text-sm text-neutral-400 mb-6">
                {t('showing')} {posts.length} {t('of')} {total} {t('results')}
              </p>
            )}

            {/* Initial loading */}
            {isInitialLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                    <div className="aspect-[16/9] bg-neutral-200" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-neutral-100 rounded w-3/4" />
                      <div className="h-3 bg-neutral-100 rounded w-full" />
                      <div className="h-3 bg-neutral-100 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {error && !isInitialLoading && (
              <div className="text-center py-16">
                <p className="text-neutral-500">{error}</p>
              </div>
            )}

            {/* No results */}
            {!isInitialLoading && !error && posts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl mb-2">✦</p>
                <p className="text-neutral-500 font-medium">{t('noResults')}</p>
                <p className="text-sm text-neutral-400 mt-1">{t('noResultsHint')}</p>
              </div>
            )}

            {/* Posts grid */}
            {!isInitialLoading && !error && posts.length > 0 && (
              <BlogGrid posts={posts} locale={locale} />
            )}

            {/* Infinite scroll sentinel */}
            <div ref={sentinelRef} className="h-4" />

            {/* Loading more spinner */}
            {isLoadingMore && (
              <div className="flex justify-center py-10">
                <div
                  className="w-8 h-8 rounded-full border-2 border-neutral-200 animate-spin"
                  style={{ borderTopColor: '#288880' }}
                />
              </div>
            )}

            {/* End of feed */}
            {!hasMore && posts.length > 0 && !isLoadingMore && (
              <p className="text-center text-xs text-neutral-400 tracking-widest uppercase py-8">
                — {t('noMorePosts')} —
              </p>
            )}
          </main>
        </div>
      </section>
    </div>
  );
}
