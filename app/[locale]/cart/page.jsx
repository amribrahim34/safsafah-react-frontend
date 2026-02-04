'use client';

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BRAND } from "@/content/brand";
import { COPY } from "@/content/copy";
import { useDir } from "@/hooks/useDir";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCart, updateCartItem, removeFromCart, applyPromoCode } from "@/store/slices/cartsSlice";

import PromoBar from "@/components/header/PromoBar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import BottomTabs from "@/components/appchrome/BottomTabs";
import FloatingCart from "@/components/appchrome/FloatingCart";

import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import FreeShippingBar from "@/components/cart/FreeShippingBar";
import EmptyCart from "@/components/cart/EmptyCart";
import PromoCode from "@/components/cart/PromoCode";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { cart, isLoading } = useAppSelector((state) => state.cart);
  const router = useRouter();

  const [lang, setLang] = useState("ar");
  const T = useMemo(() => COPY[lang], [lang]);
  useDir();

  const [promo, setPromo] = useState("");

  // Fetch cart data on component mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Map API cart items to component format
  const items = useMemo(() => {
    if (!cart?.items) return [];
    return cart.items.map((item) => ({
      id: item.id,
      name: {
        en: item.productNameEn,
        ar: item.productNameAr,
      },
      price: item.productPrice,
      productId: item.productId,
      img: item.productImage,
      brand: item.brand, // Default brand since API doesn't provide it
      variant: "30ml", // Default variant since API doesn't provide it
      qty: item.quantity,
      stock: 10, // Default stock since API doesn't provide it
    }));
  }, [cart?.items]);

  const fmt = (n) =>
    new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(n);

  const updateQty = (id, q) => {
    // Find the item's stock limit
    const item = items.find((it) => it.id === id);
    if (item) {
      const newQty = Math.max(1, Math.min(q, item.stock));
      dispatch(updateCartItem({ itemId: id, quantity: newQty }));
    }
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleApplyPromo = async () => {
    if (promo.trim()) {
      try {
        await dispatch(applyPromoCode(promo.trim())).unwrap();
        // Success - cart will be updated automatically via Redux
      } catch (error) {
        // Error handling - you might want to show a toast notification here
        console.error('Failed to apply promo code:', error);
      }
    }
  };

  const subtotal = cart?.totalPrice || 0;
  const discount = promo.trim().toUpperCase() === "GLOW10" ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal - discount >= 500 ? 0 : 49;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} lang={lang} onToggleLang={() => setLang(lang === "ar" ? "en" : "ar")} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-4">
          {lang === "ar" ? "سلة المشتريات" : "Your Cart"}
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900"></div>
          </div>
        ) : items.length === 0 ? (
          <EmptyCart lang={lang} brand={BRAND} />
        ) : (
          <>
            <FreeShippingBar brand={BRAND} lang={lang} subtotal={subtotal} target={500} />

            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr),380px]">
              {/* Items */}
              <section className="space-y-3">
                {items.map((it) => (
                  <CartItem
                    key={it.id}
                    lang={lang}
                    brand={BRAND}
                    item={it}
                    onQty={(q) => updateQty(it.productId, q)}
                    onRemove={() => removeItem(it.productId)}
                  />
                ))}

                <PromoCode
                  lang={lang}
                  brand={BRAND}
                  value={promo}
                  onChange={setPromo}
                  onApply={handleApplyPromo}
                  hint={lang === "ar" ? "جرّب GLOW10 للحصول على 10%" : "Try GLOW10 for 10% off"}
                />
              </section>

              {/* Summary */}
              <aside className="self-start">
                <OrderSummary
                  lang={lang}
                  brand={BRAND}
                  fmt={fmt}
                  subtotal={subtotal}
                  discount={discount}
                  shipping={shipping}
                  total={total}
                  onCheckout={() => router.push("/checkout")}
                />
              </aside>
            </div>
          </>
        )}
      </main>

      <Footer brand={BRAND} lang={lang} copy={T} />
      <FloatingCart brand={BRAND} />
      <BottomTabs
        labels={{
          home: lang === "ar" ? "الرئيسية" : "Home",
          cats: lang === "ar" ? "الفئات" : "Categories",
          cart: lang === "ar" ? "السلة" : "Bag",
          wish: lang === "ar" ? "المفضلة" : "Wishlist",
          account: lang === "ar" ? "حسابي" : "Account",
        }}
      />

      {/* Sticky checkout on mobile */}
      {items.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-neutral-200 md:hidden">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="text-xs text-neutral-600">
                {lang === "ar" ? "الإجمالي" : "Total"}
              </div>
              <div className="font-extrabold">
                {new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
                  style: "currency",
                  currency: "EGP",
                  maximumFractionDigits: 0,
                }).format(total)}
              </div>
            </div>
            <button
              onClick={() => router.push("/checkout")}
              className="px-5 py-3 rounded-2xl text-white font-semibold"
              style={{ background: BRAND.primary }}
            >
              {lang === "ar" ? "إتمام الشراء" : "Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
