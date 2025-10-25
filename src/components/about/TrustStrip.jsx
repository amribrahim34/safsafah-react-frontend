import React from "react";
import { Shield, Truck, BadgeCheck, Wallet, Leaf } from "lucide-react";

export default function TrustStrip({ brand, lang="ar" }) {
  const isRTL = lang === "ar";
  const items = [
    { icon: Shield,    ar: "ضمان أصالة المنتجات",            en: "Authenticity Guarantee" },
    { icon: Truck,     ar: "توصيل سريع داخل مصر",            en: "Fast Delivery Across Egypt" },
    { icon: BadgeCheck,ar: "إرجاع مجاني خلال 14 يومًا",      en: "Free Returns Within 14 Days" },
    { icon: Wallet,    ar: "الدفع عند الاستلام متاح",        en: "Cash on Delivery Available" },
    { icon: Leaf,      ar: "لا تجارب على الحيوانات",         en: "No Animal Testing" },
  ];
  return (
    <section className="py-6">
      <div className="rounded-3xl border border-neutral-200 p-4 md:p-5 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {items.map((it, i) => (
            <div key={i} className="flex items-center gap-2">
              <it.icon className="w-5 h-5" style={{ color: brand.primary }} />
              <div className="text-sm font-semibold">{isRTL ? it.ar : it.en}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
