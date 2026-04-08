import React, { useMemo, useState, useEffect } from "react";
import { settingsService } from "@/lib/api/services";
import { HelpCircle, MessageCircle, FileText, RotateCcw, XCircle, RefreshCcw, Star, Truck } from "lucide-react";
import { IMG } from "../../content/images";

const IMG_MAP = {
  bannerTall: IMG.bannerTall,
  cleanser: IMG.cleanser,
  cream: IMG.cream,
  hero1: IMG.hero1,
};

export default function OrderCard({ lang = "ar", brand, order }) {
  const isRTL = lang === "ar";
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    settingsService.getSettings().then(setSettings).catch(() => {});
  }, []);
  const fmt = (n) =>
    new Intl.NumberFormat(isRTL ? "ar-EG" : "en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(n);

  // tracker
  const STAGES = ["Placed", "Confirmed", "Shipped", "Delivered"];
  const reached = Math.min(order.stages.length, STAGES.length);
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

  const visibleItems = order.items.slice(0, 4);
  const extraCount = order.items.length - visibleItems.length;

  return (
    <article
      className="rounded-2xl border border-neutral-100 bg-white p-3 md:p-4 hover:shadow-md transition-shadow
                 min-h-[188px] flex flex-col"
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
        {order.status !== "Delivered" && order.eta && (
          <div className="text-[11px] text-neutral-600 mt-1">
            {isRTL ? `الموعد المتوقع: ${toLocalDate(order.eta, isRTL)}` : `Expected: ${toLocalDate(order.eta, isRTL)}`}
          </div>
        )}
      </div>

      {/* product thumbs row (names shown) */}
      <div className="mt-3 flex items-start gap-2 overflow-x-auto no-scrollbar">
        {visibleItems.map((item, i) => (
          <div key={i} className="flex-shrink-0 w-16 md:w-20" title={(isRTL ? item.name.ar : item.name.en) + ` · ${item.variant}`}>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border bg-white">
              <img
                src={IMG_MAP[item.imgKey]}
                alt={isRTL ? item.name.ar : item.name.en}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-[10px] md:text-xs text-center mt-1 line-clamp-2">
              {isRTL ? item.name.ar : item.name.en}
            </div>
          </div>
        ))}
        {extraCount > 0 && (
          <div
            className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-lg bg-neutral-100 text-neutral-700 text-xs font-semibold"
            title={isRTL ? `+${extraCount} منتجات أخرى` : `+${extraCount} more items`}
          >
            +{extraCount}
          </div>
        )}
      </div>

      {/* meta line */}
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-600">
        <span>📍 {order.addrShort}</span>
        <span>•</span>
        <span>💳 {order.payment}</span>
      </div>

      {/* actions (contextual) */}
      <div className="mt-2 border-t border-neutral-100 pt-2 grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
        {renderActions({ order, isRTL, brand })}
        {/* help link */}
        <a href="https://wa.me/201000000000" className="sm:ms-auto inline-flex items-center gap-1 text-[11px] text-neutral-600">
          <HelpCircle className="w-4 h-4" /> {isRTL ? "تحتاج مساعدة؟" : "Need help?"}
        </a>
      </div>

      {/* return/cancel info */}
      {(order.status === "Returned" || order.status === "Canceled") && order.returnInfo && (
        <div className="mt-2 rounded-xl border border-neutral-200 p-2 bg-neutral-50 text-[11px]">
          <div className="font-semibold mb-0.5">{isRTL ? "الحالة" : "Status"}</div>
          <div className="text-neutral-700">
            {isRTL ? stateAr(order.returnInfo.state) : (order.returnInfo.state || order.status)}
            {order.returnInfo.amount ? ` — ${fmt(order.returnInfo.amount)}` : ""}
          </div>
        </div>
      )}
    </article>
  );
}

function renderActions({ order, isRTL, brand }) {
  // Reusable button classes (smaller)
  const primary = "px-3 py-1 rounded-xl text-white font-semibold text-xs md:text-sm";
  const outline = "px-3 py-1 rounded-xl border font-semibold text-xs md:text-sm";

  switch (order.status) {
    case "In Progress":
    case "Confirmed":
      return (
        <>
          {/* <button className={primary} style={{ background: brand.primary }}>
            <Truck className="inline w-4 h-4 me-1" /> {isRTL ? "تتبّع" : "Track"}
          </button> */}
          <button className={outline}>
            <XCircle className="inline w-4 h-4 me-1" /> {isRTL ? "إلغاء" : "Cancel"}
          </button>
          {/* <button className={`${outline} hidden md:inline-flex`}>
            <FileText className="inline w-4 h-4 me-1" /> {isRTL ? "فاتورة" : "Invoice"}
          </button> */}
        </>
      );

    case "Shipped":
    case "Out for Delivery":
      return (
        <>
          <button className={primary} style={{ background: brand.primary }}>
            <Truck className="inline w-4 h-4 me-1" /> {isRTL ? "تتبّع" : "Track"}
          </button>
          <a href={settings?.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}` : '#'} className={outline}>
            <MessageCircle className="inline w-4 h-4 me-1" /> {isRTL ? "دعم" : "Support"}
          </a>
          <button className={`${outline} hidden md:inline-flex`}>
            <FileText className="inline w-4 h-4 me-1" /> {isRTL ? "فاتورة" : "Invoice"}
          </button>
        </>
      );

    case "Delivered":
      return (
        <>
          <button className={primary} style={{ background: brand.primary }}>
            <RefreshCcw className="inline w-4 h-4 me-1" /> {isRTL ? "إعادة الشراء" : "Reorder"}
          </button>
          <button className={outline}>
            <Star className="inline w-4 h-4 me-1" /> {isRTL ? "تقييم" : "Review"}
          </button>
          <button className={`${outline} hidden md:inline-flex`}>
            <RotateCcw className="inline w-4 h-4 me-1" /> {isRTL ? "طلب إرجاع" : "Request Return"}
          </button>
          <button className={`${outline} hidden md:inline-flex`}>
            <FileText className="inline w-4 h-4 me-1" /> {isRTL ? "فاتورة" : "Invoice"}
          </button>
        </>
      );

    case "Returned":
    case "Canceled":
      return (
        <>
          <button className={outline}>
            <RotateCcw className="inline w-4 h-4 me-1" /> {isRTL ? "عرض السبب" : "View Reason"}
          </button>
          <button className={primary} style={{ background: brand.primary }}>
            <RefreshCcw className="inline w-4 h-4 me-1" /> {isRTL ? "أعد الشراء" : "Reorder"}
          </button>
        </>
      );

    default:
      return (
        <>
          <button className={primary} style={{ background: brand.primary }}>
            {isRTL ? "تفاصيل" : "Details"}
          </button>
        </>
      );
  }
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

function stateAr(s) {
  return (
    {
      "Refund Completed": "تم رد المبلغ",
      "Canceled by Customer": "أُلغي بواسطة العميل",
    }[s] || s
  );
}
