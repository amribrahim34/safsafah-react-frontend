'use client';

import React from 'react';

interface SkinType {
  id: number;
  nameAr?: string;
  nameEn?: string;
  name_ar?: string;  // Laravel API snake_case
  name_en?: string;  // Laravel API snake_case
}

interface BrandTokens {
  primary: string;
  dark: string;
  light: string;
}

interface SkinTypeFilterProps {
  /** Array of available skin types */
  skinTypes: SkinType[];
  /** Array of selected skin type IDs */
  selectedIds: number[];
  /** Callback when selection changes */
  onSelectionChange: (ids: number[]) => void;
  /** Language for labels (ar/en) */
  lang: string;
  /** Brand colors for styling */
  brandTokens: BrandTokens;
}

/**
 * SkinTypeFilter - Multi-select filter component for skin types
 * 
 * Displays checkboxes for each available skin type with proper localization.
 * Follows the same pattern as brand and category filters.
 */
export default function SkinTypeFilter({
  skinTypes,
  selectedIds,
  onSelectionChange,
  lang,
  brandTokens,
}: SkinTypeFilterProps) {
  const handleToggle = (id: number) => {
    const newSelection = selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id];
    onSelectionChange(newSelection);
  };

  if (!skinTypes || skinTypes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {skinTypes.map((skinType) => (
        <label
          key={skinType.id}
          className="flex items-center gap-2 cursor-pointer hover:bg-neutral-50 p-1 rounded transition-colors"
        >
          <input
            type="checkbox"
            checked={selectedIds.includes(skinType.id)}
            onChange={() => handleToggle(skinType.id)}
            className="rounded border-neutral-300 w-4 h-4 cursor-pointer"
            style={{ accentColor: brandTokens.primary }}
          />
          <span className="text-sm">
            {lang === 'ar' 
              ? (skinType.nameAr || skinType.name_ar) 
              : (skinType.nameEn || skinType.name_en)
            }
          </span>
        </label>
      ))}
    </div>
  );
}
