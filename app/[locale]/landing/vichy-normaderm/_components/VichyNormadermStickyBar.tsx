'use client';

import React from 'react';
import Image from 'next/image';
import type { VichyNormadermProductData } from '../_types';

interface VichyNormadermStickyBarProps {
  product: VichyNormadermProductData;
  lang: string;
}

export const VichyNormadermStickyBar: React.FC<VichyNormadermStickyBarProps> = ({
  product,
  lang,
}) => {
  const isAr = lang === 'ar';

  const scrollToOrder = () => {
    const target = document.getElementById('express-order-section');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const priceFmt = (val: number) =>
    new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 shadow-2xl py-2.5 px-3 sm:px-4 md:hidden pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between gap-2 sm:gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden border border-neutral-200 flex-shrink-0 bg-stone-50">
            <Image
              src={product.images[0]?.src || '/products/vichy-normaderm/main.jpeg'}
              alt={isAr ? product.nameAr : product.nameEn}
              fill
              className="object-contain p-1"
              sizes="44px"
            />
          </div>
          <div className="min-w-0 overflow-hidden">
            <div className="text-[11px] sm:text-xs font-bold text-neutral-900 truncate">
              {isAr ? 'فيشي نورماديرم 200مل' : 'Vichy Normaderm 200ml'}
            </div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-[13px] sm:text-sm font-black text-teal-800 whitespace-nowrap">
                {priceFmt(product.price)}
              </span>
              <span className="text-[10px] sm:text-[11px] text-neutral-400 line-through whitespace-nowrap">
                {priceFmt(product.originalPrice)}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToOrder}
          className="py-2.5 px-3 sm:px-5 rounded-xl font-extrabold text-[11px] sm:text-xs text-white bg-teal-700 hover:bg-teal-800 active:scale-[0.98] shadow-md shadow-teal-700/20 flex-shrink-0 whitespace-nowrap"
        >
          {isAr ? 'اطلبي الآن · دفع عند الاستلام' : 'Order Now · COD'}
        </button>
      </div>
    </div>
  );
};

export default VichyNormadermStickyBar;
