'use client';

import React from 'react';

interface SkinConcern {
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

interface SkinConcernFilterProps {
  /** Array of available skin concerns */
  skinConcerns: SkinConcern[];
  /** Array of selected skin concern IDs */
  selectedIds: number[];
  /** Callback when selection changes */
  onSelectionChange: (ids: number[]) => void;
  /** Language for labels (ar/en) */
  lang: string;
  /** Brand colors for styling */
  brandTokens: BrandTokens;
}

/**
 * SkinConcernFilter - Multi-select filter component for skin concerns
 * 
 * Displays checkboxes for each available skin concern with proper localization.
 * Follows the same pattern as brand and category filters.
 */
export default function SkinConcernFilter({
  skinConcerns,
  selectedIds,
  onSelectionChange,
  lang,
  brandTokens,
}: SkinConcernFilterProps) {
  const handleToggle = (id: number) => {
    const newSelection = selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id];
    onSelectionChange(newSelection);
  };

  if (!skinConcerns || skinConcerns.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {skinConcerns.map((skinConcern) => (
        <label
          key={skinConcern.id}
          className="flex items-center gap-2 cursor-pointer hover:bg-neutral-50 p-1 rounded transition-colors"
        >
          <input
            type="checkbox"
            checked={selectedIds.includes(skinConcern.id)}
            onChange={() => handleToggle(skinConcern.id)}
            className="rounded border-neutral-300 w-4 h-4 cursor-pointer"
            style={{ accentColor: brandTokens.primary }}
          />
          <span className="text-sm">
            {lang === 'ar' 
              ? (skinConcern.nameAr || skinConcern.name_ar) 
              : (skinConcern.nameEn || skinConcern.name_en)
            }
          </span>
        </label>
      ))}
    </div>
  );
}
