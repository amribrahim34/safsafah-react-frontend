import React from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Truck, RotateCcw, HandCoins } from "lucide-react";
import { IMG } from "../../../content/images";

// quick logo list (swap with real logos later)
const BRAND_LOGOS = [
  { name: "The Ordinary", img: IMG.hero1 },
  { name: "L'Oréal",      img: IMG.hero2 },
  { name: "Nuxe",         img: IMG.bannerWide },
  { name: "CeraVe",       img: IMG.cream },
];

export default function BrandTrust({ brand, lang = "ar" }) {
  const { t } = useTranslation('home');

  const Badge = ({ icon:Icon, label }) => (
    <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-2">
      <Icon className="w-5 h-5" style={{ color: brand.primary }} />
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h3 className="text-lg md:text-xl font-extrabold mb-4">{t('brandTrust.title')}</h3>

      {/* Logos: horizontal snap on mobile, grid on desktop */}
      <div className="relative -mx-4 md:mx-0">
        <div className="flex md:grid md:grid-cols-4 gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4">
          {BRAND_LOGOS.map((b, i) => (
            <div key={i} className="snap-center min-w-[48%] md:min-w-0 rounded-2xl border border-neutral-200 bg-white p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border">
                <img src={b.img} alt={b.name} className="w-full h-full object-cover" />
              </div>
              <div className="font-semibold">{b.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <Badge icon={ShieldCheck} label={t('brandTrust.authentic')} />
        <Badge icon={Truck}      label={t('brandTrust.fast')} />
        <Badge icon={HandCoins}  label={t('brandTrust.cod')} />
        <Badge icon={RotateCcw}  label={t('brandTrust.returns')} />
      </div>
    </section>
  );
}
