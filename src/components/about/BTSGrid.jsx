import React from "react";
import { IMG } from "../../content/images";

export default function BTSGrid({ brand, lang="ar" }) {
  const isRTL = lang === "ar";
  const tiles = [
    { img: IMG.bannerTall,   titleAr: "التعبئة والجودة",        titleEn: "Packing & QC" },
    { img: IMG.cleanser,     titleAr: "اختبارات القوام",         titleEn: "Texture Testing" },
    { img: IMG.cream,        titleAr: "تعقيم وتخزين آمن",        titleEn: "Sanitized Storage" },
    { img: IMG.hero1,        titleAr: "محتوى تعليمي وصادق",     titleEn: "Honest Education" },
  ];
  return (
    <section className="py-8 md:py-10">
      <h3 className="text-xl md:text-2xl font-extrabold mb-4">
        {isRTL ? "خلف الكواليس" : "Behind the Scenes"}
      </h3>
      <div className="grid md:grid-cols-4 gap-3">
        {tiles.map((t, i) => (
          <figure key={i} className="rounded-2xl overflow-hidden border">
            <div className="h-40 md:h-48">
              <img src={t.img} alt={isRTL ? t.titleAr : t.titleEn} className="w-full h-full object-cover" />
            </div>
            <figcaption className="p-3 text-sm font-semibold">
              {isRTL ? t.titleAr : t.titleEn}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
