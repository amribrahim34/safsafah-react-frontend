'use client';

import React from "react";
import AddToCartButton from "@/components/products/AddToCartButton";
import WishlistButton from "@/components/products/WishlistButton";
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
 * Pairs the shared add-to-cart control (button / quantity stepper) with the
 * shared wishlist toggle on the product detail page.
 */
export default function AddToCartControls({ product, brand, lang, onSuccess }: AddToCartControlsProps) {
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

        <WishlistButton
          variant="detail"
          productId={product.id}
          product={product}
          brand={brand}
          lang={lang}
        />
      </div>
    </div>
  );
}
