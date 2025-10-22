import React, { useMemo, useState, useRef } from "react";
import { BRAND } from "../content/brand";
import { COPY } from "../content/copy";
import { IMG } from "../content/images";
import { useDir } from "../hooks/useDir";
import { useNavigate } from "react-router-dom";

import PromoBar from "../components/header/PromoBar";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import BottomTabs from "../components/appchrome/BottomTabs";
import FloatingCart from "../components/appchrome/FloatingCart";

import OrderSummary from "../components/cart/OrderSummary";
import PaymentMethods from "../components/checkout/PaymentMethods";
import MapPicker from "../components/checkout/MapPicker";

// DEMO cart (swap with your store/API)
const DEMO_CART = [
  { id: 201, name: { en: "Vitamin C 15% Brightening Serum", ar: "سيروم فيتامين سي 15% للتفتيح" }, price: 830, img: IMG.bannerTall, brand: "LUMI LABS", variant: "30ml", qty: 1, stock: 4 },
  { id: 301, name: { en: "Ceramide Barrier Cream", ar: "كريم حاجز السيراميد" }, price: 760, img: IMG.cream, brand: "DERMA+", variant: "50ml", qty: 1, stock: 7 },
];

export default function CheckoutQuickPage() {
  const [lang, setLang] = useState("ar");
  const T = useMemo(() => COPY[lang], [lang]);
  useDir(lang);
  const navigate = useNavigate();

  const [items] = useState(DEMO_CART);
  const subtotal = items.reduce((a, b) => a + b.price * b.qty, 0);
  const shipping = subtotal >= 500 ? 0 : 49;
  const total = subtotal + shipping;
  const fmt = (n) => new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(n);

  // Minimal fields
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState("cod");
  const [coords, setCoords] = useState(null);
  const [geoLabel, setGeoLabel] = useState(""); // human-readable area/address from reverse geocode

  // one source of truth CTA (desktop or sticky mobile uses same ref/handler)
  const submitBtnRef = useRef(null);

  const valid =
    fullName.trim().split(" ").length >= 2 &&
    /^(01|\+201)[0-9]{8,10}$/.test(mobile) &&
    address.trim().length >= 8 &&
    (!!coords && !!geoLabel); // must pin on map and resolve an address label

  const placeOrder = (e) => {
    e.preventDefault();
    if (!valid) {
      return alert(lang === "ar" ? "أكمل الاسم، الموبايل، العنوان وحدد موقعك على الخريطة" : "Complete name, mobile, address and pin your location");
    }
    // If wallet: take user to wallet payment step
    if (payment === "wallet") {
      // You can pass state or query params. Here we use state.
      navigate("/wallet-payment", {
        state: {
          lang, total, mobile, fullName,
          orderRef: `SFS-${Date.now()}`, // demo order ref
          walletNumber: "0100 000 0000", // your wallet number to receive transfers
        },
      });
      return;
    }

    // COD/Card (demo)
    console.log("ORDER", { fullName, mobile, address, notes, payment, coords, geoLabel, items, totals: { subtotal, shipping, total } });
    alert(lang === "ar" ? "تم إنشاء الطلب بنجاح 🎉" : "Order placed successfully 🎉");
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} lang={lang} onToggleLang={() => setLang(lang === "ar" ? "en" : "ar")} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} />

      <form onSubmit={placeOrder} className="max-w-7xl mx-auto px-4 py-6 grid gap-6 md:grid-cols-[minmax(0,1fr),420px]">
        {/* LEFT */}
        <section className="space-y-4">
          <div className="rounded-3xl border border-neutral-200 p-4 bg-white">
            <div className="font-bold text-lg mb-3">{lang === "ar" ? "الدفع السريع" : "Ultra-fast checkout"}</div>

            <label className="block mb-3">
              <div className="text-sm font-semibold mb-1">{lang === "ar" ? "الاسم بالكامل *" : "Full name *"}</div>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-2xl border border-neutral-300 px-3 py-2" placeholder={lang === "ar" ? "الاسم الأول واسم العائلة" : "First & last name"} />
            </label>

            <label className="block mb-3">
              <div className="text-sm font-semibold mb-1">{lang === "ar" ? "الموبايل *" : "Mobile *"}</div>
              <input value={mobile} onChange={(e) => setMobile(e.target.value)} inputMode="tel" className="w-full rounded-2xl border border-neutral-300 px-3 py-2" placeholder={lang === "ar" ? "01xxxxxxxxx أو +201xxxxxxxxx" : "01xxxxxxxxx or +201xxxxxxxxx"} />
            </label>

            <label className="block mb-3">
              <div className="text-sm font-semibold mb-1">{lang === "ar" ? "العنوان التفصيلي *" : "Address *"}</div>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-2xl border border-neutral-300 px-3 py-2 min-h-[80px]" placeholder={lang === "ar" ? "اسم الشارع، المبنى/العمارة، الدور/الشقة" : "Street, building, floor/apt"} />
            </label>

            {/* Map simplified: no lat/lng fields, pick a point + show resolved address/area */}
            <MapPicker
              lang={lang}
              brand={BRAND}
              onPick={({ coords, label }) => {
                setCoords(coords);
                setGeoLabel(label);
              }}
            />

            {/* Resolved area/region for verification */}
            {geoLabel && (
              <div className="mt-2 text-sm rounded-xl bg-neutral-50 border border-neutral-200 p-2">
                <div className="font-semibold">{lang === "ar" ? "الموقع المحدد" : "Selected location"}</div>
                <div className="text-neutral-700">{geoLabel}</div>
              </div>
            )}

            <label className="block mt-3">
              <div className="text-sm font-semibold mb-1">{lang === "ar" ? "ملاحظات للمندوب" : "Notes for courier"}</div>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full rounded-2xl border border-neutral-300 px-3 py-2 min-h-[70px]" placeholder={lang === "ar" ? "مثلاً: اتصل قبل الوصول" : "e.g., please call on arrival"} />
            </label>
          </div>

          <PaymentMethods lang={lang} brand={BRAND} value={payment} onChange={setPayment} />
        </section>

        {/* RIGHT */}
        <aside
          className="
            self-start
            md:sticky md:top-24  
            md:max-h-[calc(100vh-6rem)]
            md:overflow-auto
          "
        >
          <OrderSummary
            lang={lang}
            brand={BRAND}
            fmt={fmt}
            subtotal={subtotal}
            discount={0}
            shipping={shipping}
            total={total}
          />
        </aside>

      </form>

      {/* SINGLE sticky CTA on mobile (same submit handler) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-neutral-200 md:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-xs text-neutral-600">{lang === "ar" ? "الإجمالي" : "Total"}</div>
            <div className="font-extrabold">{fmt(total)}</div>
          </div>
          <button
            onClick={() => submitBtnRef.current?.click()}
            disabled={!valid}
            className={`px-5 py-3 rounded-2xl text-white font-semibold ${!valid ? "opacity-60" : ""}`}
            style={{ background: BRAND.primary }}
          >
            {payment === "wallet" ? (lang === "ar" ? "الدفع بالمحفظة" : "Wallet payment") : (lang === "ar" ? "إتمام الشراء" : "Checkout")}
          </button>
        </div>
      </div>

      <Footer brand={BRAND} lang={lang} copy={T} />
      <FloatingCart brand={BRAND} />
      <BottomTabs labels={{ home: lang === "ar" ? "الرئيسية" : "Home", cats: lang === "ar" ? "الفئات" : "Categories", cart: lang === "ar" ? "السلة" : "Bag", wish: lang === "ar" ? "المفضلة" : "Wishlist", account: lang === "ar" ? "حسابي" : "Account" }} />
    </div>
  );
}
