'use client';

import { useEffect } from "react";
import posthog from "posthog-js";
import type { Product } from "@/types/models/product";
import { viewContent } from "@/lib/fbpixel";

export default function ProductViewTracker({ product }: { product: Product }) {
  useEffect(() => {
    posthog.capture('product_viewed', {
      product_id: product.id,
      product_name_en: product.nameEn,
      product_name_ar: product.nameAr,
      price: typeof product.price === 'number' ? product.price : undefined,
    });
    viewContent(product);
  }, [product.id]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}
