'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import type { LandingBundle, LandingLang } from './types';

interface BundleSelectorProps {
  bundles: Record<1 | 2 | 3, LandingBundle>;
  selected: 1 | 2 | 3;
  onChange: (bundle: 1 | 2 | 3) => void;
  lang: LandingLang;
  priceFmt: (val: number) => string;
}

/**
 * Reusable bundle selector used by any landing-page COD order form.
 * Renders 3 clickable bundle cards with price, discount, and badge.
 */
export const BundleSelector: React.FC<BundleSelectorProps> = ({
  bundles,
  selected,
  onChange,
  lang,
  priceFmt,
}) => {
  const isAr = lang === 'ar';

  const unitLabels: Record<1 | 2 | 3, { ar: string; en: string }> = {
    1: { ar: 'عبوة واحدة (50 جم)', en: '1 Unit (50g)' },
    2: { ar: 'عبوتان (100 جم)', en: '2 Units (100g)' },
    3: { ar: '٣ عبوات (150 جم)', en: '3 Units (150g)' },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {([1, 2, 3] as const).map((b) => {
        const item = bundles[b];
        const isSelected = selected === b;
        return (
          <div
            key={b}
            role="radio"
            aria-checked={isSelected}
            tabIndex={0}
            onClick={() => onChange(b)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onChange(b)}
            className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all select-none ${
              isSelected
                ? 'border-teal-700 bg-white shadow-md ring-2 ring-teal-700/20'
                : 'border-neutral-200 bg-neutral-50/60 hover:bg-white hover:border-neutral-300'
            }`}
          >
            {item.badgeAr && (
              <span
                className={`absolute -top-2.5 start-3 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  b === 3
                    ? 'bg-emerald-600 text-white'
                    : b === 2
                    ? 'bg-teal-700 text-white'
                    : 'bg-neutral-800 text-white'
                }`}
              >
                {isAr ? item.badgeAr : item.badgeEn}
              </span>
            )}

            <div className="text-center pt-2">
              <div className="font-bold text-sm sm:text-base text-neutral-900">
                {isAr ? unitLabels[b].ar : unitLabels[b].en}
              </div>
              <div className="mt-2 text-xl font-black text-teal-800">
                {priceFmt(item.price)}
              </div>
              <div className="text-xs text-neutral-400 line-through">
                {priceFmt(item.originalPrice)}
              </div>
              <div className="mt-2 text-[11px] font-medium text-neutral-600">
                {item.shipping === 0 ? (
                  <span className="text-emerald-700 font-bold">
                    {isAr ? 'شحن مجاني' : 'Free Shipping'}
                  </span>
                ) : (
                  <span>
                    {isAr
                      ? `الشحن: ${priceFmt(item.shipping)}`
                      : `Shipping: ${priceFmt(item.shipping)}`}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Reusable inline error message ───────────────────────────────────────────

interface FieldErrorProps {
  id: string;
  message?: string;
}

export const FieldError: React.FC<FieldErrorProps> = ({ id, message }) => {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 flex items-center gap-1 text-xs text-red-500">
      <AlertCircle className="w-3 h-3 shrink-0" />
      {message}
    </p>
  );
};

// ─── Shared input class helper ────────────────────────────────────────────────

export const inputCls = (hasError: boolean) =>
  `w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none bg-white transition-colors ${
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
      : 'border-neutral-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20'
  }`;
