'use client';

import React from "react";
import { Star } from "lucide-react";
import ImageGallery from "./ImageGallery";
import AddToCartControls from "./AddToCartControls";
import AddReview from "./AddReview";
import Stars from "@/components/ui/Stars";

/**
 * ProductMeta
 * Brand / category / rating / price / SKU row.
 */
function ProductMeta({ product, lang, priceFmt, brand, onShowReviews }) {
  const title = lang === "ar" ? product.nameAr : product.nameEn;
  const brandName = lang === "ar" ? product.brand?.nameAr : product.brand?.nameEn;
  const categoryName = lang === "ar" ? product.category?.name_ar : product.category?.name_en;
  const price = product.price?.parsedValue ?? product.price ?? 0;
  const rating = product.averageRating?.parsedValue ?? product.averageRating ?? 0;
  const reviewCount = product.reviews?.length ?? 0;

  return (
    <div>
      {/* Brand · Category */}
      <div className="text-sm text-neutral-600 mb-1">
        {brandName} {categoryName ? `· ${categoryName}` : ""}
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-extrabold">{title}</h1>

      {/* Rating */}
      {rating > 0 && (
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <Stars rating={rating} />
          <span className="text-sm text-neutral-600">
            {rating.toFixed(1)} · {reviewCount} {lang === "ar" ? "تقييم" : "ratings"}
          </span>
          {reviewCount > 0 && (
            <button className="text-sm underline" onClick={onShowReviews}>
              {lang === "ar" ? "قراءة المراجعات" : "Read reviews"}
            </button>
          )}
        </div>
      )}

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
    </div>
  );
}


/**
 * ProductHero
 * Two-column section: image gallery on the left, product info on the right.
 *
 * @param {Object}   product
 * @param {Object}   brand
 * @param {string}   lang       - "ar" | "en"
 * @param {boolean}  isAuthenticated
 * @param {Object}   userReview - existing user review (or null)
 * @param {Function} onMiniCartOpen
 * @param {Function} onShowReviews
 * @param {Function} onReviewSuccess
 */
export default function ProductHero({
  product,
  brand,
  lang,
  isAuthenticated,
  userReview,
  onMiniCartOpen,
  onShowReviews,
  onReviewSuccess,
}) {
  const priceFmt = new Intl.NumberFormat(
    lang === "ar" ? "ar-EG" : "en-EG",
    { style: "currency", currency: "EGP", maximumFractionDigits: 0 }
  ).format;

  const title = lang === "ar" ? product.nameAr : product.nameEn;
  const description = lang === "ar" ? product.descriptionAr : product.descriptionEn;
  const images = product.image
    ? [{ src: product.image, alt: title }]
    : [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
      {/* Gallery */}
      <ImageGallery images={images} brand={brand} />

      {/* Info column */}
      <div>
        <ProductMeta
          product={product}
          lang={lang}
          priceFmt={priceFmt}
          brand={brand}
          onShowReviews={onShowReviews}
        />

        {/* Add to cart + wishlist */}
        <AddToCartControls
          product={product}
          brand={brand}
          lang={lang}
          onSuccess={onMiniCartOpen}
        />

        {/* Description */}
        {description && (
          <div className="mt-6">
            <div className="font-bold mb-1">{lang === "ar" ? "الوصف" : "Description"}</div>
            <p className="text-neutral-700 text-sm">{description}</p>
          </div>
        )}

        {/* Add / edit review (authenticated purchasers only) */}
        {isAuthenticated && (
          <AddReview
            product={product}
            brand={brand}
            lang={lang}
            userReview={userReview}
            onSuccess={onReviewSuccess}
          />
        )}
      </div>
    </section>
  );
}
