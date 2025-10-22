import React from "react";
import { ShieldCheck, Truck, Wallet, RotateCcw } from "lucide-react";

export default function TrustBadgesWide({ brand: theme, lang = "ar" }) {
  const Item = ({ Icon, title, sub }) => (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 h-full">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5" style={{ color: theme.primary }} />
        <div className="font-semibold">{title}</div>
      </div>
      <div className="text-neutral-600 text-sm mt-1">{sub}</div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Item
          Icon={ShieldCheck}
          title={lang === "ar" ? "منتجات أصلية" : "Authentic Products"}
          sub={lang === "ar" ? "ضمان المصدر والتغليف المختوم" : "Verified sourcing & sealed packaging"}
        />
        <Item
          Icon={Truck}
          title={lang === "ar" ? "توصيل سريع" : "Fast Delivery"}
          sub={lang === "ar" ? "القاهرة/الجيزة خلال 24-48 ساعة" : "Cairo/Giza in 24-48h"}
        />
        <Item
          Icon={Wallet}
          title={lang === "ar" ? "الدفع عند الاستلام" : "COD Available"}
          sub={lang === "ar" ? "ادفع لما تستلم" : "Pay when you receive"}
        />
        <Item
          Icon={RotateCcw}
          title={lang === "ar" ? "إرجاع مجاني" : "Free Returns"}
          sub={lang === "ar" ? "خلال 14 يومًا" : "Within 14 days"}
        />
      </div>
    </section>
  );
}
