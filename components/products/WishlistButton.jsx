'use client';

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice";

/**
 * WishlistButton
 *
 * A self-contained heart toggle button for adding / removing a product
 * from the wishlist. Manages its own optimistic local state seeded from
 * `product.isInWishlist`, so it works in list contexts (not just single
 * product pages).
 *
 * @param {Object} product  - must have `id` and `isInWishlist`
 * @param {Object} brand
 * @param {string} lang     - "ar" | "en"
 */
export default function WishlistButton({ product, brand, lang, initialIsInWishlist }) {
  const isRTL = lang === "ar";
  const dispatch = useAppDispatch();

  const { loadingProductId } = useAppSelector((state) => state.wishlist);
  const isLoading = loadingProductId === product?.id;

  // Prefer explicit prop; fall back to API field; default false
  const [isInWishlist, setIsInWishlist] = useState(
    initialIsInWishlist ?? product?.isInWishlist ?? false
  );

  const handleToggle = async () => {
    if (!product || isLoading) return;

    const previous = isInWishlist;
    // Optimistic update
    setIsInWishlist(!previous);

    try {
      if (previous) {
        await dispatch(removeFromWishlist(product.id)).unwrap();
      } else {
        await dispatch(addToWishlist(product.id)).unwrap();
      }
    } catch {
      // Rollback on failure
      setIsInWishlist(previous);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className="px-2.5 py-1.5 rounded-xl border transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        borderColor: brand.primary,
        color: isInWishlist ? "#fff" : brand.primary,
        backgroundColor: isInWishlist ? brand.primary : "transparent",
      }}
      aria-label={
        isRTL
          ? isInWishlist ? "إزالة من المفضلة" : "أضف للمفضلة"
          : isInWishlist ? "Remove from wishlist" : "Add to wishlist"
      }
    >
      <Heart className="w-4 h-4" fill={isInWishlist ? "#fff" : "none"} />
    </button>
  );
}
