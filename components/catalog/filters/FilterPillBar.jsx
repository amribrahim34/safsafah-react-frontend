import React from "react";

export default function FilterPillBar({ pills, onClear, onClearAll, brand, lang }) {
  if (!pills.length) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {pills.map((p, idx) => (
        <button
          key={idx}
          onClick={() => onClear(p)}
          className="px-3 py-1 rounded-full text-sm text-white"
          style={{ background: brand.primary }}
          type="button"
        >
          {p.label} ×
        </button>
      ))}
      <button
        onClick={onClearAll}
        className="px-3 py-1 rounded-full text-sm border"
        style={{ borderColor: brand.primary, color: brand.primary, background: "white" }}
        type="button"
      >
        {lang === "ar" ? "مسح الكل" : "Clear all"}
      </button>
    </div>
  );
}
