'use client';

import React from "react";
import { Trash2 } from "lucide-react";
import { useProductCart } from "@/hooks/useProductCart";

/**
 * CartButton
 *
 * Shows an "Add to cart" button when the product is not in the cart,
 * or a quantity stepper (–  n  +) when it is.
 * Mirrors the behaviour of AddToCartControls on the product page.
 *
 * @param {Object}   product
 * @param {Object}   brand
 * @param {string}   lang       - "ar" | "en"
 * @param {Function} onSuccess  - optional callback after adding to cart
 */
export default function CartButton({ product, brand, lang, onSuccess }) {
  const isRTL = lang === "ar";

  const {
    cartItem,
    isLoading,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
  } = useProductCart(product);

  if (cartItem) {
    return (
      <div
        className="flex items-center border rounded-xl overflow-hidden"
        style={{ borderColor: brand.primary }}
      >
        <button
          onClick={handleDecrement}
          disabled={isLoading}
          className="px-2.5 py-1.5 hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ color: cartItem.quantity <= 1 ? "#ef4444" : brand.primary }}
          aria-label={isRTL ? "تقليل الكمية" : "Decrease quantity"}
        >
          {cartItem.quantity <= 1 ? (
            <Trash2 className="w-3.5 h-3.5" />
          ) : (
            <span className="text-sm font-bold leading-none select-none">–</span>
          )}
        </button>

        <div
          className="px-3 py-1.5 min-w-[32px] text-center text-sm font-semibold"
          style={{ color: brand.primary }}
          aria-live="polite"
        >
          {cartItem.quantity}
        </div>

        <button
          onClick={handleIncrement}
          disabled={isLoading}
          className="px-2.5 py-1.5 hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ color: brand.primary }}
          aria-label={isRTL ? "زيادة الكمية" : "Increase quantity"}
        >
          <span className="text-sm font-bold leading-none select-none">+</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => handleAddToCart(onSuccess)}
      disabled={isLoading}
      className="flex-1 px-3 py-1.5 rounded-xl text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      style={{ background: brand.primary }}
    >
      {isLoading
        ? (isRTL ? "..." : "...")
        : (isRTL ? "أضف للسلة" : "Add to cart")}
    </button>
  );
}
