import { apiClient } from '@/lib/api/client';
import type { BlogPost, BlogCategory, BlogFilters, BlogListResult } from '@/types/models/blog';

const LIMIT = 9;

export const blogService = {
  async getBlogPostBySlug(slug: string): Promise<BlogPost> {
    const response = await apiClient.get(`/blogs/${slug}`);
    return (response.data?.data ?? response.data) as BlogPost;
  },

  async getRelatedPosts(categoryId: number, excludeSlug: string, limit = 4): Promise<BlogPost[]> {
    const response = await apiClient.get('/blogs', {
      params: { category_id: categoryId, limit, page: 1 },
    });
    const posts: BlogPost[] = response.data?.data ?? [];
    return posts.filter((p) => p.slug !== excludeSlug).slice(0, limit);
  },

  async getBlogPosts(filters: BlogFilters = {}): Promise<BlogListResult> {
    const params: Record<string, unknown> = {
      page: filters.page ?? 1,
      limit: filters.limit ?? LIMIT,
    };

    if (filters.search) params.search = filters.search;
    if (filters.categoryId) params.category_id = filters.categoryId;

    const response = await apiClient.get('/blogs', { params });
    const data = response.data;

    const posts: BlogPost[] = data.data ?? [];
    const total: number = data.meta?.total ?? posts.length;
    const currentPage: number = data.meta?.current_page ?? (filters.page ?? 1);
    const perPage: number = data.meta?.per_page ?? LIMIT;

    return {
      posts,
      total,
      hasMore: currentPage * perPage < total,
    };
  },

  async getBlogCategories(): Promise<BlogCategory[]> {
    const response = await apiClient.get('/blog-categories');
    return response.data.data ?? response.data ?? [];
  },
};
