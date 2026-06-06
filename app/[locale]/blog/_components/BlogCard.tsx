'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { BlogPost } from '@/types/models/blog';
import { BRAND } from '@/content/brand';

interface BlogCardProps {
  post: BlogPost;
  locale: string;
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  const { t } = useTranslation('blog');
  const isRTL = locale === 'ar';

  const title = isRTL ? post.titleAr : post.titleEn;
  const excerpt = isRTL ? post.excerptAr : post.excerptEn;
  const categoryName = isRTL ? post.category?.nameAr : post.category?.nameEn;

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
        {post.image ? (
          <Image
            src={post.image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${BRAND.primary}22, ${BRAND.light}44)` }}
          />
        )}

        {/* Category overlay pill */}
        {categoryName && (
          <span
            className="absolute bottom-3 start-3 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white rounded-full"
            style={{ background: BRAND.primary }}
          >
            {categoryName}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-brand-charcoal leading-snug line-clamp-2 mb-2 group-hover:text-brand transition-colors">
          {title}
        </h3>

        {excerpt && (
          <p className="text-sm text-neutral-500 line-clamp-2 mb-4 leading-relaxed">
            {excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-100">
          <span>{formatDate(post.createdAt, locale)}</span>

          {post.readTime && (
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {post.readTime} {t('minRead')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
