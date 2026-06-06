'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND } from '@/content/brand';

export default function BlogPostNotFound() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] === 'en' ? 'en' : 'ar';
  const isRTL = locale === 'ar';

  const copy = {
    ar: {
      code: '404',
      heading: 'المقال غير موجود',
      body: 'ربما تمت إزالة هذا المقال أو تغيير رابطه.',
      cta: 'العودة إلى المدونة',
    },
    en: {
      code: '404',
      heading: 'Article not found',
      body: 'The article you are looking for may have been removed or renamed.',
      cta: 'Back to The Journal',
    },
  }[locale];

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-[70vh] bg-[#FAF7F2] flex flex-col items-center justify-center px-4 text-center"
    >
      {/* Large decorative number */}
      <p
        className="text-[120px] sm:text-[160px] font-black leading-none select-none mb-2"
        style={{ color: `${BRAND.primary}22` }}
        aria-hidden
      >
        {copy.code}
      </p>

      {/* Icon */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto -mt-4 mb-6"
        style={{ backgroundColor: `${BRAND.primary}15` }}
      >
        <svg
          className="w-8 h-8"
          style={{ color: BRAND.primary }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{copy.heading}</h1>
      <p className="text-neutral-500 mb-10 max-w-sm leading-relaxed">{copy.body}</p>

      <Link
        href={`/${locale}/blog`}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ backgroundColor: BRAND.primary }}
      >
        <svg
          className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {copy.cta}
      </Link>
    </div>
  );
}
