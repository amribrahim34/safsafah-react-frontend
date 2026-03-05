'use client';

import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { BRAND } from "@/content/brand";
import { COPY } from "@/content/copy";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductBySlug } from "@/store/slices/productsSlice";
import { fetchCart } from "@/store/slices/cartsSlice";
import { useProductCart } from "@/hooks/useProductCart";
import { productsService } from "@/lib/api/services/products.service";

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
import ReviewsSection from "./_components/ReviewsSection";
import StickyATCBar from "./_components/StickyATCBar";

// ─── Loading skeleton ──────────────────────────────────────────────────────────
function LoadingState({ lang, T }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} lang={lang} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} lang={lang} />
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-xl text-neutral-500 animate-pulse">
          {lang === "ar" ? "جاري التحميل..." : "Loading..."}
        </div>
      </div>
      <Footer brand={BRAND} />
    </div>
  );
}

// ─── Error fallback ────────────────────────────────────────────────────────────
function ErrorState({ lang, T, error }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} lang={lang} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} lang={lang} />
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-xl text-red-600">
          {lang === "ar" ? "فشل تحميل المنتج" : "Failed to load product"}
        </div>
        {error && <div className="text-sm text-neutral-600 mt-2">{error}</div>}
      </div>
      <Footer brand={BRAND} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductPage() {
  const { slug, locale } = useParams();

  // Derive lang from the locale URL segment, defaulting to "ar"
  const lang = locale === "en" ? "en" : "ar";
  const T = useMemo(() => COPY[lang], [lang]);

  const dispatch = useAppDispatch();
  const { currentProduct: product, isLoadingProduct, error } = useAppSelector(
    (state) => state.products
  );
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [showReviews, setShowReviews] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  // Cart operations for the sticky ATC bar
  const { cartItem, isLoading: isCartLoading, handleAddToCart, handleIncrement, handleDecrement } =
    useProductCart(product);

  // Fetch product on mount / slug change
  useEffect(() => {
    if (slug) dispatch(fetchProductBySlug(slug));
  }, [slug, dispatch]);

  // Fetch reviews whenever the product ID becomes available
  useEffect(() => {
    if (!product?.id) return;
    setIsLoadingReviews(true);
    productsService
      .getProductReviews(product.id)
      .then((res) => {
        // API may return { data: [...] } or a plain array
        setReviews(Array.isArray(res) ? res : res.data ?? []);
      })
      .catch(() => setReviews([]))
      .finally(() => setIsLoadingReviews(false));
  }, [product?.id]);

  // Find authenticated user's existing review
  // The API may return userId (camelCase) or user_id (snake_case)
  const userReview = useMemo(() => {
    if (!user || !reviews.length) return null;
    return reviews.find(
      (r) => r.userId === user.id || r.user_id?.toString() === user.id
    ) ?? null;
  }, [user, reviews]);

  // ─── States ───────────────────────────────────────────────────────────────
  if (isLoadingProduct) return <LoadingState lang={lang} T={T} />;
  if (error || !product) return <ErrorState lang={lang} T={T} error={error} />;

  const productTitle = lang === "ar" ? product.nameAr : product.nameEn;
  const productPrice = product.price?.parsedValue ?? product.price ?? 0;

  const bottomLabels = {
    home: lang === "ar" ? "الرئيسية" : "Home",
    cats: lang === "ar" ? "الفئات" : "Categories",
    cart: lang === "ar" ? "السلة" : "Bag",
    wish: lang === "ar" ? "المفضلة" : "Wishlist",
    account: lang === "ar" ? "حسابي" : "Account",
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} lang={lang} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} lang={lang} />

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
        title={productTitle}
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
