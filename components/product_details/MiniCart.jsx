
import React from "react";

export default function MiniCart({ open, onClose, brand, lang }){
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[92%] md:w-[420px] bg-white shadow-xl p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold">{lang==="ar"?"سلة المشتريات":"Your bag"}</div>
          <button onClick={onClose} className="text-neutral-600">✕</button>
        </div>
        <div className="mt-3 text-sm text-neutral-700">{lang==="ar"?"منتج واحد مضاف. شحن مجاني فوق 500 جنيه.":"1 item added. Free shipping over 500 EGP."}</div>
        <div className="mt-4">
          <button className="w-full px-5 py-3 rounded-2xl text-white font-semibold" style={{background:brand.primary}}>
            {lang==="ar"?"إتمام الشراء":"Checkout"}
          </button>
          <div className="text-xs text-neutral-500 mt-2">{lang==="ar"?"خطوة واحدة أقرب لبشرة متوهجة ✨":"One step closer to glowing skin ✨"}</div>
        </div>
      </div>
    </div>
  );
}
