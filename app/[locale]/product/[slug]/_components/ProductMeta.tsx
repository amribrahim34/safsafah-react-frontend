'use client';

import Stars from "@/components/ui/Stars";
import ProductBadges from "./ProductBadges";
import type { Product } from '@/types/models/product';
import type { BrandColors } from '../types';

interface ProductMetaProps {
  product: Product;
  brand: BrandColors;
  lang: string;
  priceFmt: (value: number) => string;
  onShowReviews: () => void;
}

/**
 * ProductMeta
 * Displays brand / rating / price / SKU for a product.
 */
export default function ProductMeta({ product, brand, lang, priceFmt, onShowReviews }: ProductMetaProps) {
  const title     = lang === "ar" ? product.nameAr     : product.nameEn;
  const brandName = lang === "ar" ? product.brand?.nameAr : product.brand?.nameEn;
  const price     = typeof product.price === "number" ? product.price : 0;

  // The API returns `rating` as a numeric string (e.g. "3.0000").
  // Fall back through common field names so the component is resilient to
  // both the raw API shape and any future normalisation layer.
  const rating      = Number(product.averageRating ?? 0);
  const reviewCount = product.ratingCount ?? product.reviews?.length ?? 0;

  return (
    <div>
      {/* Brand */}
      {brandName && (
        <div
          className="text-sm font-bold mb-1"
          style={{ color: brand?.primary }}
        >
          {brandName}
        </div>
      )}

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-extrabold">{title}</h1>

      {/* Rating */}
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <Stars rating={rating} />

        {rating > 0 ? (
          <span className="text-sm text-neutral-600">
            {rating.toFixed(1)} · {reviewCount} {lang === "ar" ? "تقييم" : "ratings"}
          </span>
        ) : (
          <span className="text-sm text-neutral-400">
            {lang === "ar" ? "لا توجد تقييمات بعد" : "No ratings yet"}
          </span>
        )}

        {reviewCount > 0 && (
          <button className="text-sm underline" onClick={onShowReviews}>
            {lang === "ar" ? "قراءة المراجعات" : "Read reviews"}
          </button>
        )}
      </div>

      {/* Price */}
      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <div className="text-2xl font-black">{priceFmt(price)}</div>
      </div>

      {/* Stock */}
      {product.stock != null && (
        <div className="mt-1 text-sm">
          {lang === "ar"
            ? `المتاح بالمخزون: ${product.stock}`
            : `Only ${product.stock} left in stock!`}
        </div>
      )}

      {/* SKU */}
      <div className="mt-2 text-xs text-neutral-500">
        {lang === "ar" ? "رمز المنتج: " : "SKU: "}{product.sku}
      </div>

      {/* Active ingredients & skin type badges */}
      <ProductBadges product={product} lang={lang} />
    </div>
  );
}
