'use client';

import { useTranslation } from 'react-i18next';
import type { BlogCategory } from '@/types/models/blog';
import { BRAND } from '@/content/brand';

interface MobileBlogFiltersProps {
  locale: string;
  categories: BlogCategory[];
  selectedCategoryId: number | null;
  onCategorySelect: (id: number | null) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

export default function MobileBlogFilters({
  locale,
  categories,
  selectedCategoryId,
  onCategorySelect,
  searchQuery,
  onSearchChange,
}: MobileBlogFiltersProps) {
  const { t } = useTranslation('blog');
  const isRTL = locale === 'ar';

  return (
    <div className="md:hidden px-4 mb-6 space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 pe-10 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
        />
        <svg
          className="absolute top-1/2 -translate-y-1/2 end-3 text-neutral-400"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Horizontal category scroll pills */}
      {categories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => onCategorySelect(null)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all"
            style={
              selectedCategoryId === null
                ? { background: BRAND.primary, color: '#fff', borderColor: BRAND.primary }
                : { background: '#fff', color: '#374151', borderColor: '#e5e7eb' }
            }
          >
            {t('allCategories')}
          </button>
          {categories.map((cat) => {
            const name = isRTL ? cat.nameAr : cat.nameEn;
            const isActive = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={
                  isActive
                    ? { background: BRAND.primary, color: '#fff', borderColor: BRAND.primary }
                    : { background: '#fff', color: '#374151', borderColor: '#e5e7eb' }
                }
              >
                {name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
