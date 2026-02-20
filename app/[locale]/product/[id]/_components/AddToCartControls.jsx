'use client';

import React from "react";
import { Trash2, Heart } from "lucide-react";
import { useProductCart } from "@/hooks/useProductCart";
import { useWishlist } from "@/hooks/useWishlist";

/**
 * AddToCartControls
 * Shows an "Add to cart" button (or quantity stepper when already in cart)
 * alongside a wishlist toggle button.
 *
 * @param {Object} product
 * @param {Object} brand
 * @param {string} lang - "ar" | "en"
 * @param {Function} onSuccess - called after item is added to cart
 */
export default function AddToCartControls({ product, brand, lang, onSuccess }) {
  const {
    cartItem,
    isLoading,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
  } = useProductCart(product);

  const {
    isInWishlist,
    isLoading: isWishlistLoading,
    handleToggleWishlist,
  } = useWishlist(product);

  const isOutOfStock = product.stock != null && product.stock < 1;
  const atStockLimit = Boolean(product.stock && cartItem?.quantity >= product.stock);

  return (
    <div className="mt-5">
      <div className="flex items-center gap-3">

        {/* Quantity stepper — shown when product is already in cart */}
        {cartItem ? (
          <div
            className="flex items-center border rounded-2xl overflow-hidden"
            style={{ borderColor: brand.primary }}
          >
            <button
              className="px-3 py-2 hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleDecrement}
              disabled={isLoading}
              style={{ color: cartItem.quantity <= 1 ? "#ef4444" : brand.primary }}
              aria-label={lang === "ar" ? "تقليل الكمية" : "Decrease quantity"}
            >
              {cartItem.quantity <= 1 ? (
                <Trash2 className="w-4 h-4" />
              ) : (
                "–"
              )}
            </button>

            <div
              className="px-4 py-2 min-w-[40px] text-center font-semibold"
              style={{ color: brand.primary }}
              aria-live="polite"
            >
              {cartItem.quantity}
            </div>

            <button
              className="px-3 py-2 hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleIncrement}
              disabled={isLoading || atStockLimit}
              style={{ color: brand.primary }}
              aria-label={lang === "ar" ? "زيادة الكمية" : "Increase quantity"}
            >
              +
            </button>
          </div>
        ) : (
          /* Add to cart button — shown when product is NOT in cart */
          <button
            onClick={() => handleAddToCart(onSuccess)}
            disabled={isLoading || isOutOfStock}
            className="px-6 py-3 rounded-2xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: brand.primary }}
          >
            {isLoading
              ? lang === "ar" ? "جاري الإضافة..." : "Adding..."
              : isOutOfStock
              ? lang === "ar" ? "غير متوفر" : "Out of stock"
              : lang === "ar" ? "أضِف إلى السلة" : "Add to cart"}
          </button>
        )}

        {/* Wishlist toggle */}
        <button
          onClick={() => handleToggleWishlist()}
          disabled={isWishlistLoading}
          className="px-4 py-3 rounded-2xl border font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          style={{
            borderColor: brand.primary,
            color: isInWishlist ? "#fff" : brand.primary,
            backgroundColor: isInWishlist ? brand.primary : "transparent",
          }}
        >
          <Heart className="w-5 h-5" fill={isInWishlist ? "#fff" : "none"} />
          <span className="hidden sm:inline">
            {isWishlistLoading
              ? lang === "ar" ? "جاري المعالجة..." : "Processing..."
              : isInWishlist
              ? lang === "ar" ? "في المفضلة" : "In wishlist"
              : lang === "ar" ? "أضف للمفضلة" : "Add to wishlist"}
          </span>
        </button>
      </div>

      {/* Stock-limit warning */}
      {atStockLimit && (
        <div className="mt-2 text-sm text-amber-600">
          {lang === "ar"
            ? `الحد الأقصى المتاح: ${product.stock}`
            : `Maximum available: ${product.stock}`}
        </div>
      )}
    </div>
  );
}
