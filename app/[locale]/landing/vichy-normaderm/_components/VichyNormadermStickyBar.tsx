'use client';

import React, { useEffect, useState } from 'react';
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
  const [visible, setVisible] = useState(false);
  const isAr = lang === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 shadow-2xl py-2.5 px-4 sm:hidden transition-transform duration-300">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-neutral-200 flex-shrink-0 bg-stone-50">
            <Image
              src={product.images[0]?.src || '/products/vichy-normaderm/main.png'}
              alt={isAr ? product.nameAr : product.nameEn}
              fill
              className="object-contain p-1"
              sizes="44px"
            />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-neutral-900 truncate">
              {isAr ? 'فيشي نورماديرم 200مل' : 'Vichy Normaderm 200ml'}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-black text-teal-800">
                {priceFmt(product.price)}
              </span>
              <span className="text-[11px] text-neutral-400 line-through">
                {priceFmt(product.originalPrice)}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToOrder}
          className="py-2.5 px-5 rounded-xl font-extrabold text-xs text-white bg-teal-700 hover:bg-teal-800 active:scale-[0.98] shadow-md shadow-teal-700/20 flex-shrink-0 whitespace-nowrap"
        >
          {isAr ? 'اطلبي الآن · دفع عند الاستلام' : 'Order Now · COD'}
        </button>
      </div>
    </div>
  );
};

export default VichyNormadermStickyBar;
