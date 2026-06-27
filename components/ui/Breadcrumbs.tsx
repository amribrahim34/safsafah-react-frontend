import { Fragment } from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  /** Omit on the current (last) item so it renders as plain text. */
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: string;
}

/**
 * Shared breadcrumb trail. Pass already-localized labels and locale-prefixed
 * hrefs; the last item (no href) is rendered as the current page.
 */
export default function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  const isRTL = locale === 'ar';

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
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <Fragment key={`${item.label}-${index}`}>
                {index > 0 && <li aria-hidden>{chevron}</li>}
                <li
                  className={
                    isLast
                      ? 'text-neutral-800 font-medium truncate max-w-[200px] sm:max-w-xs'
                      : ''
                  }
                  {...(isLast ? { 'aria-current': 'page' } : {})}
                >
                  {item.href ? (
                    <Link href={item.href} className="hover:text-brand transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    item.label
                  )}
                </li>
              </Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
