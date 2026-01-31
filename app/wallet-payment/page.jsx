'use client';

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BRAND } from "../../content/brand";
import { COPY } from "../../content/copy";
import PromoBar from "../../components/header/PromoBar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BottomTabs from "../../components/appchrome/BottomTabs";
import FloatingCart from "../../components/appchrome/FloatingCart";

export default function WalletPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const langFromParams = searchParams.get('lang') || "ar";
  const [lang, setLang] = useState(langFromParams);
  const T = useMemo(() => COPY[lang], [lang]);

  const walletNumber = searchParams.get('walletNumber') || "0100 000 0000";
  const orderRef = searchParams.get('orderRef') || `SFS-${Date.now()}`;
  const total = parseFloat(searchParams.get('total') || '0');
  const mobile = searchParams.get('mobile') || "";

  const fmt = (n) => new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(n);

  // 30-minute hold countdown
  const [seconds, setSeconds] = useState(30 * 60);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const [file, setFile] = useState(null);
  const [confirm, setConfirm] = useState(false);

  const submitProof = (e) => {
    e.preventDefault();
    if (!file || !confirm) {
      return alert(lang === "ar" ? "أرفق إيصال التحويل ووافق على صحة البيانات." : "Upload the transfer receipt and confirm accuracy.");
    }
    // TODO: upload to backend, mark order as 'awaiting verification'
    alert(lang === "ar" ? "تم استلام إثبات الدفع. سنراجع ونؤكد الطلب." : "Payment proof received. We'll verify and confirm.");
    router.push("/"); // or to an order status page
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} lang={lang} onToggleLang={() => setLang(lang === "ar" ? "en" : "ar")} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} />

      <main className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-1">
          {lang === "ar" ? "الدفع عبر المحفظة" : "Wallet Payment"}
        </h1>
        <div className="text-neutral-600 mb-4">
          {lang === "ar" ? `رقم الطلب: ${orderRef}` : `Order Ref: ${orderRef}`}
        </div>

        <section className="rounded-3xl border border-neutral-200 p-4 bg-neutral-50">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white border border-neutral-200 p-3">
              <div className="text-sm text-neutral-600">{lang === "ar" ? "المبلغ المطلوب" : "Amount due"}</div>
              <div className="text-xl font-black">{fmt(total)}</div>
            </div>
            <div className="rounded-2xl bg-white border border-neutral-200 p-3">
              <div className="text-sm text-neutral-600">{lang === "ar" ? "المهلة المتبقية" : "Time remaining"}</div>
              <div className="text-xl font-black">{mm}:{ss}</div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-white border border-neutral-200 p-3">
            <div className="font-semibold">{lang === "ar" ? "حوّل إلى" : "Transfer to"}</div>
            <div className="text-lg mt-1">{walletNumber}</div>
            <div className="text-sm text-neutral-600 mt-1">
              {lang === "ar"
                ? "اكتب رقم الطلب في خانة الملاحظات وقت التحويل لتسريع المراجعة."
                : "Write your Order Ref in the transfer note to speed up verification."}
            </div>
          </div>

          <form onSubmit={submitProof} className="mt-4 rounded-2xl bg-white border border-neutral-200 p-3">
            <div className="font-semibold mb-2">{lang === "ar" ? "إرفاق إثبات الدفع" : "Upload payment proof"}</div>
            <input type="file" accept="image/*,application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full rounded-2xl border border-neutral-300 px-3 py-2" />
            <label className="flex items-center gap-2 mt-3 text-sm">
              <input type="checkbox" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} />
              <span>{lang === "ar" ? "أؤكد صحة بيانات الدفع" : "I confirm the payment details are accurate"}</span>
            </label>

            <button type="submit" className="mt-3 w-full px-5 py-3 rounded-2xl text-white font-semibold" style={{ background: BRAND.primary }}>
              {lang === "ar" ? "تأكيد الدفع" : "Confirm payment"}
            </button>

            <div className="text-xs text-neutral-600 mt-2">
              {lang === "ar"
                ? "في حال عدم استلام الدفع خلال المهلة سيتم إلغاء الطلب تلقائيًا."
                : "If payment isn’t received within the time window, the order will be auto-cancelled."}
            </div>
          </form>
        </section>
      </main>

      <Footer brand={BRAND} lang={lang} copy={T} />
      <FloatingCart brand={BRAND} />
      <BottomTabs labels={{ home: lang === "ar" ? "الرئيسية" : "Home", cats: lang === "ar" ? "الفئات" : "Categories", cart: lang === "ar" ? "السلة" : "Bag", wish: lang === "ar" ? "المفضلة" : "Wishlist", account: lang === "ar" ? "حسابي" : "Account" }} />
    </div>
  );
}
