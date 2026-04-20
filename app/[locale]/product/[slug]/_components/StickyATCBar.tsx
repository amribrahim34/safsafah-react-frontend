'use client';

import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useProductCart } from "@/hooks/useProductCart";
import type { Product } from "@/types/models/product";
import type { BrandColors } from '../types';
import type { CartItem } from '@/types/models/cart';

const SCROLL_THRESHOLD = 500;

interface StickyATCBarProps {
  product: Product;
  brand: BrandColors;
  lang: string;
}

export default function StickyATCBar({ product, brand, lang }: StickyATCBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const {
    cartItem,
    isLoading,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
  } = useProductCart(product) as {
    cartItem: CartItem | undefined;
    isLoading: boolean;
    handleAddToCart: (cb?: () => void) => void;
    handleIncrement: () => void;
    handleDecrement: () => void;
  };

  if (!visible) return null;

  const title = lang === "ar" ? product.nameAr : product.nameEn;
  const price = typeof product.price === "number" ? product.price : 0;

  const formattedPrice = new Intl.NumberFormat(
    lang === "ar" ? "ar-EG" : "en-EG",
    { style: "currency", currency: "EGP", maximumFractionDigits: 0 }
  ).format(price);

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex-1 truncate">
          <span className="font-semibold">{title}</span>
          {" · "}
          <span className="text-neutral-700">{formattedPrice}</span>
        </div>

        {cartItem ? (
          <div
            className="flex items-center border rounded-2xl overflow-hidden"
            style={{ borderColor: brand.primary }}
          >
            <button
              className="px-3 py-2 hover:bg-neutral-100 transition-colors disabled:opacity-50"
              onClick={handleDecrement}
              disabled={isLoading}
              style={{ color: cartItem.quantity <= 1 ? "#ef4444" : brand.primary }}
              aria-label={lang === "ar" ? "تقليل الكمية" : "Decrease quantity"}
            >
              {cartItem.quantity <= 1 ? <Trash2 className="w-4 h-4" /> : "–"}
            </button>

            <div
              className="px-4 py-2 min-w-[40px] text-center font-semibold"
              style={{ color: brand.primary }}
              aria-live="polite"
            >
              {cartItem.quantity}
            </div>

            <button
              className="px-3 py-2 hover:bg-neutral-100 transition-colors disabled:opacity-50"
              onClick={handleIncrement}
              disabled={isLoading}
              style={{ color: brand.primary }}
              aria-label={lang === "ar" ? "زيادة الكمية" : "Increase quantity"}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleAddToCart(() => document.dispatchEvent(new CustomEvent('open-mini-cart')))}
            disabled={isLoading}
            className="px-5 py-3 rounded-2xl text-white font-semibold disabled:opacity-50"
            style={{ background: brand.primary }}
          >
            {isLoading
              ? lang === "ar" ? "جاري الإضافة..." : "Adding..."
              : lang === "ar" ? "أضِف إلى السلة" : "Add to cart"}
          </button>
        )}
      </div>
    </div>
  );
}
