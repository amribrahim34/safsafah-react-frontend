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

  // Don't render if min >= max (invalid range)
  if (min >= max) {
    return null;
  }

  // In RTL mode, we display max on left and min on right
  // to match the visual layout where the slider is reversed
  const leftLabel = isRTL ? value[1] : value[0];
  const rightLabel = isRTL ? value[0] : value[1];
  const leftBound = isRTL ? max : min;
  const rightBound = isRTL ? min : max;

  return (
    <div className="px-2 pt-2 pb-4">
      {/* Current price display - swapped in RTL */}
      <div className="flex justify-between text-sm text-neutral-600 mb-6">
        <span className="bg-neutral-100 px-2 py-1 rounded">
          {leftLabel} {currency}
        </span>
        <span className="bg-neutral-100 px-2 py-1 rounded">
          {rightLabel} {currency}
        </span>
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

      {/* Min/Max bounds display - swapped in RTL */}
      <div className="flex justify-between text-xs text-neutral-400 mt-4">
        <span>{leftBound} {currency}</span>
        <span>{rightBound} {currency}</span>
      </div>
    </div>
  );
}
