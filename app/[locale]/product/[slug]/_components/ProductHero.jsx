'use client';

import React from "react";
import ImageGallery from "./ImageGallery";
import AddToCartControls from "./AddToCartControls";
import AddReview from "./AddReview";
import ProductMeta from "./ProductMeta";

/**
 * ProductHero
 * Two-column section: image gallery on the left, product info on the right.
 *
 * @param {Object}   product
 * @param {Object}   brand
 * @param {string}   lang            - "ar" | "en"
 * @param {boolean}  isAuthenticated
 * @param {Object}   userReview      - existing user review (or null)
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
