'use client';

import { useLocale } from '@/lib/locale-navigation';

export default function CatalogLoading() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4" />
        <p className="text-neutral-600">
          {isRTL ? 'جاري تحميل المنتجات...' : 'Loading catalog...'}
        </p>
      </div>
    </div>
  );
}
