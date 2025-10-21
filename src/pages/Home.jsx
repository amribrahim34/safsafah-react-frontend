import React, { useMemo, useState } from "react";
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

// import Newsletter, JournalSection, Footer ... (same idea)

export default function Home() {
  const [lang, setLang] = useState("ar");
  const T = useMemo(() => COPY[lang], [lang]);
  useDir(lang);

  const categories = [
    { labelEn: "Serums", labelAr: "سيرومات", img: IMG.serum },
    { labelEn: "Cleansers", labelAr: "منظفات", img: IMG.cleanser },
    { labelEn: "Moisturizers", labelAr: "مرطبات", img: IMG.cream },
    { labelEn: "Makeup", labelAr: "مكياج", img: IMG.makeup },
  ];

  return (
    <div id="home" className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} lang={lang} onToggleLang={() => setLang(lang === "ar" ? "en" : "ar")} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} />

      <HeroSlider slides={T.slider} brand={BRAND} />

      <section className="max-w-7xl mx-auto px-4 py-6">
        {/* your USP component can go here using same props style */}
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-6">
        <Banners imgWide={IMG.bannerWide} imgTall={IMG.bannerTall} brand={BRAND} lang={lang} />
      </section>

      <section id="categories" className="max-w-7xl mx-auto px-4 py-4">
        <CategoriesGrid items={categories} lang={lang} />
      </section>

      <section id="bestsellers" className="bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl md:text-2xl font-extrabold">{T.sections.trending}</h2>
            <a href="#" className="font-semibold" style={{ color: BRAND.primary }}>{lang === "ar" ? "المزيد" : "View all"}</a>
          </div>
          <ProductGrid products={PRODUCTS} lang={lang} brand={BRAND} />
        </div>
      </section>

      {/* JournalSection, Newsletter, Footer — same prop pattern */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <USPGrid brand={BRAND} lang={lang} copy={COPY[lang]} />
      </section>

      <JournalSection brand={BRAND} lang={lang} articles={[
        { img: IMG.bannerWide, titleEn: "SPF in Cairo: what actually works", titleAr: "واقي الشمس في القاهرة: ما الذي يعمل فعلاً؟" },
        { img: IMG.bannerTall, titleEn: "Niacinamide vs Vitamin C — when to use each", titleAr: "نيايسيناميد أم فيتامين سي؟ ومتى نستخدم كل واحد" },
        { img: IMG.oils, titleEn: "7-day barrier repair plan", titleAr: "خطة إصلاح الحاجز خلال 7 أيام" },
      ]} />

      <Newsletter brand={BRAND} lang={lang} copy={COPY[lang]} />

      <Footer brand={BRAND} lang={lang} copy={COPY[lang]} />

      <FloatingCart brand={BRAND} />
      <BottomTabs labels={{
        home: lang === "ar" ? "الرئيسية" : "Home",
        cats: lang === "ar" ? "الفئات" : "Categories",
        cart: lang === "ar" ? "السلة" : "Bag",
        wish: lang === "ar" ? "المفضلة" : "Wishlist",
        account: lang === "ar" ? "حسابي" : "Account"
      }} />
    </div>
  );
}
