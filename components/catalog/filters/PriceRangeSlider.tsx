'use client';

import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface BrandTokens {
  primary: string;
  dark: string;
  light: string;
}

interface PriceRangeSliderProps {
  /** Current price range [min, max] */
  value: [number, number];
  /** Minimum allowed price */
  min: number;
  /** Maximum allowed price */
  max: number;
  /** Brand colors for styling */
  brandTokens: BrandTokens;
  /** Language for labels */
  lang: string;
  /** Callback when price range changes */
  onChange: (value: [number, number]) => void;
}

/**
 * PriceRangeSlider - A dual-handle range slider for price filtering
 * 
 * Uses rc-slider under the hood with custom brand styling.
 * Supports RTL layout for Arabic.
 */
export default function PriceRangeSlider({
  value,
  min,
  max,
  brandTokens,
  lang,
  onChange,
}: PriceRangeSliderProps) {
  const currency = lang === 'ar' ? 'ج.م' : 'EGP';
  const isRTL = lang === 'ar';

  const handleChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue) && newValue.length === 2) {
      onChange([newValue[0], newValue[1]]);
    }
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value) || min;
    if (newMin >= min && newMin < value[1]) {
      onChange([newMin, value[1]]);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value) || max;
    if (newMax <= max && newMax > value[0]) {
      onChange([value[0], newMax]);
    }
  };

  // Don't render if min >= max (invalid range)
  if (min >= max) {
    return null;
  }

  const minLabel = lang === 'ar' ? 'الحد الأدنى' : 'Min';
  const maxLabel = lang === 'ar' ? 'الحد الأقصى' : 'Max';

  return (
    <div className="px-2 pt-2 pb-4">
      {/* Manual number inputs */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1">
          <label className="block text-xs text-neutral-600 mb-1.5">{minLabel}</label>
          <div className="relative">
            <input
              type="number"
              value={value[0]}
              onChange={handleMinInputChange}
              min={min}
              max={value[1] - 1}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              style={{ outlineColor: brandTokens.primary }}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 pointer-events-none"
                  style={{ [isRTL ? 'right' : 'left']: '0.75rem' }}>
            </span>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-xs text-neutral-600 mb-1.5">{maxLabel}</label>
          <div className="relative">
            <input
              type="number"
              value={value[1]}
              onChange={handleMaxInputChange}
              min={value[0] + 1}
              max={max}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              style={{ outlineColor: brandTokens.primary }}
            />
          </div>
        </div>
      </div>

      {/* Range slider - reversed in RTL mode */}
      <Slider
        range
        min={min}
        max={max}
        value={[value[0], value[1]]}
        onChange={handleChange}
        allowCross={false}
        reverse={isRTL}
        styles={{
          track: { backgroundColor: brandTokens.primary, height: 6 },
          handle: {
            backgroundColor: brandTokens.primary,
            borderColor: brandTokens.primary,
            width: 20,
            height: 20,
            marginTop: -7,
            opacity: 1,
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          },
          rail: { backgroundColor: '#e5e7eb', height: 6 },
        }}
      />

      {/* Min/Max bounds display */}
      {/* <div className="flex justify-between text-xs text-neutral-400 mt-4">
        <span>{min} {currency}</span>
        <span>{max} {currency}</span>
      </div> */}
    </div>
  );
}
