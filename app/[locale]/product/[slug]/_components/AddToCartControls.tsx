'use client';

import React from "react";
import { Heart } from "lucide-react";
import AddToCartButton from "@/components/products/AddToCartButton";
import { useWishlist } from "@/hooks/useWishlist";
import type { Product } from '@/types/models/product';
import type { BrandColors } from '../types';

interface AddToCartControlsProps {
  product: Product;
  brand: BrandColors;
  lang: string;
  onSuccess?: () => void;
}

/**
 * AddToCartControls
 * Pairs the shared add-to-cart control (button / quantity stepper) with a
 * wishlist toggle button on the product detail page.
 */
export default function AddToCartControls({ product, brand, lang, onSuccess }: AddToCartControlsProps) {
  const {
    isInWishlist,
    isLoading: isWishlistLoading,
    handleToggleWishlist,
  } = useWishlist(product);

  return (
    <div className="mt-5">
      <div className="flex items-center gap-3">
        <AddToCartButton
          variant="detail"
          productId={product.id}
          product={product}
          brand={brand}
          lang={lang}
          onSuccess={onSuccess}
        />

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
    </div>
  );
}
