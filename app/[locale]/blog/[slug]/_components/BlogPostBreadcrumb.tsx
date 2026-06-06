import Link from 'next/link';
import type { BlogPost } from '@/types/models/blog';

interface Props {
  post: BlogPost;
  locale: string;
  t: (key: string) => string;
}

export default function BlogPostBreadcrumb({ post, locale, t }: Props) {
  const isRTL = locale === 'ar';
  const categoryName = isRTL ? post.category.nameAr : post.category.nameEn;
  const articleTitle = isRTL ? post.titleAr : post.titleEn;

  const chevron = (
    <svg
      className={`w-3 h-3 text-neutral-400 flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <nav aria-label="breadcrumb" className="bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol
          className="flex items-center gap-2 flex-wrap text-sm text-neutral-500"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <li>
            <Link href={`/${locale}`} className="hover:text-brand transition-colors">
              {t('breadcrumbHome')}
            </Link>
          </li>
          <li aria-hidden>{chevron}</li>
          <li>
            <Link href={`/${locale}/blog`} className="hover:text-brand transition-colors">
              {t('breadcrumbBlog')}
            </Link>
          </li>
          <li aria-hidden>{chevron}</li>
          <li>
            <Link
              href={`/${locale}/blog?category=${post.category.slug}`}
              className="hover:text-brand transition-colors"
            >
              {categoryName}
            </Link>
          </li>
          <li aria-hidden>{chevron}</li>
          <li className="text-neutral-800 font-medium truncate max-w-[200px] sm:max-w-xs">
            {articleTitle}
          </li>
        </ol>
      </div>
    </nav>
  );
}
