'use client';

import React, { useState } from "react";

export default function BeautyProfileCard({ brand, lang = "ar" }) {
  const isRTL = lang === "ar";
  const [skin, setSkin] = useState("combo");
  const [concerns, setConcerns] = useState(["pigmentation"]);

  const toggle = (k) => setConcerns((s) => s.includes(k) ? s.filter(x => x !== k) : [...s, k]);

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="text-lg font-extrabold mb-2">{isRTL ? "ملف الجمال" : "Beauty profile"}</div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <div className="text-sm font-semibold mb-1">{isRTL ? "نوع البشرة" : "Skin type"}</div>
          <div className="flex flex-wrap gap-2">
            {optsSkin.map(o => (
              <button key={o.id} onClick={() => setSkin(o.id)}
                className={`px-3 py-1.5 rounded-xl border text-sm ${skin === o.id ? "text-white" : ""}`}
                style={{ background: skin === o.id ? brand.primary : "transparent" }}>
                {isRTL ? o.ar : o.en}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold mb-1">{isRTL ? "الاهتمامات" : "Concerns"}</div>
          <div className="flex flex-wrap gap-2">
            {optsConcerns.map(o => (
              <button key={o.id} onClick={() => toggle(o.id)}
                className={`px-3 py-1.5 rounded-xl border text-sm ${concerns.includes(o.id) ? "text-white" : ""}`}
                style={{ background: concerns.includes(o.id) ? brand.primary : "transparent" }}>
                {isRTL ? o.ar : o.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      <a href="/catalog?personalized=1" className="inline-block mt-3 px-4 py-2 rounded-2xl text-white font-semibold" style={{ background: brand.primary }}>
        {isRTL ? "مشاهدة الروتين المقترح" : "See my routine"}
      </a>
    </section>
  );
}

const optsSkin = [
  { id: "oily", en: "Oily", ar: "دهني" },
  { id: "dry", en: "Dry", ar: "جاف" },
  { id: "combo", en: "Combination", ar: "مختلط" },
  { id: "sensitive", en: "Sensitive", ar: "حساس" },
];
const optsConcerns = [
  { id: "acne", en: "Acne", ar: "حبوب" },
  { id: "pigmentation", en: "Pigmentation", ar: "تصبغات" },
  { id: "redness", en: "Redness", ar: "احمرار" },
  { id: "aging", en: "Fine lines", ar: "خطوط رفيعة" },
];
