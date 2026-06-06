import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/models/blog';
import { BRAND } from '@/content/brand';

interface Props {
  posts: BlogPost[];
  locale: string;
  t: (key: string) => string;
}

function formatDate(dateStr: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export default function BlogPostRelatedPosts({ posts, locale, t }: Props) {
  if (posts.length === 0) return null;
  const isRTL = locale === 'ar';

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
        {t('relatedPosts')}
      </h3>
      <ul className="space-y-4">
        {posts.map((post) => {
          const title = isRTL ? post.titleAr : post.titleEn;
          const categoryName = isRTL ? post.category.nameAr : post.category.nameEn;
          return (
            <li key={post.id}>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="group flex gap-3 items-start"
              >
                <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="80px"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-medium mb-1 transition-colors"
                    style={{ color: BRAND.primary }}
                  >
                    {categoryName}
                  </p>
                  <p className="text-sm font-medium text-neutral-700 leading-snug line-clamp-2 group-hover:text-brand transition-colors">
                    {title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                    <span>{formatDate(post.createdAt, locale)}</span>
                    <span>•</span>
                    <span>{post.readTime} {t('minRead')}</span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
