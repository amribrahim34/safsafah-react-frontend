import React, { useMemo, useState } from "react";
import { BRAND } from "../content/brand";
import { COPY } from "../content/copy";
import { useDir } from "../hooks/useDir";

import PromoBar from "../components/header/PromoBar";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import BottomTabs from "../components/appchrome/BottomTabs";

import OrdersTabs from "../components/orders/OrdersTabs";
import OrderCard from "../components/orders/OrderCard";

// ---- DEMO DATA (replace with API) ----
const DEMO_ORDERS = [
  {
    id: "EG-2025-11983",
    date: "2025-10-12",
    addrShort: "Madinaty, Cairo",
    payment: "COD",
    stages: ["Placed", "Confirmed", "Shipped", "Delivered"],
    eta: "2025-10-15",
    subtotal: 1420, shipping: 49, discount: 100, total: 1369,
    items: [
      { id: 1, name: { en: "Vitamin C 15% Brightening Serum", ar: "سيروم فيتامين سي 15%" }, variant: "30ml", qty: 1, price: 830, imgKey: "bannerTall", reviewed: false },
      { id: 2, name: { en: "Hydrating Cleanser", ar: "منظف مرطب" }, variant: "150ml", qty: 1, price: 490, imgKey: "cleanser", reviewed: true },
    ],
    status: "Delivered",
    returnInfo: null,
  },
  {
    id: "EG-2025-12051",
    date: "2025-10-20",
    addrShort: "Dokki, Giza",
    payment: "Card •••• 4321",
    stages: ["Placed", "Confirmed", "Shipped"],
    eta: "2025-10-24",
    subtotal: 760, shipping: 0, discount: 0, total: 760,
    items: [
      { id: 3, name: { en: "Ceramide Barrier Cream", ar: "كريم حاجز السيراميد" }, variant: "50ml", qty: 1, price: 760, imgKey: "cream", reviewed: false },
    ],
    status: "In Progress",
    returnInfo: null,
  },
  {
    id: "EG-2025-11877",
    date: "2025-09-28",
    addrShort: "Alexandria",
    payment: "Wallet",
    stages: ["Placed", "Confirmed", "Shipped", "Delivered"],
    eta: "2025-10-01",
    subtotal: 430, shipping: 49, discount: 0, total: 479,
    items: [
      { id: 4, name: { en: "SPF 50 PA++++", ar: "واقي شمس SPF 50" }, variant: "50ml", qty: 1, price: 430, imgKey: "hero1", reviewed: true },
    ],
    status: "Returned",
    returnInfo: { state: "Refund Completed", refundTo: "Wallet", amount: 430, timeline: ["Request Sent", "Picked Up", "Refund Completed"], date: "2025-10-05" },
  },
];

export default function OrdersPage() {
  const [lang, setLang] = useState("ar");
  const t = useMemo(() => COPY[lang], [lang]);
  useDir(lang);
  const isRTL = lang === "ar";

  const [tab, setTab] = useState("all"); // all | progress | delivered | canceled
  const filter = (o) => {
    if (tab === "progress") return o.status === "In Progress";
    if (tab === "delivered") return o.status === "Delivered";
    if (tab === "canceled") return o.status === "Returned" || o.status === "Canceled";
    return true;
  };
  const orders = DEMO_ORDERS.filter(filter);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={t.promo} lang={lang} onToggleLang={() => setLang(isRTL ? "en" : "ar")} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={t.search} lang={lang} />

      <main className="max-w-7xl mx-auto">
        <header className="px-4 pt-6 pb-3">
          <h1 className="text-2xl md:text-3xl font-extrabold">{isRTL ? "طلباتي 🛍️" : "My Orders 🛍️"}</h1>
          <p className="text-neutral-600">
            {isRTL ? "تتبّع مشترياتك، أعد الشراء، أو اطلب المساعدة." : "Track your purchases, reorder your faves, or request support."}
          </p>
        </header>

        {/* Sticky tabs */}
        <div className="sticky top-[84px] z-30 bg-white/90 backdrop-blur border-y border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <OrdersTabs
              lang={lang}
              brand={BRAND}
              tab={tab}
              setTab={setTab}
              counts={{
                all: DEMO_ORDERS.length,
                progress: DEMO_ORDERS.filter(o => o.status === "In Progress").length,
                delivered: DEMO_ORDERS.filter(o => o.status === "Delivered").length,
                canceled: DEMO_ORDERS.filter(o => o.status === "Returned" || o.status === "Canceled").length,
              }}
            />
          </div>
        </div>

        {/* Content */}
        <section className="bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {orders.length === 0 ? (
              <div className="rounded-2xl border border-neutral-200 p-6 bg-white text-center">
                <div className="text-5xl mb-2">🧴</div>
                <div className="text-lg font-extrabold">{isRTL ? "لسّه ما طلبتيش توهّجك ✨" : "You haven’t ordered your glow yet ✨"}</div>
                <p className="text-neutral-600 mt-1">
                  {isRTL ? "ابدئي التسوق الآن — الأفضل مبيعًا بانتظارك." : "Start shopping — bestsellers are waiting."}
                </p>
                <a href="/catalog" className="inline-block mt-3 px-4 py-2 rounded-2xl text-white font-semibold" style={{ background: BRAND.primary }}>
                  {isRTL ? "ابدئي التسوق" : "Start shopping"}
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-3">
                {orders.map((o) => (
                  <OrderCard key={o.id} lang={lang} brand={BRAND} order={o} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer  className="bg-neutral-50 text-neutral-700 text-sm md:text-base py-6 md:py-10" brand={BRAND} lang={lang} copy={t} />
      <BottomTabs
        labels={{
          home: isRTL ? "الرئيسية" : "Home",
          cats: isRTL ? "الفئات" : "Categories",
          cart: isRTL ? "السلة" : "Bag",
          wish: isRTL ? "المفضلة" : "Wishlist",
          account: isRTL ? "حسابي" : "Account",
        }}
      />
    </div>
  );
}
