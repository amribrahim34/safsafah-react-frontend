"use client";

import { Trash2, Check, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { getLocalizedPath } from "@/lib/locale-navigation";
import { useProductCart } from "@/hooks/useProductCart";
import { useCardCart } from "@/hooks/useCardCart";
import { useAppSelector } from "@/store/hooks";
import type { Product } from "@/types/models/product";
import type { BrandColors } from "@/types/models/brand";

type Variant = "card" | "detail";

interface AddToCartButtonProps {
  /** Product id — all that the guest/local cart needs. */
  productId: number;
  /** Full product — required by the `detail` variant for the quantity stepper. */
  product?: Product | null;
  brand: BrandColors;
  lang: string;
  /** `card` = compact icon button + "In cart" link. `detail` = full button + stepper. */
  variant: Variant;
  onSuccess?: () => void;
}

/**
 * AddToCartButton
 * Single source of truth for add-to-cart behaviour shared by the product card
 * and the product detail page. Handles both authenticated (server cart) and
 * guest (localStorage) flows; the `variant` prop only changes presentation.
 */
export default function AddToCartButton({
  productId,
  product,
  brand,
  lang,
  variant,
  onSuccess,
}: AddToCartButtonProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const langKey = lang === "en" ? "en" : "ar";

  // Server cart (authenticated) — drives the detail-page quantity stepper.
  const {
    cartItem,
    isLoading: productLoading,
    handleAddToCart: handleProductAdd,
    handleIncrement,
    handleDecrement,
  } = useProductCart(product);

  // Guest-aware add (localStorage + toast) — also covers the authenticated
  // "card" flow, mirroring the original ProductCard behaviour.
  const {
    isInCart: cardInCart,
    isLoading: cardLoading,
    handleAddToCart: handleCardAdd,
  } = useCardCart(productId, langKey);

  const isOutOfStock = product?.stock != null && product.stock < 1;
  const atStockLimit = Boolean(
    product?.stock && cartItem && cartItem.quantity >= product.stock
  );

  // The detail page uses the richer authenticated flow (mini-cart + analytics);
  // everything else falls back to the guest-aware card flow.
  const useProductFlow = variant === "detail" && isAuthenticated;
  const addLoading = useProductFlow ? productLoading : cardLoading;

  const handleAdd = () => {
    if (useProductFlow) {
      handleProductAdd(() => {
        document.dispatchEvent(new CustomEvent("open-mini-cart"));
        onSuccess?.();
      });
    } else {
      handleCardAdd();
      onSuccess?.();
    }
  };

  // ─── Card variant — compact, icon-only ──────────────────────────────────────
  if (variant === "card") {
    if (cardInCart) {
      return (
        <Link
          href={getLocalizedPath("/cart", langKey)}
          className="flex items-center gap-1 rounded text-white md:px-3 md:py-2 px-2 py-1 text-xs font-semibold hover:opacity-90 transition-opacity"
          style={{ background: "#8DA78A" }}
        >
          <Check className="w-4 h-4" />
          <span className="hidden sm:inline">
            {langKey === "ar" ? "في السلة" : "In Cart"}
          </span>
        </Link>
      );
    }

    return (
      <button
        onClick={handleAdd}
        disabled={addLoading}
        aria-label={langKey === "ar" ? "أضِف إلى السلة" : "Add to cart"}
        className="rounded text-white md:px-3 md:py-2 px-2 py-1 hover:opacity-90 transition-opacity disabled:opacity-50 flex"
        style={{ background: brand.primary }}
      >
        {addLoading ? "..." : <ShoppingCart className="w-4 h-4" />}
      </button>
    );
  }

  // ─── Detail variant — full button / quantity stepper ────────────────────────
  return (
    <div className="flex flex-col gap-2">
      {cartItem ? (
        /* Quantity stepper — authenticated user with a server cart item */
        <div
          className="flex items-center border rounded-2xl overflow-hidden"
          style={{ borderColor: brand.primary }}
        >
          <button
            className="px-3 py-2 hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDecrement}
            disabled={productLoading}
            style={{ color: cartItem.quantity <= 1 ? "#ef4444" : brand.primary }}
            aria-label={langKey === "ar" ? "تقليل الكمية" : "Decrease quantity"}
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
            className="px-3 py-2 hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleIncrement}
            disabled={productLoading || atStockLimit}
            style={{ color: brand.primary }}
            aria-label={langKey === "ar" ? "زيادة الكمية" : "Increase quantity"}
          >
            +
          </button>
        </div>
      ) : !isAuthenticated && cardInCart ? (
        /* Guest already added the item locally — show in-cart state */
        <div
          className="px-6 py-3 rounded-2xl text-white font-semibold flex items-center gap-2"
          style={{ background: brand.primary }}
        >
          <Check className="w-5 h-5" />
          {langKey === "ar" ? "في السلة" : "In cart"}
        </div>
      ) : (
        /* Add to cart button — shown when product is NOT in cart */
        <button
          onClick={handleAdd}
          disabled={addLoading || isOutOfStock}
          className="px-6 py-3 rounded-2xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: brand.primary }}
        >
          {addLoading
            ? langKey === "ar" ? "جاري الإضافة..." : "Adding..."
            : isOutOfStock
            ? langKey === "ar" ? "غير متوفر" : "Out of stock"
            : langKey === "ar" ? "أضِف إلى السلة" : "Add to cart"}
        </button>
      )}

      {/* Stock-limit warning */}
      {atStockLimit && (
        <div className="text-sm text-amber-600">
          {langKey === "ar"
            ? `الحد الأقصى المتاح: ${product?.stock}`
            : `Maximum available: ${product?.stock}`}
        </div>
      )}
    </div>
  );
}
