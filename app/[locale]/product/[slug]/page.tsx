'use client';

import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import posthog from "posthog-js";

import { BRAND } from "@/content/brand";
import { COPY } from "@/content/copy";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductBySlug } from "@/store/slices/productsSlice";
import { useProductCart } from "@/hooks/useProductCart";
import { productsService } from "@/lib/api/services/products.service";
import type { Product } from "@/types/models/product";
import type { CartItem } from "@/types/models/cart";
import type { BrandColors } from "@/types/models/brand";
import type { LocalReview } from "./types";
import type { Language } from "@/types/models/common";

// Shared site chrome
import PromoBar from "@/components/header/PromoBar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import BottomTabs from "@/components/appchrome/BottomTabs";
import FloatingCart from "@/components/appchrome/FloatingCart";
import MiniCart from "@/components/product_details/MiniCart";
import ExitIntentModal from "@/components/product_details/ExitIntentModal";

// Page-scoped components
import ProductHero from "./_components/ProductHero";
import ProductDescription from "./_components/ProductDescription";
import ReviewsSection from "./_components/ReviewsSection";
import StickyATCBar from "./_components/StickyATCBar";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Typed return value of the JS useProductCart hook. */
interface UseProductCartResult {
  cartItem: CartItem | undefined;
  isLoading: boolean;
  handleAddToCart: (cb?: () => void) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

// ─── Loading skeleton ──────────────────────────────────────────────────────────
function LoadingState({ lang, brand }: { lang: Language; brand: BrandColors }) {
  const T = COPY[lang];
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} brand={brand} />
      <Header brand={brand} searchPlaceholder={T.search} />
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-xl text-neutral-500 animate-pulse">
          {lang === "ar" ? "جاري التحميل..." : "Loading..."}
        </div>
      </div>
      <Footer brand={brand} />
    </div>
  );
}

// ─── Error fallback ────────────────────────────────────────────────────────────
function ErrorState({
  lang,
  brand,
  error,
}: {
  lang: Language;
  brand: BrandColors;
  error?: string | null;
}) {
  const T = COPY[lang];
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} brand={brand} />
      <Header brand={brand} searchPlaceholder={T.search} />
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-xl text-red-600">
          {lang === "ar" ? "فشل تحميل المنتج" : "Failed to load product"}
        </div>
        {error && <div className="text-sm text-neutral-600 mt-2">{error}</div>}
      </div>
      <Footer brand={brand} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductPage() {
  const { slug, locale } = useParams() as { slug: string; locale: string };

  // Derive lang from the locale URL segment, defaulting to "ar"
  const lang = (locale === "en" ? "en" : "ar") as Language;

  const dispatch = useAppDispatch();
  const { currentProduct: product, isLoadingProduct, error } = useAppSelector(
    (state) => state.products
  ) as { currentProduct: Product | null; isLoadingProduct: boolean; error: string | null };

  const { user, isAuthenticated } = useAppSelector((state) => state.auth) as {
    user: { id: string } | null;
    isAuthenticated: boolean;
  };

  const [showReviews, setShowReviews] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [reviews, setReviews] = useState<LocalReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  // Cart operations for the sticky ATC bar
  // The hook is a .js file so we cast its return value to the typed interface.
  const {
    cartItem,
    isLoading: isCartLoading,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
  } = useProductCart(product as object) as UseProductCartResult;

  // Fetch product on mount / slug change
  useEffect(() => {
    if (slug) dispatch(fetchProductBySlug(slug));
  }, [slug, dispatch]);

  // Track product view once product data is available
  useEffect(() => {
    if (!product?.id) return;
    posthog.capture('product_viewed', {
      product_id: product.id,
      product_name_en: product.nameEn,
      product_name_ar: product.nameAr,
      product_slug: slug,
      price: typeof product.price === 'number' ? product.price : undefined,
    });
  }, [product?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch reviews whenever the product ID becomes available
  useEffect(() => {
    if (!product?.id) return;
    setIsLoadingReviews(true);
    productsService
      .getProductReviews(product.id)
      .then((res) => {
        // API may return { data: [...] } or a plain array
        const raw = res as unknown as LocalReview[] | { data: LocalReview[] };
        setReviews(Array.isArray(raw) ? raw : raw.data ?? []);
      })
      .catch(() => setReviews([]))
      .finally(() => setIsLoadingReviews(false));
  }, [product?.id]);

  // Find authenticated user's existing review
  // The API may return userId (camelCase) or user_id (snake_case)
  const userReview = useMemo<LocalReview | null>(() => {
    if (!user || !reviews.length) return null;
    return (
      reviews.find(
        (r) => r.userId === user.id || r.user_id === user.id
      ) ?? null
    );
  }, [user, reviews]);

  // ─── States ───────────────────────────────────────────────────────────────
  if (isLoadingProduct) return <LoadingState lang={lang} brand={BRAND} />;
  if (error || !product) return <ErrorState lang={lang} brand={BRAND} error={error} />;

  const T = COPY[lang];
  const productTitle = lang === "ar" ? product.nameAr : product.nameEn;
  const productPrice = typeof product.price === "number" ? product.price : 0;

  const bottomLabels = {
    home: lang === "ar" ? "الرئيسية" : "Home",
    cats: lang === "ar" ? "الفئات" : "Categories",
    cart: lang === "ar" ? "السلة" : "Bag",
    wish: lang === "ar" ? "المفضلة" : "Wishlist",
    account: lang === "ar" ? "حسابي" : "Account",
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} />

      {/* Main product section */}
      <ProductHero
        product={product}
        brand={BRAND}
        lang={lang}
        isAuthenticated={isAuthenticated}
        userReview={userReview}
        onMiniCartOpen={() => setMiniCartOpen(true)}
        onShowReviews={() => setShowReviews(true)}
        onReviewSuccess={() => dispatch(fetchProductBySlug(slug))}
      />

      {/* Product description — full width, below the hero */}
      <ProductDescription
        descriptionAr={product.descriptionAr}
        descriptionEn={product.descriptionEn}
        lang={lang}
      />

      {/* Customer reviews panel */}
      <ReviewsSection
        brand={BRAND}
        lang={lang}
        product={product}
        reviews={reviews}
        isLoadingReviews={isLoadingReviews}
        defaultOpen={showReviews}
      />

      <Footer brand={BRAND} />

      {/* App chrome overlays */}
      <FloatingCart brand={BRAND} />
      <BottomTabs labels={bottomLabels} />

      {/* Sticky ATC bar (appears on scroll) */}
      <StickyATCBar
        brand={BRAND}
        lang={lang}
        title={productTitle ?? ""}
        price={productPrice}
        onAdd={() => handleAddToCart(() => setMiniCartOpen(true))}
        cartItem={cartItem}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        isLoading={isCartLoading}
      />

      {/* Modals */}
      <MiniCart open={miniCartOpen} onClose={() => setMiniCartOpen(false)} brand={BRAND} lang={lang} />
      <ExitIntentModal brand={BRAND} lang={lang} />
    </div>
  );
}
