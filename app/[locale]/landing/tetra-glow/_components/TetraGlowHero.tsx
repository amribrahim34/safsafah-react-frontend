'use client';

import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  CheckCircle2,
  Flame,
  Heart,
  ShoppingCart,
  Zap,
} from 'lucide-react';
import TetraGlowGallery from './TetraGlowGallery';
import type { TetraGlowProductData } from '../_types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, addLocalCartItem } from '@/store/slices/cartsSlice';
import { localStorageManager } from '@/lib/localStorageManager';
import { showProductToast } from '@/lib/swal';
import posthog from 'posthog-js';
import { addToCart as fbAddToCart, initiateCheckout as fbInitiateCheckout } from '@/lib/fbpixel';

interface TetraGlowHeroProps {
  product: TetraGlowProductData;
  lang: string;
  isHomeView?: boolean;
  onScrollToOrder?: () => void;
}

export const TetraGlowHero: React.FC<TetraGlowHeroProps> = ({
  product,
  lang,
  onScrollToOrder,
}) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const isAr = lang === 'ar';

  const priceFmt = (val: number) =>
    new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    }).format(val);

  /**
   * Core helper that executes the existing application cart logic:
   * Uses Redux `addToCart` thunk when authenticated;
   * Uses `localStorageManager` and `addLocalCartItem` when guest.
   */
  const executeAddToCart = async (qty: number): Promise<boolean> => {
    try {
      if (isAuthenticated) {
        await dispatch(
          addToCart({
            productId: product.id,
            quantity: qty,
          })
        ).unwrap();
      } else {
        const currentItems = localStorageManager.getCartItems();
        const existing = currentItems.find((i) => i.productId === product.id);
        if (existing) {
          existing.quantity += qty;
        } else {
          currentItems.push({ productId: product.id, quantity: qty });
        }
        localStorageManager.setCartItems(currentItems);
        dispatch(addLocalCartItem(product.id));
      }

      // Track analytics across PostHog and Meta Pixel
      posthog.capture('product_added_to_cart', {
        product_id: product.id,
        product_name_en: product.nameEn,
        product_name_ar: product.nameAr,
        price: product.price,
        quantity: qty,
      });

      fbAddToCart(
        {
          id: product.id,
          nameEn: product.nameEn,
          nameAr: product.nameAr,
          price: product.price,
        },
        qty
      );

      // Trigger the existing application mini-cart drawer event
      if (typeof document !== 'undefined') {
        document.dispatchEvent(new CustomEvent('open-mini-cart'));
      }

      return true;
    } catch (err) {
      console.error('Failed to add product to cart:', err);
      return false;
    }
  };

  /**
   * Add to Cart handler
   */
  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const success = await executeAddToCart(1);
      if (success) {
        showProductToast(
          isAr
            ? 'تمت إضافة المنتج إلى السلة بنجاح'
            : 'Added to cart successfully',
          isAr
        );
      }
    } finally {
      setIsAdding(false);
    }
  };

  /**
   * Buy Now handler — on the landing page we scroll to the express COD form
   * rather than routing to /checkout (which requires authentication).
   */
  const handleBuyNow = () => {
    // Track intent
    posthog.capture('checkout_started', {
      product_id: product.id,
      cart_total: product.price,
      item_count: 1,
      source: 'landing_hero_buy_now',
    });
    fbInitiateCheckout(product.price, 1);

    // Scroll to the express COD order form at the bottom of the page
    scrollToExpressForm();
  };

  const scrollToExpressForm = () => {
    if (onScrollToOrder) {
      onScrollToOrder();
      return;
    }
    const target = document.getElementById('express-order-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          {/* Left Column: Gallery View */}
          <div className="lg:col-span-6 w-full lg:sticky lg:top-24">
            <TetraGlowGallery images={product.images} lang={lang} />
          </div>

          {/* Right Column: Product Info & Action Buttons */}
          <div className="lg:col-span-6 w-full flex flex-col space-y-4 sm:space-y-5">
            {/* Top Pill & Wishlist */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200/60">
                  {isAr ? 'منتج حصري · تيترا جلو' : 'Exclusive · Tetra Glow'}
                </span>
                <span className="text-xs text-neutral-400 font-medium">
                  {product.size}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full border transition-all ${
                  isLiked
                    ? 'border-red-200 bg-red-50 text-red-500'
                    : 'border-neutral-200 text-neutral-400 hover:text-neutral-700 hover:border-neutral-300'
                }`}
                aria-label={isAr ? 'إضافة إلى المفضلة' : 'Add to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
              </button>
            </div>

            {/* Title & Tagline */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-tight">
                {isAr ? product.nameAr : product.nameEn}
              </h1>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed font-normal">
                {isAr ? product.taglineAr : product.taglineEn}
              </p>
            </div>

            {/* Ratings & Social Proof */}
            <div className="flex items-center gap-2.5 py-2 border-y border-neutral-100 flex-wrap text-xs sm:text-sm">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-neutral-800">{product.rating}</span>
              <span className="text-neutral-400">·</span>
              <span className="text-neutral-600 font-medium">
                {product.ratingCount} {isAr ? 'تقييم معتمد' : 'Verified Reviews'}
              </span>
              <span className="ms-auto inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                <CheckCircle2 className="w-3 h-3" />
                {isAr ? 'أصلي 100%' : '100% Authentic'}
              </span>
            </div>

            {/* Pricing Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-teal-50/50 via-white to-stone-50 border border-teal-100/70 shadow-xs">
              <div className="flex items-baseline gap-2.5 sm:gap-3 flex-wrap">
                <span className="text-2xl sm:text-4xl font-black text-teal-800 tracking-tight">
                  {priceFmt(product.price)}
                </span>
                <span className="text-base sm:text-lg text-neutral-400 line-through">
                  {priceFmt(product.originalPrice)}
                </span>
                <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600 border border-red-200">
                  {isAr
                    ? `وفر ${product.discountPercentage}% (${priceFmt(product.originalPrice - product.price)})`
                    : `Save ${product.discountPercentage}% (${priceFmt(product.originalPrice - product.price)})`}
                </span>
              </div>

              {/* Scarcity Bar */}
              <div className="mt-3 pt-2.5 border-t border-teal-100/50 flex items-center justify-between text-[11px] sm:text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold text-amber-700">
                  <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse flex-shrink-0" />
                  {isAr
                    ? `طلب مرتفع: متبقي فقط ${product.stockCount} عبوات بهذا السعر`
                    : `High demand: Only ${product.stockCount} units remaining at this price`}
                </span>
                <span className="text-neutral-500 hidden sm:inline">
                  {isAr ? 'الدفع عند الاستلام متاح' : 'Cash on Delivery Available'}
                </span>
              </div>
            </div>

            {/* Quick Benefits Bullet Points */}
            <div className="space-y-1.5 py-1">
              {(isAr ? product.highlightsAr.slice(0, 3) : product.highlightsEn.slice(0, 3)).map(
                (item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>

            {/* ACTION BUTTONS: BUY NOW & ADD TO CART */}
            <div className="space-y-3 pt-2">
              {/* Primary CTA: BUY NOW → scrolls to COD form */}
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isAdding}
                className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm sm:text-base text-white bg-teal-700 hover:bg-teal-800 active:scale-[0.98] shadow-md shadow-teal-700/20 transition-all text-center flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
                <span>
                  {isAr ? 'اطلبي الآن (دفع عند الاستلام)' : 'Order Now (Cash on Delivery)'}
                </span>
              </button>

              {/* Secondary CTA: ADD TO CART */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full py-3.5 px-5 rounded-xl font-bold text-sm sm:text-base text-teal-800 bg-teal-50 hover:bg-teal-100/80 active:scale-[0.98] border border-teal-200 transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-60"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700" />
                <span>
                  {isAdding
                    ? isAr
                      ? 'جاري الإضافة...'
                      : 'Adding to cart...'
                    : isAr
                    ? 'أضف إلى السلة'
                    : 'Add to Cart'}
                </span>
              </button>

              {/* Quick Jump to on-page Express COD Form */}
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={scrollToExpressForm}
                  className="text-xs sm:text-sm font-semibold text-neutral-600 hover:text-teal-700 underline transition-colors"
                >
                  {isAr
                    ? 'أو اطلبي بالدفع عند الاستلام السريع من هذه الصفحة مباشرة ↓'
                    : 'Or order directly with Express Cash on Delivery below ↓'}
                </button>
              </div>
            </div>

            {/* Reassurance Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-neutral-100">
              <div className="flex items-center gap-1.5 text-neutral-600">
                <Truck className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span className="text-[11px] font-medium leading-tight">
                  {isAr ? 'توصيل خلال 72 ساعة' : '72h Express Delivery'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-600">
                <Lock className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span className="text-[11px] font-medium leading-tight">
                  {isAr ? 'تغليف سري محكم' : 'Discreet Package'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-600">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span className="text-[11px] font-medium leading-tight">
                  {isAr ? 'أصلي ومضمون' : '100% Genuine'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-600">
                <RotateCcw className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span className="text-[11px] font-medium leading-tight">
                  {isAr ? 'استرجاع 14 يوم' : '14 Days Return'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TetraGlowHero;
