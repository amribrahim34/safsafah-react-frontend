'use client';

import type { Product } from "@/types/models/product";
import type { BrandColors, LocalReview } from "../types";
import type { Language } from "@/types/models/common";

import BottomTabs from "@/components/appchrome/BottomTabs";
import FloatingCart from "@/components/appchrome/FloatingCart";
import MiniCart from "@/components/product_details/MiniCart";
// import ExitIntentModal from "@/components/product_details/ExitIntentModal";

import ReviewsSection from "./ReviewsSection";
import StickyATCBar from "./StickyATCBar";
import ProductViewTracker from "./ProductViewTracker";

interface ProductPageClientProps {
  product: Product;
  reviews: LocalReview[];
  brand: BrandColors;
  lang: Language;
}

export default function ProductPageClient({ product, reviews, brand, lang }: ProductPageClientProps) {
  const bottomLabels = {
    home: lang === "ar" ? "الرئيسية" : "Home",
    cats: lang === "ar" ? "الفئات" : "Categories",
    cart: lang === "ar" ? "السلة" : "Bag",
    wish: lang === "ar" ? "المفضلة" : "Wishlist",
    account: lang === "ar" ? "حسابي" : "Account",
  };

  return (
    <>
      <ProductViewTracker product={product} />

      <ReviewsSection
        brand={brand}
        lang={lang}
        product={product}
        reviews={reviews}
        isLoadingReviews={false}
      />

      <FloatingCart brand={brand} />
      <BottomTabs labels={bottomLabels} />

      <StickyATCBar product={product} brand={brand} lang={lang} />

      <MiniCart brand={brand} lang={lang} />
      {/* <ExitIntentModal brand={brand} lang={lang} /> */}
    </>
  );
}
