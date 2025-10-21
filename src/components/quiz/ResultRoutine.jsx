

// ResultRoutine.jsx
import React from "react";

export default function ResultRoutine({ lang, brand, routine }){
  const Tip = ({children})=> <li className="text-sm text-neutral-700">{children}</li>;
  return (
    <div className="rounded-3xl border border-neutral-200 p-4 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold">{lang==="ar"?"روتينك الشخصي":"Your personalized routine"}</h2>
          <p className="text-neutral-600 text-sm">{lang==="ar"?"صباحًا ومساءً بناءً على إجاباتك":"Morning & night based on your answers"}</p>
        </div>
        <a href="#bestsellers" className="px-4 py-2 rounded-2xl text-white font-semibold" style={{background:brand.primary}}>
          {lang==="ar"?"اطلب المنتجات الآن":"Shop these picks"}
        </a>
      </div>
    </div>
  );
}
