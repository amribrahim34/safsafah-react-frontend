'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TocItem } from '../_lib/parseToc';
import { BRAND } from '@/content/brand';

interface Props {
  tocItems: TocItem[];
  locale: string;
}

export default function BlogPostTocClient({ tocItems, locale }: Props) {
  const { t } = useTranslation('blog');
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRTL = locale === 'ar';

  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id);
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    );

    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  if (tocItems.length === 0) return null;

  const TocList = () => (
    <nav aria-label={t('tableOfContents')}>
      <ul className="space-y-1 text-sm" dir={isRTL ? 'rtl' : 'ltr'}>
        {tocItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className={item.level === 3 ? (isRTL ? 'me-3' : 'ms-3') : ''}>
              <a
                href={`#${item.id}`}
                onClick={() => setMobileOpen(false)}
                className={[
                  'block py-1 px-3 rounded-lg transition-all duration-200 leading-snug',
                  isActive
                    ? 'font-semibold border-s-2'
                    : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100',
                ].join(' ')}
                style={isActive ? { color: BRAND.primary, borderColor: BRAND.primary } : {}}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop TOC */}
      <div className="hidden lg:block">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
          {t('tableOfContents')}
        </h3>
        <TocList />
      </div>

      {/* Mobile TOC — collapsible */}
      <div className="lg:hidden mb-6 rounded-2xl border border-neutral-200 bg-white overflow-hidden">
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-neutral-800"
          aria-expanded={mobileOpen}
        >
          <span>{t('tableOfContents')}</span>
          <svg
            className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {mobileOpen && (
          <div className="px-5 pb-4">
            <TocList />
          </div>
        )}
      </div>
    </>
  );
}
