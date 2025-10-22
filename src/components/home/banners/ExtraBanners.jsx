import React from "react";
import { IMG } from "../../../content/images";

export default function MoreBanners({ brand, lang = "ar" }) {
  const cards = [
    { img: IMG.bannerTall,  en: "Derm-approved routines", ar: "روتينات موصى بها من خبراء", href: "/catalog?tag=derm" },
    { img: IMG.oils,        en: "Hydrate without shine",  ar: "ترطيب بدون لمعان",         href: "/catalog?tag=oil-free" },
    { img: IMG.cleanser,    en: "Cleansers that care",    ar: "منظفات لطيفة",             href: "/catalog?cat=cleansers" },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-3">
        {cards.map((c, i) => (
          <a key={i} href={c.href} className="group relative rounded-3xl overflow-hidden border border-neutral-200">
            <img src={c.img} alt={lang === "ar" ? c.ar : c.en}
                 className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <div className="font-extrabold text-lg">{lang === "ar" ? c.ar : c.en}</div>
              <div className="text-sm opacity-90">{lang === "ar" ? "تسوق الآن" : "Shop now"} →</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
