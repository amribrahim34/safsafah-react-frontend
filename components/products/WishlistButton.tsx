"use client";

import { useEffect } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useCardWishlist } from "@/hooks/useCardWishlist";
import { useAppSelector } from "@/store/hooks";
import type { Product } from "@/types/models/product";
import type { BrandColors } from "@/types/models/brand";

type Variant = "card" | "detail";

interface WishlistButtonProps {
  /** Product id — all that the guest/local wishlist needs. */
  productId: number;
  /** Full product — required by the `detail` variant for the auth-aware flow. */
  product?: Product | null;
  /** SSR initial wishlist state, used as a fallback by the `card` variant. */
  isInWishlist?: boolean;
  brand: BrandColors;
  lang: string;
  /** `card` = floating heart icon. `detail` = bordered heart + label button. */
  variant: Variant;
  onSuccess?: (action: "added" | "removed") => void;
  /** Reports the current wishlist state to the parent (e.g. for card border). */
  onStateChange?: (inWishlist: boolean) => void;
}

/**
 * WishlistButton
 * Single source of truth for wishlist toggling shared by the product card and
 * the product detail page. Handles both authenticated (server) and guest
 * (localStorage) flows; the `variant` prop only changes presentation.
 */
export default function WishlistButton({
  productId,
  product,
  isInWishlist: isInWishlistProp = false,
  brand,
  lang,
  variant,
  onSuccess,
  onStateChange,
}: WishlistButtonProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const langKey = lang === "en" ? "en" : "ar";

  // Auth-aware flow (detail page) — hydrates the server status on mount,
  // optimistic update, analytics. No-op when `product` is undefined (card).
  const {
    isInWishlist: productInWishlist,
    isLoading: productLoading,
    handleToggleWishlist,
  } = useWishlist(product);

  // Guest-aware flow (card + guests) — localStorage + toast.
  const {
    isInWishlist: cardInWishlist,
    isLoading: cardLoading,
    handleToggle: handleCardToggle,
  } = useCardWishlist(productId, isInWishlistProp, langKey);

  // The detail page uses the richer authenticated flow; everything else falls
  // back to the guest-aware card flow.
  const useProductFlow = variant === "detail" && isAuthenticated;
  const inWishlist = useProductFlow ? productInWishlist : cardInWishlist;
  const isLoading = useProductFlow ? productLoading : cardLoading;

  useEffect(() => {
    onStateChange?.(inWishlist);
  }, [inWishlist, onStateChange]);

  const handleToggle = () => {
    if (useProductFlow) {
      handleToggleWishlist(onSuccess);
    } else {
      const action = inWishlist ? "removed" : "added";
      handleCardToggle();
      onSuccess?.(action);
    }
  };

  const ariaLabel = inWishlist
    ? langKey === "ar" ? "إزالة من المفضلة" : "Remove from favorites"
    : langKey === "ar" ? "إضافة إلى المفضلة" : "Add to favorites";

  // ─── Card variant — floating heart icon ─────────────────────────────────────
  if (variant === "card") {
    return (
      <button
        onClick={handleToggle}
        disabled={isLoading}
        aria-label={ariaLabel}
        className="absolute top-2 start-2 bg-white rounded-full p-1.5 shadow transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        <Heart
          className={`w-4 h-4 ${
            inWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>
    );
  }

  // ─── Detail variant — bordered heart + label ────────────────────────────────
  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      aria-label={ariaLabel}
      className="px-4 py-3 rounded-2xl border font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      style={{
        borderColor: brand.primary,
        color: inWishlist ? "#fff" : brand.primary,
        backgroundColor: inWishlist ? brand.primary : "transparent",
      }}
    >
      <Heart className="w-5 h-5" fill={inWishlist ? "#fff" : "none"} />
      <span className="hidden sm:inline">
        {isLoading
          ? langKey === "ar" ? "جاري المعالجة..." : "Processing..."
          : inWishlist
          ? langKey === "ar" ? "في المفضلة" : "In wishlist"
          : langKey === "ar" ? "أضف للمفضلة" : "Add to wishlist"}
      </span>
    </button>
  );
}
