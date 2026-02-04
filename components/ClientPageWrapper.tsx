'use client';

import { useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../lib/i18n";
import { BRAND } from "../content/brand";
import { IMG } from "../content/images";
import { COPY } from "../content/copy";
import { useDir } from "../hooks/useDir";
import { useLocale } from "@/lib/locale-navigation";

import PromoBar from "./header/PromoBar";
import Header from "./header/Header";
import HeroSlider from "./home/hero/HeroSlider";
import Banners from "./home/banners/Banners";
import BottomTabs from "./appchrome/BottomTabs";
import FloatingCart from "./appchrome/FloatingCart";
import Newsletter from "./home/newsletter/Newsletter";
import Footer from "./footer/Footer";
import NewArrivals from "./home/arrivals/NewArrivals";
import BestSellers from "./home/bestsellers/BestSellers";
import CategoriesSection from "./home/categories/CategoriesSection";
import BrandsSection from "./home/brands/BrandsSection";
import MoreBanners from "./home/banners/ExtraBanners";

interface ClientPageWrapperProps {
  children?: React.ReactNode;
}

export default function ClientPageWrapper({ children }: ClientPageWrapperProps) {
  const { t, i18n } = useTranslation('home');
  const lang = useLocale(); // Get locale from URL
  const T = useMemo(() => COPY[lang as keyof typeof COPY], [lang]);
  useDir(); // Automatically syncs with URL

  useEffect(() => {
    // Sync i18n with the locale from URL
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <div id="home" className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={t('promo')} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={t('search')} />

      <HeroSlider brand={BRAND} />

      {/* Server-rendered content from children */}
      {children}

      {/* Rich visual banners */}
      <section className="max-w-7xl mx-auto px-4 pb-6">
        <Banners imgWide={IMG.bannerWide} imgTall={IMG.bannerTall} brand={BRAND} lang={lang} />
      </section>
      <MoreBanners brand={BRAND} lang={lang} />

      {/* Explore */}
      <NewArrivals brand={BRAND} lang={lang} />

      <section className="max-w-7xl mx-auto px-4 pb-6">
        <Banners imgWide={IMG.bannerWide} imgTall={IMG.bannerTall} brand={BRAND} lang={lang} />
      </section>

      <section id="categories">
        <CategoriesSection lang={lang} />
      </section>

      <section id="brands">
        <BrandsSection lang={lang} />
      </section>

      <section id="bestsellers">
        <BestSellers brand={BRAND} lang={lang} />
      </section>

      <Newsletter brand={BRAND} lang={lang} copy={COPY[lang as keyof typeof COPY]} />

      <Footer brand={BRAND} lang={lang} copy={COPY[lang as keyof typeof COPY]} />

      <FloatingCart brand={BRAND} />
      <BottomTabs labels={{
        home: t('bottomTabs.home'),
        cats: t('bottomTabs.categories'),
        cart: t('bottomTabs.cart'),
        wish: t('bottomTabs.wishlist'),
        account: t('bottomTabs.account')
      }} />
    </div>
  );
}
