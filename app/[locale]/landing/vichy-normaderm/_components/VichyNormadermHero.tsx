'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  CheckCircle2,
  ShoppingCart,
  Zap,
  Heart,
  Droplets,
} from 'lucide-react';
import VichyNormadermGallery from './VichyNormadermGallery';
import type { VichyNormadermProductData } from '../_types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, addLocalCartItem } from '@/store/slices/cartsSlice';
import { localStorageManager } from '@/lib/localStorageManager';
import { showProductToast } from '@/lib/swal';
import posthog from 'posthog-js';
import { addToCart as fbAddToCart, initiateCheckout as fbInitiateCheckout } from '@/lib/fbpixel';

interface VichyNormadermHeroProps {
  product: VichyNormadermProductData;
  lang: string;
  onScrollToOrder?: () => void;
}

export const VichyNormadermHero: React.FC<VichyNormadermHeroProps> = ({
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

  const executeAddToCart = async (qty: number): Promise<boolean> => {
    try {
      if (isAuthenticated) {
        await dispatch(addToCart({ productId: product.id, quantity: qty })).unwrap();
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

      posthog.capture('product_added_to_cart', {
        product_id: product.id,
        product_name_en: product.nameEn,
        product_name_ar: product.nameAr,
        price: product.price,
        quantity: qty,
      });

      fbAddToCart(
        { id: product.id, nameEn: product.nameEn, nameAr: product.nameAr, price: product.price },
        qty
      );

      if (typeof document !== 'undefined') {
        document.dispatchEvent(new CustomEvent('open-mini-cart'));
      }

      return true;
    } catch (err) {
      console.error('Failed to add product to cart:', err);
      return false;
    }
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const success = await executeAddToCart(1);
      if (success) {
        showProductToast(
          isAr ? 'تمت إضافة المنتج إلى السلة بنجاح' : 'Added to cart successfully',
          isAr
        );
      }
    } finally {
      setIsAdding(false);
    }
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

  const handleBuyNow = () => {
    posthog.capture('checkout_started', {
      product_id: product.id,
      cart_total: product.price,
      item_count: 1,
      source: 'landing_hero_buy_now',
    });
    fbInitiateCheckout(product.price, 1);
    scrollToExpressForm();
  };

  return (
    <section className="w-full py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 w-full lg:sticky lg:top-24">
            <VichyNormadermGallery images={product.images} lang={lang} />
          </div>

          {/* Right Column: Product Info & Buy Panel */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Top Bar: Brand & Stock Badge */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200/80 tracking-wide uppercase">
                VICHY LABORATOIRES · FRANCE
              </span>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-emerald-800">
                  {isAr ? 'متوفر بالمخزن للشحن الفوري' : 'In Stock for Immediate Delivery'}
                </span>
              </div>
            </div>

            {/* Product Title & Tagline */}
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-neutral-900 leading-tight">
                {isAr ? product.nameAr : product.nameEn}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {isAr ? product.taglineAr : product.taglineEn}
              </p>
            </div>

            {/* Safety Badges Strip */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(isAr ? product.safetyBadgesAr : product.safetyBadgesEn).map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-stone-100/80 text-neutral-700"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
                  <span>{badge}</span>
                </span>
              ))}
            </div>

            {/* Price Box with Safsafah Brand Palette */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-teal-50/80 via-white to-stone-50 border border-teal-100 shadow-xs">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-black text-teal-800">
                  {priceFmt(product.price)}
                </span>
                <span className="text-base sm:text-lg text-neutral-400 line-through font-semibold">
                  {priceFmt(product.originalPrice)}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold text-white bg-red-500 shadow-xs">
                  {isAr
                    ? `وفر ${product.discountPercentage}٪`
                    : `Save ${product.discountPercentage}%`}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-teal-800">
                <Lock className="w-3.5 h-3.5 text-teal-700" />
                <span>
                  {isAr
                    ? 'شحن سريع والدفع عند الاستلام متاح في جميع المحافظات'
                    : 'Fast Shipping & Cash on Delivery Available across Egypt'}
                </span>
              </div>
            </div>

            {/* Quick Benefits Bullet Points */}
            <div className="space-y-2 py-1">
              {(isAr ? product.highlightsAr.slice(0, 4) : product.highlightsEn.slice(0, 4)).map(
                (item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>

            {/* Action CTAs: Order Now (COD) & Add to Cart */}
            <div className="space-y-3 pt-2">
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

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => setIsLiked((p) => !p)}
              className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-red-500 transition-colors w-fit"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
              />
              <span>{isAr ? 'أضف إلى المفضلة' : 'Add to Wishlist'}</span>
            </button>

            {/* Reassurance Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-neutral-100">
              <div className="flex items-center gap-1.5 text-neutral-600">
                <Truck className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
                <span className="text-[11px] font-medium leading-tight">
                  {isAr ? 'توصيل خلال 72 ساعة' : '72h Express Delivery'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-600">
                <Lock className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
                <span className="text-[11px] font-medium leading-tight">
                  {isAr ? 'تغليف محكم وآمن' : 'Secure Packaging'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-600">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
                <span className="text-[11px] font-medium leading-tight">
                  {isAr ? 'أصلي 100٪ ومضمون' : '100% Genuine'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-600">
                <RotateCcw className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
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

export default VichyNormadermHero;
