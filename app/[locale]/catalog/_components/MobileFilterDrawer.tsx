import { useEffect } from 'react';
import Filters from '@/components/catalog/filters/Filters';
import type { FilterState } from '@/components/catalog/filters/Filters';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
  brand: { primary: string; dark: string; light: string };
  catalogFilters: { categories: any[]; brands: any[] };
  filterState: FilterState;
  onApply: () => void;
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  lang,
  brand,
  catalogFilters,
  filterState,
  onApply,
}: MobileFilterDrawerProps) {
  const isRTL = lang === 'ar';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-x-0 bg-white z-50 md:hidden transform transition-transform duration-300 ease-in-out rounded-t-3xl shadow-2xl ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          bottom: '70px',
          maxHeight: 'calc(85vh - 70px)',
          height: 'calc(85vh - 70px)',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 flex-shrink-0">
            <h3 className="text-lg font-bold">
              {isRTL ? 'الفلاتر' : 'Filters'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-xl transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-4 min-h-0">
            <Filters
              lang={lang}
              brandTokens={brand}
              priceMin={0}
              priceMax={5000}
              catalogFilters={catalogFilters}
              state={filterState}
            />
          </div>

          {/* Footer — Apply button */}
          <div className="p-4 border-t border-neutral-200 bg-white flex-shrink-0">
            <button
              onClick={() => {
                onClose();
                onApply();
              }}
              className="w-full py-3 px-4 rounded-xl text-white font-semibold transition-all hover:opacity-90 shadow-lg"
              style={{ backgroundColor: brand.primary }}
            >
              {isRTL ? 'تطبيق الفلاتر' : 'Apply Filters'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
