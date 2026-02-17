import Filters from '@/components/catalog/filters/Filters';
import type { FilterState } from '@/components/catalog/filters/Filters';

interface DesktopFilterSidebarProps {
  lang: string;
  brand: { primary: string; dark: string; light: string };
  catalogFilters: { categories: any[]; brands: any[]; skinTypes: any[]; skinConcerns: any[] };
  filterState: FilterState;
  onApply: () => void;
}

export default function DesktopFilterSidebar({
  lang,
  brand,
  catalogFilters,
  filterState,
  onApply,
}: DesktopFilterSidebarProps) {
  const isRTL = lang === 'ar';

  return (
    <aside className="hidden md:block">
      <div className="sticky top-20 flex flex-col" style={{ maxHeight: 'calc(100vh - 5rem)' }}>
        {/* Filters — scrollable */}
        <div className="flex-1 overflow-y-auto pr-2">
          <Filters
            lang={lang}
            brandTokens={brand}
            priceMin={0}
            priceMax={5000}
            catalogFilters={catalogFilters}
            state={filterState}
          />
        </div>

        {/* Apply button — sticky at bottom */}
        <div className="pt-3 pb-2 bg-white border-t border-neutral-200 mt-2">
          <button
            onClick={onApply}
            className="w-full py-3 px-4 rounded-xl text-white font-semibold transition-all hover:opacity-90 shadow-lg"
            style={{ backgroundColor: brand.primary }}
          >
            {isRTL ? 'تطبيق الفلاتر' : 'Apply Filters'}
          </button>
        </div>
      </div>
    </aside>
  );
}
