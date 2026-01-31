'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "../lib/i18n";
import { BRAND } from "../content/brand";
import { IMG } from "../content/images";
import { COPY } from "../content/copy";
import { PRODUCTS } from "../content/products";
import { useDir } from "../hooks/useDir";

import PromoBar from "../components/header/PromoBar";
import Header from "../components/header/Header";
import HeroSlider from "../components/home/hero/HeroSlider";
import Banners from "../components/home/banners/Banners";
import CategoriesGrid from "../components/categories/CategoriesGrid";
import ProductGrid from "../components/products/ProductGrid";
import BottomTabs from "../components/appchrome/BottomTabs";
import FloatingCart from "../components/appchrome/FloatingCart";
import USPGrid from "../components/usp/USPGrid";
import JournalSection from "../components/home/journal/JournalSection";
import Newsletter from "../components/home/newsletter/Newsletter";
import Footer from "../components/footer/Footer";

import BrandTrust from "../components/home/trust/BrandTrust";
import Testimonials from "../components/home/trust/Testimonials";
import NewArrivals from "../components/home/arrivals/NewArrivals";
import CuratedCollections from "../components/home/collections/CuratedCollections";
import MoreBanners from "../components/home/banners/ExtraBanners";


// import Newsletter, JournalSection, Footer ... (same idea)

export default function Home() {
  const { t, i18n } = useTranslation('home');
  const [lang, setLang] = useState<'en' | 'ar'>(i18n.language as 'en' | 'ar');
  const T = useMemo(() => COPY[lang as keyof typeof COPY], [lang]);
  useDir(lang);

  const toggleLanguage = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  const categories = [
    { labelEn: t('categories.items.0.label'), labelAr: t('categories.items.0.label'), img: IMG.serum },
    { labelEn: t('categories.items.1.label'), labelAr: t('categories.items.1.label'), img: IMG.cleanser },
    { labelEn: t('categories.items.2.label'), labelAr: t('categories.items.2.label'), img: IMG.cream },
    { labelEn: t('categories.items.3.label'), labelAr: t('categories.items.3.label'), img: IMG.makeup },
  ];

  // Prepare slider data with translations and images
  const sliderData = [
    { ...t('slider.0', { returnObjects: true }), img: IMG.hero1 },
    { ...t('slider.1', { returnObjects: true }), img: IMG.hero2 },
    { ...t('slider.2', { returnObjects: true }), img: IMG.hero3 },
  ];

  // Prepare journal articles with translations and images
  const journalArticles = [
    { img: IMG.bannerWide, titleEn: t('journal.articles.0.title'), titleAr: t('journal.articles.0.title') },
    { img: IMG.bannerTall, titleEn: t('journal.articles.1.title'), titleAr: t('journal.articles.1.title') },
    { img: IMG.oils, titleEn: t('journal.articles.2.title'), titleAr: t('journal.articles.2.title') },
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
      <NewArrivals brand={BRAND} lang={lang} products={PRODUCTS.slice(0,8) as any} />


      <section className="max-w-7xl mx-auto px-4 pb-6">
        <Banners imgWide={IMG.bannerWide} imgTall={IMG.bannerTall} brand={BRAND} lang={lang} />
      </section>

      <section id="categories" className="max-w-7xl mx-auto px-4 py-4">
        <CategoriesGrid items={categories} lang={lang} />
      </section>

      <section id="bestsellers" className="bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl md:text-2xl font-extrabold">{t('sections.trending')}</h2>
            <Link href="/catalog" className="font-semibold" style={{ color: BRAND.primary }}>{t('sections.viewAll')}</Link>
          </div>
          <ProductGrid products={PRODUCTS} lang={lang} brand={BRAND} />
        </div>
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
