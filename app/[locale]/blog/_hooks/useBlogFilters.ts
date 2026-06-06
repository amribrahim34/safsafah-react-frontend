import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { blogService } from '@/lib/api/services/blog.service';
import type { BlogPost, BlogCategory } from '@/types/models/blog';
import type { Locale } from '@/lib/locale-navigation';

const LIMIT = 9;

export function useBlogFilters(lang: Locale) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filterGenerationRef = useRef<number>(0);
  const infinitePageRef = useRef<number>(1);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);

  const isInitialLoading = isLoading && infinitePageRef.current === 1;
  const isLoadingMore = isLoading && infinitePageRef.current > 1;

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Sync from URL on mount / navigation
  useEffect(() => {
    const search = searchParams.get('search') ?? '';
    const categoryId = searchParams.get('category_id');
    setSearchQuery(search);
    setDebouncedSearch(search);
    setSelectedCategoryId(categoryId ? Number(categoryId) : null);
  }, [searchParams]);

  // Fetch categories once
  useEffect(() => {
    blogService.getBlogCategories().then(setCategories).catch(() => {});
  }, []);

  // Fetch on filter change — reset to page 1
  useEffect(() => {
    const generation = ++filterGenerationRef.current;
    infinitePageRef.current = 1;
    setIsLoading(true);
    setError(null);

    blogService
      .getBlogPosts({
        search: debouncedSearch || undefined,
        categoryId: selectedCategoryId ?? undefined,
        page: 1,
        limit: LIMIT,
      })
      .then((result) => {
        if (filterGenerationRef.current !== generation) return;
        setPosts(result.posts);
        setTotal(result.total);
        setHasMore(result.hasMore);
      })
      .catch(() => {
        if (filterGenerationRef.current !== generation) return;
        setError(lang === 'ar' ? 'حدث خطأ، حاولي مرة أخرى' : 'Something went wrong. Please try again.');
      })
      .finally(() => {
        if (filterGenerationRef.current !== generation) return;
        setIsLoading(false);
      });
  }, [debouncedSearch, selectedCategoryId, lang]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    const nextPage = infinitePageRef.current + 1;
    const generation = filterGenerationRef.current;
    infinitePageRef.current = nextPage;
    setIsLoading(true);

    blogService
      .getBlogPosts({
        search: debouncedSearch || undefined,
        categoryId: selectedCategoryId ?? undefined,
        page: nextPage,
        limit: LIMIT,
      })
      .then((result) => {
        if (filterGenerationRef.current !== generation) return;
        setPosts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          return [...prev, ...result.posts.filter((p) => !existingIds.has(p.id))];
        });
        setTotal(result.total);
        setHasMore(result.hasMore);
      })
      .catch(() => {
        infinitePageRef.current = nextPage - 1;
      })
      .finally(() => {
        if (filterGenerationRef.current !== generation) return;
        setIsLoading(false);
      });
  }, [isLoading, hasMore, debouncedSearch, selectedCategoryId]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    pushParams({ search: value || undefined, category_id: selectedCategoryId ?? undefined });
  }, [selectedCategoryId]);

  const handleCategorySelect = useCallback((id: number | null) => {
    setSelectedCategoryId(id);
    pushParams({ search: searchQuery || undefined, category_id: id ?? undefined });
  }, [searchQuery]);

  function pushParams(params: { search?: string; category_id?: number }) {
    const p = new URLSearchParams();
    if (params.search) p.set('search', params.search);
    if (params.category_id != null) p.set('category_id', String(params.category_id));
    router.push(`/${lang}/blog${p.toString() ? `?${p.toString()}` : ''}`);
  }

  const clearFilters = useCallback(() => {
    router.push(`/${lang}/blog`);
  }, [router, lang]);

  const featuredPost = posts.find((p) => p.featured) ?? posts[0] ?? null;

  return {
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
    clearFilters,
    featuredPost,
  };
}
