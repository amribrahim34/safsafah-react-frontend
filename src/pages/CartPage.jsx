import React, { useMemo, useState } from "react";
import { BRAND } from "../content/brand";
import { COPY } from "../content/copy";
import { IMG } from "../content/images";
import { useDir } from "../hooks/useDir";

import PromoBar from "../components/header/PromoBar";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import BottomTabs from "../components/appchrome/BottomTabs";
import FloatingCart from "../components/appchrome/FloatingCart";

import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import FreeShippingBar from "../components/cart/FreeShippingBar";
import EmptyCart from "../components/cart/EmptyCart";
import PromoCode from "../components/cart/PromoCode";

// DEMO: replace with your cart store/API
const DEMO = [
  { id: 201, name: { en: "Vitamin C 15% Brightening Serum", ar: "سيروم فيتامين سي 15% للتفتيح" }, price: 830, img: IMG.bannerTall, brand: "LUMI LABS", variant: "30ml", qty: 1, stock: 4 },
  { id: 301, name: { en: "Ceramide Barrier Cream", ar: "كريم حاجز السيراميد" }, price: 760, img: IMG.cream, brand: "DERMA+", variant: "50ml", qty: 1, stock: 7 },
];

export default function CartPage() {
  const [lang, setLang] = useState("ar");
  const T = useMemo(() => COPY[lang], [lang]);
  useDir(lang);

  const [items, setItems] = useState(DEMO);
  const [promo, setPromo] = useState("");

  const fmt = (n) =>
    new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(n);

  const updateQty = (id, q) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, Math.min(q, it.stock)) } : it))
    );

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  const subtotal = items.reduce((a, b) => a + b.price * b.qty, 0);
  const discount = promo.trim().toUpperCase() === "GLOW10" ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal - discount >= 500 ? 0 : 49;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} lang={lang} onToggleLang={() => setLang(lang === "ar" ? "en" : "ar")} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-4">
          {lang === "ar" ? "سلة المشتريات" : "Your Cart"}
        </h1>

        {items.length === 0 ? (
          <EmptyCart lang={lang} brand={BRAND} />
        ) : (
          <>
            <FreeShippingBar brand={BRAND} lang={lang} subtotal={subtotal} target={500} />

            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr),380px]">
              {/* Items */}
              <section className="space-y-3">
                {items.map((it) => (
                  <CartItem
                    key={it.id}
                    lang={lang}
                    brand={BRAND}
                    item={it}
                    onQty={(q) => updateQty(it.id, q)}
                    onRemove={() => removeItem(it.id)}
                  />
                ))}

                <PromoCode
                  lang={lang}
                  brand={BRAND}
                  value={promo}
                  onChange={setPromo}
                  hint={lang === "ar" ? "جرّب GLOW10 للحصول على 10%" : "Try GLOW10 for 10% off"}
                />
              </section>

              {/* Summary */}
              <aside className="self-start">
                <OrderSummary
                  lang={lang}
                  brand={BRAND}
                  fmt={fmt}
                  subtotal={subtotal}
                  discount={discount}
                  shipping={shipping}
                  total={total}
                />
              </aside>
            </div>
          </>
        )}
      </main>

      <Footer brand={BRAND} lang={lang} copy={T} />
      <FloatingCart brand={BRAND} />
      <BottomTabs
        labels={{
          home: lang === "ar" ? "الرئيسية" : "Home",
          cats: lang === "ar" ? "الفئات" : "Categories",
          cart: lang === "ar" ? "السلة" : "Bag",
          wish: lang === "ar" ? "المفضلة" : "Wishlist",
          account: lang === "ar" ? "حسابي" : "Account",
        }}
      />

      {/* Sticky checkout on mobile */}
      {items.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-neutral-200 md:hidden">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="text-xs text-neutral-600">
                {lang === "ar" ? "الإجمالي" : "Total"}
              </div>
              <div className="font-extrabold">
                {new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
                  style: "currency",
                  currency: "EGP",
                  maximumFractionDigits: 0,
                }).format(total)}
              </div>
            </div>
            <button
              className="px-5 py-3 rounded-2xl text-white font-semibold"
              style={{ background: BRAND.primary }}
            >
              {lang === "ar" ? "إتمام الشراء" : "Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
