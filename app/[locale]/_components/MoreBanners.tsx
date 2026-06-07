'use client';

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";


interface BannerCard {
  img: string;
  title: string;
  href: string;
}

export default function MoreBanners() {
  const { t } = useTranslation('home');

  const cards: BannerCard[] = [
    { img: "/credibility-badges/cash.webp", title: t('extraBanners.items.0.title'), href: "/catalog" },
    { img: "/credibility-badges/original.webp", title: t('extraBanners.items.1.title'), href: "/catalog" },
    { img: "/credibility-badges/sale.webp", title: t('extraBanners.items.2.title'), href: "/catalog?sale=true" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-3">
        {cards.map((c, i) => (
          <Link key={i} href={c.href} className="group relative h-48 md:h-64 overflow-hidden">
            <Image src={c.img} alt={c.title} fill
                 className="object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" /> */}
            <div className="absolute bottom-3 left-4 right-4 text-white">
              {/* <div className="font-extrabold text-lg">{c.title}</div> */}
              {/* <div className="text-sm opacity-90">{t('extraBanners.shopNow')} →</div> */}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
