
import React from "react";
// import ProductGrid from "../products/ProductGrid";
import ProductGrid from "../products/ProductGrid";
const BUNDLE = [
  { id: 301, name:{en:"Ceramide Barrier Cream", ar:"كريم حاجز السيراميد"}, price:760, rating:4.8, img: "/products/retinol-eye-cream-1.jpg" },
  { id: 401, name:{en:"SPF 50 PA++++ Fluid", ar:"واقي شمس سائل 50"}, price:880, rating:4.4, img: "/hero/hero1.jpeg" },
];

export default function BundleOffers({ brand, lang, baseProduct, onAdd }){
  return (
    <div className="rounded-3xl border border-neutral-200 p-4">
      <div className="flex items-center justify-between">
        <div className="font-bold text-lg">{lang==="ar"?"أكمل روتينك ووفّر":"Complete the routine & save"}</div>
        <div className="text-sm text-neutral-600">{lang==="ar"?"أضف السيروم + المرطّب لتحصل على خصم 15%":"Add serum + moisturizer to get 15% off"}</div>
      </div>
      <div className="mt-4"><ProductGrid products={BUNDLE} lang={lang} brand={brand} /></div>
      <div className="mt-3">
        <button onClick={onAdd} className="px-5 py-3 rounded-2xl text-white font-semibold" style={{background:brand.primary}}>
          {lang==="ar"?"أضف البندل للسلة":"Add bundle to cart"}
        </button>
      </div>
    </div>
  );
}
