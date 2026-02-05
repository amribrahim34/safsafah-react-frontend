import React from "react";

interface FilterPill {
  key: string;
  label: string;
  value: any;
}

interface BrandTokens {
  primary: string;
  dark: string;
  light: string;
}

interface FilterPillBarProps {
  pills: FilterPill[];
  onClear: (pill: FilterPill) => void;
  onClearAll: () => void;
  brand: BrandTokens;
  lang: string;
}

export default function FilterPillBar({ pills, onClear, onClearAll, brand, lang }: FilterPillBarProps) {
  if (!pills.length) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {pills.map((p, idx) => (
        <button
          key={idx}
          onClick={() => onClear(p)}
          className="px-3 py-1.5 rounded-full text-sm text-white flex items-center gap-1 hover:opacity-90 transition-opacity"
          style={{ background: brand.primary }}
          type="button"
        >
          <span>{p.label}</span>
          <span className="font-bold">×</span>
        </button>
      ))}
      <button
        onClick={onClearAll}
        className="px-3 py-1.5 rounded-full text-sm border font-medium hover:bg-neutral-50 transition-colors"
        style={{ borderColor: brand.primary, color: brand.primary, background: "white" }}
        type="button"
      >
        {lang === "ar" ? "مسح الكل" : "Clear all"}
      </button>
    </div>
  );
}
