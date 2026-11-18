'use client';

import React, { useCallback } from 'react';

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
 * PriceRangeSlider - A dual-handle range slider for price filtering.
 *
 * Built with native <input type="range"> — no external dependencies.
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
  const isRTL = lang === 'ar';

  const handleMinSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = Number(e.target.value);
      if (newMin < value[1]) onChange([newMin, value[1]]);
    },
    [value, onChange],
  );

  const handleMaxSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Number(e.target.value);
      if (newMax > value[0]) onChange([value[0], newMax]);
    },
    [value, onChange],
  );

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value) || min;
    if (newMin >= min && newMin < value[1]) onChange([newMin, value[1]]);
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value) || max;
    if (newMax <= max && newMax > value[0]) onChange([value[0], newMax]);
  };

  // Don't render if min >= max (invalid range)
  if (min >= max) return null;

  const minLabel = isRTL ? 'الحد الأدنى' : 'Min';
  const maxLabel = isRTL ? 'الحد الأقصى' : 'Max';

  // Percentages for the coloured track fill
  const range = max - min;
  const leftPct = ((value[0] - min) / range) * 100;
  const rightPct = ((max - value[1]) / range) * 100;

  // In RTL the visual track is flipped
  const trackStyle = isRTL
    ? { right: `${leftPct}%`, left: `${rightPct}%`, backgroundColor: brandTokens.primary }
    : { left: `${leftPct}%`, right: `${rightPct}%`, backgroundColor: brandTokens.primary };

  const thumbCSS = `
    .price-thumb {
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      pointer-events: none;
    }
    .price-thumb::-webkit-slider-runnable-track {
      background: transparent;
      height: 6px;
    }
    .price-thumb::-moz-range-track {
      background: transparent;
      height: 6px;
    }
    .price-thumb::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: ${brandTokens.primary};
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      cursor: pointer;
      pointer-events: all;
      margin-top: -7px;
    }
    .price-thumb::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: ${brandTokens.primary};
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      cursor: pointer;
      pointer-events: all;
    }
  `;

  return (
    <div className="px-2 pt-2 pb-4">
      {/* Scoped thumb styles */}
      <style>{thumbCSS}</style>

      {/* Manual number inputs */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1">
          <label className="block text-xs text-neutral-600 mb-1.5">{minLabel}</label>
          <input
            type="number"
            value={value[0]}
            onChange={handleMinInput}
            min={min}
            max={value[1] - 1}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{ outlineColor: brandTokens.primary }}
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-neutral-600 mb-1.5">{maxLabel}</label>
          <input
            type="number"
            value={value[1]}
            onChange={handleMaxInput}
            min={value[0] + 1}
            max={max}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{ outlineColor: brandTokens.primary }}
          />
        </div>
      </div>

      {/* Dual-range slider track */}
      <div
        className="relative h-6 flex items-center"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Rail (grey background) */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-neutral-200" />

        {/* Active track (coloured fill between handles) */}
        <div className="absolute h-1.5 rounded-full" style={trackStyle} />

        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={handleMinSlider}
          dir={isRTL ? 'rtl' : 'ltr'}
          className="price-thumb absolute inset-0 w-full h-full cursor-pointer appearance-none bg-transparent"
          style={{ zIndex: value[0] > max - 10 ? 5 : 3 }}
        />

        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={handleMaxSlider}
          dir={isRTL ? 'rtl' : 'ltr'}
          className="price-thumb absolute inset-0 w-full h-full cursor-pointer appearance-none bg-transparent"
          style={{ zIndex: 4 }}
        />
      </div>
    </div>
  );
}
