'use client';

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import '@/lib/i18n';
import { BRAND } from "@/content/brand";
import PromoBar from "@/components/header/PromoBar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import FloatingCart from "@/components/appchrome/FloatingCart";
import { settingsService, type SiteSettings } from '@/lib/api/services';
import type { Language } from '@/types/models/common';

export default function WalletPaymentPage() {
  return (
    <Suspense fallback={<WalletPaymentLoading />}>
      <WalletPaymentContent />
    </Suspense>
  );
}

function WalletPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang: Language = (locale === 'en' || locale === 'ar') ? locale : 'ar';

  const { t, i18n } = useTranslation('walletPayment');
  const { t: tHome } = useTranslation('home');
  if (i18n.language !== lang) i18n.changeLanguage(lang);

  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  useEffect(() => {
    settingsService.getSettings().then(setSiteSettings).catch(() => {});
  }, []);

  const walletNumber = searchParams.get('walletNumber') || siteSettings?.mobile || "—";
  const [orderRef] = useState<string>(() => searchParams.get('orderRef') || `SFS-${Date.now()}`);
  const total = parseFloat(searchParams.get('total') || '0');

  const fmt = (n: number): string =>
    new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(n);

  // 30-minute hold countdown
  const [seconds, setSeconds] = useState<number>(30 * 60);
  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const [file, setFile] = useState<File | null>(null);
  const [confirm, setConfirm] = useState<boolean>(false);

  const submitProof = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!file || !confirm) {
      return alert(t('alertMissingProof'));
    }
    // TODO: upload to backend, mark order as 'awaiting verification'
    alert(t('alertProofReceived'));
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <PromoBar text={tHome('promo')} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={tHome('search')} />

      <main className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-1">
          {t('title')}
        </h1>
        <div className="text-neutral-600 mb-4">
          {t('orderRef', { ref: orderRef })}
        </div>

        <section className="rounded-3xl border border-neutral-200 p-4 bg-neutral-50">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white border border-neutral-200 p-3">
              <div className="text-sm text-neutral-600">{t('amountDue')}</div>
              <div className="text-xl font-black">{fmt(total)}</div>
            </div>
            <div className="rounded-2xl bg-white border border-neutral-200 p-3">
              <div className="text-sm text-neutral-600">{t('timeRemaining')}</div>
              <div className="text-xl font-black">{mm}:{ss}</div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-white border border-neutral-200 p-3">
            <div className="font-semibold">{t('transferTo')}</div>
            <div className="text-lg mt-1">{walletNumber}</div>
            <div className="text-sm text-neutral-600 mt-1">
              {t('transferNote')}
            </div>
          </div>

          <form onSubmit={submitProof} className="mt-4 rounded-2xl bg-white border border-neutral-200 p-3">
            <div className="font-semibold mb-2">{t('uploadProof')}</div>
            <input type="file" accept="image/*,application/pdf" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] ?? null)} className="w-full rounded-2xl border border-neutral-300 px-3 py-2" />
            <label className="flex items-center gap-2 mt-3 text-sm">
              <input type="checkbox" checked={confirm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirm(e.target.checked)} />
              <span>{t('confirmAccuracy')}</span>
            </label>

            <button type="submit" className="mt-3 w-full px-5 py-3 rounded-2xl text-white font-semibold" style={{ background: BRAND.primary }}>
              {t('confirmPayment')}
            </button>

            <div className="text-xs text-neutral-600 mt-2">
              {t('autoCancelNote')}
            </div>
          </form>
        </section>
      </main>

      <Footer brand={BRAND} />
      <FloatingCart brand={BRAND} />
    </div>
  );
}

function WalletPaymentLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4"></div>
        <p className="text-neutral-600">Loading payment...</p>
      </div>
    </div>
  );
}
