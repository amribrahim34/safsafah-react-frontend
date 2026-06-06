'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { BlogCategory, BlogPost } from '@/types/models/blog';
import { BRAND } from '@/content/brand';

interface BlogSidebarProps {
  locale: string;
  categories: BlogCategory[];
  selectedCategoryId: number | null;
  onCategorySelect: (id: number | null) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  recentPosts: BlogPost[];
}

export default function BlogSidebar({
  locale,
  categories,
  selectedCategoryId,
  onCategorySelect,
  searchQuery,
  onSearchChange,
  recentPosts,
}: BlogSidebarProps) {
  const { t } = useTranslation('blog');
  const isRTL = locale === 'ar';

  return (
    <aside className="hidden md:flex flex-col gap-8" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 pe-10 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
        />
        <svg
          className="absolute top-1/2 -translate-y-1/2 end-3 text-neutral-400"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
            {t('categories')}
          </h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => onCategorySelect(null)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all"
                style={
                  selectedCategoryId === null
                    ? { background: BRAND.primary, color: '#fff' }
                    : { color: '#4b5563' }
                }
              >
                <span>{t('allCategories')}</span>
                <span className="text-xs opacity-60">
                  {categories.reduce((s, c) => s + (c.postCount ?? 0), 0)}
                </span>
              </button>
            </li>
            {categories.map((cat) => {
              const name = isRTL ? cat.nameAr : cat.nameEn;
              const isActive = selectedCategoryId === cat.id;
              return (
                <li key={cat.id}>
                  <button
                    onClick={() => onCategorySelect(cat.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all hover:bg-neutral-100"
                    style={isActive ? { background: BRAND.primary, color: '#fff' } : { color: '#374151' }}
                  >
                    <span>{name}</span>
                    {cat.postCount != null && (
                      <span className="text-xs opacity-60">{cat.postCount}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
            {t('recentPosts')}
          </h3>
          <ul className="space-y-4">
            {recentPosts.slice(0, 3).map((post) => {
              const title = isRTL ? post.titleAr : post.titleEn;
              return (
                <li key={post.id}>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="flex gap-3 group"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm font-medium text-neutral-700 leading-snug line-clamp-2 group-hover:text-brand transition-colors">
                        {title}
                      </p>
                      {post.readTime && (
                        <span className="text-xs text-neutral-400 mt-1">
                          {post.readTime} {t('minRead')}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </aside>
  );
}
