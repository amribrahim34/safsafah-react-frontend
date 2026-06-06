'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND } from '@/content/brand';

export default function GlobalNotFound() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] === 'en' ? 'en' : 'ar';
  const isRTL = locale === 'ar';

  const copy = {
    ar: {
      code: '404',
      heading: 'الصفحة غير موجودة',
      body: 'يبدو أن الصفحة التي تبحثين عنها لم تعد موجودة أو تم تغيير رابطها.',
      home: 'الرئيسية',
      blog: 'المدونة',
    },
    en: {
      code: '404',
      heading: 'Page not found',
      body: "The page you're looking for doesn't exist or may have been moved.",
      home: 'Home',
      blog: 'The Journal',
    },
  }[locale];

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-4 text-center"
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
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{copy.heading}</h1>
      <p className="text-neutral-500 mb-10 max-w-sm leading-relaxed">{copy.body}</p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href={`/${locale}`}
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12l7-7M3 12l7 7" />
          </svg>
          {copy.home}
        </Link>

        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold border border-neutral-200 bg-white text-neutral-700 hover:border-brand hover:text-brand transition-all"
        >
          {copy.blog}
        </Link>
      </div>
    </div>
  );
}
