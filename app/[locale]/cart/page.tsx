'use client';

import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Language, Product } from "@/types";
import posthog from "posthog-js";
import { useTranslation } from "react-i18next";
import '@/lib/i18n';
import { BRAND } from "@/content/brand";
import { useDir } from "@/hooks/useDir";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  applyPromoCode,
  updateLocalCartItemQuantity,
  removeLocalCartItem,
} from "@/store/slices/cartsSlice";
import { localStorageManager } from "@/lib/localStorageManager";
import { productsService } from "@/lib/api/services/products.service";

import FloatingCart from "@/components/appchrome/FloatingCart";

import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import FreeShippingBar from "@/components/cart/FreeShippingBar";
import EmptyCart from "@/components/cart/EmptyCart";
import PromoCode from "@/components/cart/PromoCode";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { cart, localItems, isLoading } = useAppSelector((state) => state.cart);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang: Language = (locale === 'en' || locale === 'ar') ? locale : 'ar';

  const { t, i18n } = useTranslation('cart');
  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);
  useDir();

  const [promo, setPromo] = useState("");
  const [guestProducts, setGuestProducts] = useState<Product[]>([]);
  const [guestLoading, setGuestLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchCart());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated || localItems.length === 0) {
      setGuestProducts([]);
      return;
    }
    setGuestLoading(true);
    Promise.all(localItems.map((li) => productsService.getProduct(li.productId)))
      .then(setGuestProducts)
      .finally(() => setGuestLoading(false));
  }, [isAuthenticated, localItems]);

  const items = useMemo(() => {
    if (isAuthenticated) {
      if (!cart?.items) return [];
      return cart.items.map((item) => ({
        id: item.id,
        name: { en: item.productNameEn, ar: item.productNameAr },
        price: item.productPrice,
        productId: item.productId,
        img: item.productImage,
        slugEn: item.productSlugEn,
        slugAr: item.productSlugAr,
        variant: "30ml",
        qty: item.quantity,
        stock: 10,
      }));
    }
    return localItems.flatMap((li) => {
      const p = guestProducts.find((prod) => prod.id === li.productId);
      if (!p) return [];
      return [{
        id: li.productId,
        name: { en: p.nameEn, ar: p.nameAr },
        price: p.price,
        productId: li.productId,
        img: p.image,
        slugEn: p.slugEn,
        slugAr: p.slugAr,
        variant: "30ml",
        qty: li.quantity,
        stock: p.stock ?? 10,
      }];
    });
  }, [isAuthenticated, cart, localItems, guestProducts]);

  const fmt = (n: number): string =>
    new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(n);

  const updateQty = (id: number, q: number): void => {
    if (isAuthenticated) {
      const item = items.find((it) => it.id === id);
      const newQty = Math.max(1, Math.min(q, item?.stock ?? 10));
      dispatch(updateCartItem({ itemId: id, quantity: newQty }));
    } else {
      const item = items.find((it) => it.id === id);
      if (!item) return;
      const newQty = Math.max(1, Math.min(q, item.stock));
      dispatch(updateLocalCartItemQuantity({ productId: id, quantity: newQty }));
      const updated = localStorageManager.getCartItems().map((ci) =>
        ci.productId === id ? { ...ci, quantity: newQty } : ci
      );
      localStorageManager.setCartItems(updated);
    }
  };

  const removeItem = (id: number): void => {
    if (isAuthenticated) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(removeLocalCartItem(id));
      localStorageManager.setCartItems(
        localStorageManager.getCartItems().filter((ci) => ci.productId !== id)
      );
    }
  };

  const handleApplyPromo = async (): Promise<void> => {
    if (promo.trim()) {
      try {
        await dispatch(applyPromoCode(promo.trim())).unwrap();
        posthog.capture('promo_code_applied', {
          promo_code: promo.trim(),
          cart_total: subtotal,
        });
      } catch (error) {
        posthog.captureException(error);
        console.error('Failed to apply promo code:', error);
      }
    }
  };

  const freeShippingThreshold = 2000;
  const subtotal = isAuthenticated
    ? (cart?.totalPrice || 0)
    : items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const discount = cart?.discountAmount || 0;
  const shipping = subtotal - discount >= freeShippingThreshold ? 0 : 50;
  const total = Math.max(0, subtotal - discount + shipping);

  const showLoading = isLoading || guestLoading;

  return (
    <div className="min-h-screen bg-white text-neutral-900">


      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-4">
          {t('title')}
        </h1>

        {showLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900"></div>
          </div>
        ) : items.length === 0 ? (
          <EmptyCart brand={BRAND} />
        ) : (
          <>
            <FreeShippingBar brand={BRAND} subtotal={subtotal} target={freeShippingThreshold} />

            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr),380px]">
              <section className="space-y-3">
                {items.map((it) => (
                  <CartItem
                    key={it.id}
                    lang={lang}
                    brand={BRAND}
                    item={it}
                    onQty={(q: number) => updateQty(it.id, q)}
                    onRemove={() => removeItem(it.id)}
                  />
                ))}

                <PromoCode
                  brand={BRAND}
                  value={promo}
                  onChange={setPromo}
                  onApply={handleApplyPromo}
                  hint={t('promo_hint')}
                />
              </section>

              <aside className="self-start">
                <OrderSummary
                  brand={BRAND}
                  fmt={fmt}
                  subtotal={subtotal}
                  discount={discount}
                  shipping={shipping}
                  total={total}
                  checkoutButton={null}
                  onCheckout={() => {
                    posthog.capture('checkout_started', {
                      cart_total: total,
                      item_count: items.length,
                    });
                    router.push(`/${locale}/checkout`);
                  }}
                />
              </aside>
            </div>
          </>
        )}
      </main>

      <FloatingCart brand={BRAND} />

      {items.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-neutral-200 md:hidden">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="text-xs text-neutral-600">
                {t('total')}
              </div>
              <div className="font-extrabold">
                {fmt(total)}
              </div>
            </div>
            <button
              onClick={() => {
                posthog.capture('checkout_started', {
                  cart_total: total,
                  item_count: items.length,
                });
                router.push(`/${locale}/checkout`);
              }}
              className="px-5 py-3 rounded-2xl text-white font-semibold"
              style={{ background: BRAND.primary }}
            >
              {t('checkout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
