import React from "react";
import { useTranslation } from "react-i18next";
import { IMG } from "../../../content/images";

export default function CuratedCollections({ brand, lang = "ar" }) {
  const { t } = useTranslation('home');

  const cols = [
    { key: "bright",  label: t('curatedCollections.items.0.label'), img: IMG.bannerWide,  href: "/catalog?tag=brightening" },
    { key: "acne",    label: t('curatedCollections.items.1.label'), img: IMG.serum,       href: "/catalog?tag=acne" },
    { key: "barrier", label: t('curatedCollections.items.2.label'), img: IMG.cream,       href: "/catalog?tag=barrier" },
    { key: "spf",     label: t('curatedCollections.items.3.label'), img: IMG.hero1, href: "/catalog?tag=spf" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h3 className="text-lg md:text-xl font-extrabold mb-3">
        {t('curatedCollections.title')}
      </h3>

      {/* masonry-like responsive grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cols.map((c) => (
          <a key={c.key} href={c.href} className="group relative rounded-2xl overflow-hidden border border-neutral-200">
            <img src={c.img} alt={c.label}
                 className="w-full h-36 md:h-44 object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            <div className="absolute bottom-2 inset-x-2 text-white font-semibold drop-shadow">
              {c.label}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
