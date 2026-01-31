// VariantSelector.jsx
import React from "react";

export default function VariantSelector({ lang, brand, variants, value, onChange }){
  if(!variants?.length) return null;
  return (
    <div>
      <div className="text-sm font-semibold mb-2">{lang==="ar"?"اختر الحجم":"Choose size"}</div>
      <div className="flex flex-wrap gap-2">
        {variants.map(v => (
          <button key={v.id} onClick={()=>v.inStock && onChange(v)} disabled={!v.inStock}
            className={`px-3 py-2 rounded-2xl border text-sm ${value.id===v.id?'text-white':'text-neutral-800'} ${!v.inStock?'opacity-50':''}`}
            style={{ background: value.id===v.id? brand.primary : 'white', borderColor: value.id===v.id? brand.primary : '#e5e7eb' }}>
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}