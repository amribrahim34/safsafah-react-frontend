'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { BlogPost } from '@/types/models/blog';
import { BRAND } from '@/content/brand';

interface BlogHeroProps {
  post: BlogPost;
  locale: string;
}

export default function BlogHero({ post, locale }: BlogHeroProps) {
  const { t } = useTranslation('blog');
  const isRTL = locale === 'ar';

  const title = isRTL ? post.titleAr : post.titleEn;
  const excerpt = isRTL ? post.excerptAr : post.excerptEn;
  const categoryName = isRTL ? post.category?.nameAr : post.category?.nameEn;

  return (
    <div className="relative w-full h-[480px] md:h-[560px] overflow-hidden bg-neutral-900">
      {post.image ? (
        <Image
          src={post.image}
          alt={title}
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-brand" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-6 pb-12 md:pb-16">
        {/* Featured badge */}
        <span
          className="inline-block self-start mb-4 px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full text-white"
          style={{ background: BRAND.primary }}
        >
          {post.featured ? t('featuredPost') : categoryName}
        </span>

        <h2 className="text-white text-2xl md:text-4xl font-semibold leading-snug max-w-2xl mb-4 line-clamp-3">
          {title}
        </h2>

        {excerpt && (
          <p className="text-white/80 text-sm md:text-base max-w-xl mb-6 line-clamp-2 hidden md:block">
            {excerpt}
          </p>
        )}

        <div className="flex items-center gap-6">
          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: BRAND.primary }}
          >
            {t('heroReadMore')}
            <span className={isRTL ? 'rotate-180' : ''}>→</span>
          </Link>

          {post.readTime && (
            <span className="text-white/70 text-sm">
              {post.readTime} {t('minRead')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
