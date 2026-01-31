import React from "react";
import { useTranslation } from "react-i18next";
import { IMG } from "../../../content/images";

export default function MoreBanners({ brand, lang = "ar" }) {
  const { t } = useTranslation('home');

  const cards = [
    { img: IMG.bannerTall,  title: t('extraBanners.items.0.title'), href: "/catalog?tag=derm" },
    { img: IMG.oils,        title: t('extraBanners.items.1.title'), href: "/catalog?tag=oil-free" },
    { img: IMG.cleanser,    title: t('extraBanners.items.2.title'), href: "/catalog?cat=cleansers" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-3">
        {cards.map((c, i) => (
          <a key={i} href={c.href} className="group relative rounded-3xl overflow-hidden border border-neutral-200">
            <img src={c.img} alt={c.title}
                 className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <div className="font-extrabold text-lg">{c.title}</div>
              <div className="text-sm opacity-90">{t('extraBanners.shopNow')} →</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
