'use client';

import React, { useMemo, useState } from "react";
import { BRAND } from "@/content/brand";
import { COPY } from "@/content/copy";
import { useDir } from "@/hooks/useDir";
import { useAppSelector } from "@/store/hooks";

import PromoBar from "@/components/header/PromoBar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import OverviewHeader from "./_components/OverviewHeader";
import OrdersList from "./_components/OrdersList";
import WishlistGrid from "./_components/WishlistGrid";
import RewardsWallet from "./_components/RewardsWallet";
import BeautyProfileCard from "./_components/BeautyProfileCard";
import AddressesPayments from "./_components/AddressesPayments";
import RecentlyViewedStrip from "./_components/RecentlyViewedStrip";
import SettingsPanel from "./_components/SettingsPanel";
import SupportLinks from "./_components/SupportLinks";

export default function ProfilePage() {
  const [lang, setLang] = useState("ar");
  const t = useMemo(() => COPY[lang], [lang]);
  useDir();

  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  // Note: User profile is already fetched in App.jsx on authentication
  // No need to fetch again here to avoid infinite loops

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-white text-neutral-900">
        <PromoBar text={t.promo} lang={lang} onToggleLang={() => setLang(lang === "ar" ? "en" : "ar")} brand={BRAND} />
        <Header brand={BRAND} searchPlaceholder={t.search} lang={lang} />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: BRAND.primary }}></div>
              <p className="text-neutral-600">{lang === "ar" ? "جاري التحميل..." : "Loading..."}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={t.promo} lang={lang} onToggleLang={() => setLang(lang === "ar" ? "en" : "ar")} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={t.search} lang={lang} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {user && <OverviewHeader brand={BRAND} lang={lang} user={user} />}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),380px] items-start mt-4">
          {/* LEFT: rich content */}
          <div className="space-y-6">
            <OrdersList brand={BRAND} lang={lang} />
            <WishlistGrid brand={BRAND} lang={lang} />
            <BeautyProfileCard brand={BRAND} lang={lang} />
            {/* <RecentlyViewedStrip brand={BRAND} lang={lang} /> */}
          </div>

          {/* RIGHT: account tools */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            {/* <RewardsWallet brand={BRAND} lang={lang} user={user} /> */}
            <AddressesPayments brand={BRAND} lang={lang} />
            {/* <SettingsPanel brand={BRAND} lang={lang} user={user} /> */}
            <SupportLinks brand={BRAND} lang={lang} />
          </aside>
        </div>
      </main>

      <Footer brand={BRAND} />
    </div>
  );
}
