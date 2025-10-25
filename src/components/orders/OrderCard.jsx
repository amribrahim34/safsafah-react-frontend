import React, { useMemo } from "react";
import { HelpCircle, MessageCircle, FileText } from "lucide-react";
import { IMG } from "../../content/images";

const IMG_MAP = {
  bannerTall: IMG.bannerTall,
  cleanser: IMG.cleanser,
  cream: IMG.cream,
  hero1: IMG.hero1,
};

export default function OrderCard({ lang = "ar", brand, order }) {
  const isRTL = lang === "ar";
  const fmt = (n) =>
    new Intl.NumberFormat(isRTL ? "ar-EG" : "en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(n);

  const STAGES = ["Placed", "Confirmed", "Shipped", "Delivered"];
  const reached = order.stages.length;
  const progressPct = Math.min(100, (reached / STAGES.length) * 100);
  const stageLabels = useMemo(() => {
    const map = {
      Placed: isRTL ? "تم الطلب" : "Placed",
      Confirmed: isRTL ? "تم التأكيد" : "Confirmed",
      Shipped: isRTL ? "تم الشحن" : "Shipped",
      Delivered: isRTL ? "تم التسليم" : "Delivered",
    };
    return STAGES.map((s) => map[s]);
  }, [isRTL]);

  const visibleItems = order.items.slice(0, 3);
  const extraCount = order.items.length - visibleItems.length;

  return (
    <article
      className="rounded-2xl border border-neutral-100 bg-white/95 p-3 md:p-4 hover:shadow-sm transition-shadow
                 min-h-[180px] flex flex-col"
    >
      {/* id / date / total */}
      <div className="flex items-center gap-2">
        <div className="text-sm font-semibold truncate">#{order.id}</div>
        <div className="text-[11px] text-neutral-600">
          {new Date(order.date).toLocaleDateString(isRTL ? "ar-EG" : "en-EG")}
        </div>
        <div className="ml-auto text-sm md:text-base font-extrabold">{fmt(order.total)}</div>
      </div>

      {/* tracker */}
      <div className="mt-1">
        <div className="flex justify-between text-[10px] md:text-[11px] text-neutral-700">
          {stageLabels.map((lbl, i) => (
            <span key={i} className={i < reached ? "opacity-100" : "opacity-50"}>
              {lbl}
            </span>
          ))}
        </div>
        <div className="mt-1 h-1.5 md:h-2 rounded bg-neutral-100 overflow-hidden">
          <div
            className="h-full transition-[width] duration-300"
            style={{ width: `${progressPct}%`, background: brand.primary }}
          />
        </div>
      </div>

      {/* product thumbnails */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {visibleItems.map((item, i) => (
          <div key={i} className="flex-shrink-0 w-14 md:w-16">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border">
              <img
                src={IMG_MAP[item.imgKey]}
                alt={isRTL ? item.name.ar : item.name.en}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-[10px] md:text-xs text-center mt-1 line-clamp-1">
              {isRTL ? item.name.ar : item.name.en}
            </div>
          </div>
        ))}
        {extraCount > 0 && (
          <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-lg bg-neutral-100 text-neutral-600 text-xs font-semibold">
            +{extraCount}
          </div>
        )}
      </div>

      {/* meta */}
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-600">
        <span>📍 {order.addrShort}</span>
        <span>•</span>
        <span>💳 {order.payment}</span>
      </div>

      {/* actions */}
      <div className="mt-2 border-t border-neutral-100 pt-2 flex gap-2 flex-wrap">
        <button
          className="flex-1 px-3 py-1 rounded-xl text-white font-semibold text-xs md:text-sm"
          style={{ background: brand.primary }}
        >
          {isRTL ? "تتبّع الطلب" : "Track"}
        </button>
        <a
          href="https://wa.me/201000000000"
          className="px-3 py-1 rounded-xl border font-semibold text-xs md:text-sm flex items-center gap-1"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          {isRTL ? "دعم" : "Help"}
        </a>
      </div>
    </article>
  );
}

function toLocalDate(iso, isRTL) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(isRTL ? "ar-EG" : "en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}
