// src/pages/product/ProductPage.jsx
import React, { useMemo, useState, useEffect, useRef } from "react";
import { BRAND } from "../content/brand";
import { COPY } from "../content/copy";
import { IMG } from "../content/images";
import { useDir } from "../hooks/useDir";

// site chrome
import PromoBar from "../components/header/PromoBar";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import BottomTabs from "../components/appchrome/BottomTabs";
import FloatingCart from "../components/appchrome/FloatingCart";
import ProductGrid from "../components/products/ProductGrid";

// local product components
import ImageGallery from "../components/product_details/ImageGallery";
import VariantSelector from "../components/product_details/VariantSelector";
import TrustBadges from "../components/product_details/TrustBadges";
import RatingBreakdown from "../components/product_details/RatingBreakdown";
import Reviews from "../components/product_details/Reviews";
import DeliveryETA from "../components/product_details/DeliveryETA";
import StickyATCBar from "../components/product_details/StickyATCBar";
import BundleOffers from "../components/product_details/BundleOffers";
import RecentlyViewed from "../components/product_details/RecentlyViewed";
import MiniCart from "../components/product_details/MiniCart";
import ExitIntentModal from "../components/product_details/ExitIntentModal";
import Stars from "../components/ui/Stars";

// ---- Demo Product (replace with API data) ----
const PRODUCT = {
  id: 201,
  title: { en: "Vitamin C 15% Brightening Serum", ar: "سيروم فيتامين سي 15% للتفتيح" },
  subtitle: { en: "Brighter, even tone in 7 days", ar: "تفتيح وتوحيد لون خلال 7 أيام" },
  price: 830,
  compareAt: 950,
  rating: 4.8,
  ratingCount: 164,
  stock: 4,
  brand: "LUMI LABS",
  category: "Serums",
  variants: [
    { id: "30ml", label: "30ml", shadeHex: null, inStock: true },
    { id: "50ml", label: "50ml", shadeHex: null, inStock: true },
  ],
  shades: [
    // demo for makeup-like product — hidden if none
  ],
  images: [
    { src: IMG.bannerTall, alt: "product lifestyle" },
    { src: IMG.serum, alt: "bottle macro" },
    { src: IMG.bannerWide, alt: "texture swatch" },
    { src: IMG.hero2, alt: "result shot" },
  ],
  description: {
    en: "Fast-absorbing Vitamin C serum that visibly brightens dull skin, evens tone and boosts antioxidant defense. Non-sticky and made for Egypt’s climate.",
    ar: "سيروم فيتامين سي سريع الامتصاص يفتّح البشرة الباهتة ويوحّد اللون ويحمي بمضادات الأكسدة. ملمس غير لزج ومناسب لمناخ مصر.",
  },
  bullets: {
    en: ["Brighter look in 7 days","Light, non-sticky texture","Derm-tested • Fragrance-free"],
    ar: ["تفتيح ملحوظ خلال 7 أيام","ملمس خفيف غير لزج","مختبَر جلديًا • بدون عطر"],
  },
  benefits: {
    en: ["Fades dark spots","Boosts radiance","Protects against pollution"],
    ar: ["يقلّل التصبغات","يزيد التوهّج","يحمي من التلوّث"],
  },
  details: {
    en: "Use in AM before moisturizer & SPF. If using with acids, alternate days.",
    ar: "يستخدم صباحًا قبل المرطّب وواقي الشمس. عند استخدام الأحماض، يُفضّل التبديل بين الأيام.",
  },
};

// ---- Page ----
export default function ProductPage(){
  const [lang,setLang] = useState("ar");
  const T = useMemo(()=> COPY[lang], [lang]);
  useDir(lang);

  const [variant, setVariant] = useState(PRODUCT.variants[0]);
  const [qty, setQty] = useState(1);
  const [showReviews, setShowReviews] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);

  const priceFmt = new Intl.NumberFormat(lang==="ar"?"ar-EG":"en-EG",{ style:"currency", currency:"EGP", maximumFractionDigits:0 }).format;

  const addToCart = () => {
    // TODO integrate with cart store
    setMiniCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} lang={lang} onToggleLang={()=>setLang(lang==="ar"?"en":"ar")} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} lang={lang} />

      {/* Hook Phase — Emotional Engagement */}
      <section className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
        {/* Gallery with swipe + hover zoom */}
        <ImageGallery images={PRODUCT.images} brand={BRAND} />

        {/* Product Summary */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold">{lang==="ar"?PRODUCT.title.ar:PRODUCT.title.en}</h1>
          <div className="text-neutral-600 mt-1">{lang==="ar"?PRODUCT.subtitle.ar:PRODUCT.subtitle.en}</div>

          {/* Rating + count */}
          <div className="mt-3 flex items-center gap-2">
            <Stars rating={PRODUCT.rating} />
            <span className="text-sm text-neutral-600">{PRODUCT.rating} · {PRODUCT.ratingCount} {lang==="ar"?"تقييم":"ratings"}</span>
            <button className="text-sm underline" onClick={()=>setShowReviews(true)}>{lang==="ar"?"قراءة المراجعات":"Read reviews"}</button>
          </div>

          {/* Price, compareAt, installment, stock */}
          <div className="mt-4 flex items-center gap-3">
            <div className="text-2xl font-black">{priceFmt(PRODUCT.price)}</div>
            {PRODUCT.compareAt && <div className="line-through text-neutral-400">{priceFmt(PRODUCT.compareAt)}</div>}
            <span className="text-sm px-2 py-1 rounded-full" style={{background:BRAND.light+"22", color:BRAND.dark}}>{lang==="ar"?"توصيل مجاني فوق 500 جنيه":"Free delivery over 500 EGP"}</span>
          </div>
          <div className={`mt-1 text-sm ${lang==='ar'?'text-right':''}`}>{lang==="ar"?`المتاح بالمخزون: ${PRODUCT.stock}`:`Only ${PRODUCT.stock} left in stock!`}</div>
          <div className="mt-1 text-sm text-neutral-600">{lang==="ar"?"تقسيط متاح عبر ValU/Bank":"Installments available via ValU/Bank*"}</div>

          {/* Variant selector */}
          <div className="mt-4"><VariantSelector lang={lang} brand={BRAND} variants={PRODUCT.variants} value={variant} onChange={setVariant} /></div>

          {/* Size / Shade guide (modal trigger placeholder) */}
          {/* Hidden if no shades */}
          {PRODUCT.shades?.length>0 && (
            <div className="mt-2 text-sm">
              <button className="underline">{lang==="ar"?"دليل الدرجة":"Shade guide"}</button>
            </div>
          )}

          {/* Benefits bullets */}
          <ul className="mt-4 space-y-1 list-disc ps-5 text-sm">
            {(lang==="ar"?PRODUCT.bullets.ar:PRODUCT.bullets.en).map((b,i)=>(<li key={i}>{b}</li>))}
          </ul>

          {/* CTAs */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center border rounded-2xl overflow-hidden">
              <button className="px-3 py-2" onClick={()=>setQty(q=>Math.max(1,q-1))}>–</button>
              <div className="px-4 py-2 min-w-[40px] text-center">{qty}</div>
              <button className="px-3 py-2" onClick={()=>setQty(q=>q+1)}>+</button>
            </div>
            <button onClick={addToCart} className="px-6 py-3 rounded-2xl text-white font-semibold" style={{background:BRAND.primary}}>
              {lang==="ar"?"أضِف إلى السلة":"Add to cart"}
            </button>
            <button className="px-4 py-3 rounded-2xl border font-semibold" style={{borderColor:BRAND.primary, color:BRAND.primary}}>
              {lang==="ar"?"أضف للمفضلة":"Add to wishlist"}
            </button>
          </div>

          {/* Trust + Delivery + COD */}
          <div className="mt-6 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
            <TrustBadges brand={BRAND} lang={lang} flow />
            <DeliveryETA brand={BRAND} lang={lang} className="h-full"  />
            <div className="rounded-2xl border border-neutral-200 p-3 text-sm h-full">
              <div className="font-semibold">{lang==="ar"?"الدفع عند الاستلام":"Cash on Delivery"}</div>
              <div className="text-neutral-600">{lang==="ar"?"إرجاع مجاني خلال 14 يوم":"Free returns within 14 days"}</div>
            </div>

          </div>
        </div>
        {/* Description */}
          <div className="mt-6">
            <div className="font-bold mb-1">{lang==="ar"?"الوصف":"Description"}</div>
            <p className="text-neutral-700 text-sm">{lang==="ar"?PRODUCT.description.ar:PRODUCT.description.en}</p>
            <div className="text-neutral-500 text-xs mt-2">{lang==="ar"?PRODUCT.details.ar:PRODUCT.details.en}</div>
          </div>
      </section>

      {/* Trust Phase — Reviews (folded by default) */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="rounded-3xl border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-lg">{lang==="ar"?"آراء العملاء":"Customer reviews"}</div>
            <button onClick={()=>setShowReviews(s=>!s)} className="text-sm underline">{showReviews ? (lang==="ar"?"إخفاء":"Hide") : (lang==="ar"?"عرض المراجعات":"Show reviews")}</button>
          </div>
          {showReviews && (
            <div className="mt-4 grid md:grid-cols-3 gap-6">
              <div>
                <RatingBreakdown brand={BRAND} lang={lang} rating={PRODUCT.rating} count={PRODUCT.ratingCount} />
              </div>
              <div className="md:col-span-2">
                <Reviews brand={BRAND} lang={lang} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Action Phase — bundles / upsell */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <BundleOffers brand={BRAND} lang={lang} baseProduct={PRODUCT} onAdd={addToCart} />
      </section>

      {/* Post-Intent — Recently viewed / Similar */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <RecentlyViewed brand={BRAND} lang={lang} />
      </section>

      <Footer brand={BRAND} lang={lang} copy={T} />
      <FloatingCart brand={BRAND} />
      <BottomTabs labels={{ home: lang==="ar"?"الرئيسية":"Home", cats: lang==="ar"?"الفئات":"Categories", cart: lang==="ar"?"السلة":"Bag", wish: lang==="ar"?"المفضلة":"Wishlist", account: lang==="ar"?"حسابي":"Account" }} />

      <StickyATCBar brand={BRAND} lang={lang} title={lang==="ar"?PRODUCT.title.ar:PRODUCT.title.en} price={PRODUCT.price} onAdd={addToCart} />
      <MiniCart open={miniCartOpen} onClose={()=>setMiniCartOpen(false)} brand={BRAND} lang={lang} />
      <ExitIntentModal brand={BRAND} lang={lang} />
    </div>
  );
}
