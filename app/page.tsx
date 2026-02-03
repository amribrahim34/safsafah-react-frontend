'use client';

import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../lib/i18n";
import { BRAND } from "../content/brand";
import { IMG } from "../content/images";
import { COPY } from "../content/copy";
import { useDir } from "../hooks/useDir";

import PromoBar from "../components/header/PromoBar";
import Header from "../components/header/Header";
import HeroSlider from "../components/home/hero/HeroSlider";
import Banners from "../components/home/banners/Banners";
import BottomTabs from "../components/appchrome/BottomTabs";
import FloatingCart from "../components/appchrome/FloatingCart";
import Newsletter from "../components/home/newsletter/Newsletter";
import Footer from "../components/footer/Footer";

import BrandTrust from "../components/home/trust/BrandTrust";
import NewArrivals from "../components/home/arrivals/NewArrivals";
import BestSellers from "../components/home/bestsellers/BestSellers";
import CategoriesSection from "../components/home/categories/CategoriesSection";
import BrandsSection from "../components/home/brands/BrandsSection";
import MoreBanners from "../components/home/banners/ExtraBanners";

// Force dynamic rendering (disable SSR)
export const dynamic = 'force-dynamic';

// import Newsletter, JournalSection, Footer ... (same idea)

export default function Home() {
  const { t, i18n } = useTranslation('home');
  // Initialize with 'en' to ensure consistent server/client rendering
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const T = useMemo(() => COPY[lang as keyof typeof COPY], [lang]);
  useDir(lang);

  // Sync with i18n language after component mounts (client-side only)
  useEffect(() => {
    if (i18n.language !== lang) {
      setLang(i18n.language as 'en' | 'ar');
    }
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  // Prepare slider data with translations and images
  const sliderData = [
    { ...t('slider.0', { returnObjects: true }), img: IMG.hero1 },
    { ...t('slider.1', { returnObjects: true }), img: IMG.hero2 },
    { ...t('slider.2', { returnObjects: true }), img: IMG.hero3 },
  ];

  return (
    <div id="home" className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={t('promo')} lang={lang} onToggleLang={toggleLanguage} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={t('search')} lang={lang} />

      <HeroSlider slides={sliderData} brand={BRAND} />

      {/* Trust hits early */}
      <BrandTrust brand={BRAND} lang={lang} />


      {/* <section className="max-w-7xl mx-auto px-4 py-6">
        <USPGrid brand={BRAND} lang={lang} copy={COPY[lang]} />
      </section> */}

      {/* Rich visual banners */}
      <section className="max-w-7xl mx-auto px-4 pb-6">
        <Banners imgWide={IMG.bannerWide} imgTall={IMG.bannerTall} brand={BRAND} lang={lang} />
      </section>
      <MoreBanners brand={BRAND} lang={lang} />


      {/* Explore */}
      {/* <CuratedCollections brand={BRAND} lang={lang} /> */}
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

      {/* Social proof near mid-page */}
      {/* <Testimonials brand={BRAND} lang={lang} /> */}

      {/* <JournalSection brand={BRAND} lang={lang} articles={journalArticles} /> */}

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
