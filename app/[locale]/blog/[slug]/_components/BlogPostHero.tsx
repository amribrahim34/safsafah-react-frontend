import Image from 'next/image';
import type { BlogPost } from '@/types/models/blog';
import { BRAND } from '@/content/brand';

interface Props {
  post: BlogPost;
  locale: string;
  t: (key: string) => string;
}

function formatDate(dateStr: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export default function BlogPostHero({ post, locale, t }: Props) {
  const isRTL = locale === 'ar';
  const title = isRTL ? post.titleAr : post.titleEn;
  const categoryName = isRTL ? post.category.nameAr : post.category.nameEn;
  const publishDate = formatDate(post.createdAt, locale);

  return (
    <section className="relative w-full h-[420px] sm:h-[520px] lg:h-[600px] overflow-hidden bg-neutral-900">
      {/* Featured image */}
      {post.image && (
        <Image
          src={post.image}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col justify-end"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
          {/* Category badge */}
          <span
            className="inline-block text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ backgroundColor: BRAND.primary }}
          >
            {categoryName}
          </span>

          {/* Article title */}
          <h1 className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl mb-5">
            {title}
          </h1>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-white/80 text-sm flex-wrap">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <time dateTime={post.createdAt}>{publishDate}</time>
            </span>

            <span className="text-white/40">•</span>

            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {post.readTime} {t('minRead')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
