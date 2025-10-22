import React from "react";
import { IMG } from "../../../content/images";

export default function CuratedCollections({ brand, lang = "ar" }) {
  const cols = [
    { key: "bright",  en: "Glow & Brightening", ar: "تفتيح وتوهّج", img: IMG.bannerWide,  href: "/catalog?tag=brightening" },
    { key: "acne",    en: "Acne Control",       ar: "حبوب وبثور",  img: IMG.serum,       href: "/catalog?tag=acne" },
    { key: "barrier", en: "Barrier Repair",     ar: "إصلاح الحاجز", img: IMG.cream,       href: "/catalog?tag=barrier" },
    { key: "spf",     en: "SPF Essentials",     ar: "أساسيات واقي الشمس", img: IMG.hero1, href: "/catalog?tag=spf" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h3 className="text-lg md:text-xl font-extrabold mb-3">
        {lang === "ar" ? "مجموعات مختارة" : "Curated collections"}
      </h3>

      {/* masonry-like responsive grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cols.map((c) => (
          <a key={c.key} href={c.href} className="group relative rounded-2xl overflow-hidden border border-neutral-200">
            <img src={c.img} alt={lang === "ar" ? c.ar : c.en}
                 className="w-full h-36 md:h-44 object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            <div className="absolute bottom-2 inset-x-2 text-white font-semibold drop-shadow">
              {lang === "ar" ? c.ar : c.en}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
