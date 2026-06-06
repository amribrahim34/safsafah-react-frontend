export interface BlogCategory {
  id: number;
  nameAr: string;
  nameEn: string;
  slug: string;
  postCount: number;
}

export interface BlogPost {
  id: number;
  slug: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  contentAr: string;
  contentEn: string;
  category: BlogCategory;
  image: string;
  readTime: number;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogFilters {
  search?: string;
  categoryId?: number;
  page?: number;
  limit?: number;
}

export interface BlogListResult {
  posts: BlogPost[];
  total: number;
  hasMore: boolean;
}
