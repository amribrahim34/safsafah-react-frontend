"use client";

import { useState } from "react";
import { Star, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { getLocalizedPath } from "@/lib/locale-navigation";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";
import GuestOrderModal from "./GuestOrderModal";
import type { RootState } from "@/store";

interface ProductCardProps {
  id: number;
  slugAr?: string;
  slugEn?: string;
  nameAr: string;
  nameEn: string;
  brandId?: number;
  brandNameAr?: string;
  brandNameEn?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  discountPercentage?: number;
  finalPrice?: number;
  rating?: number;
  image: string;
  isRecommended?: boolean;
  isInWishlist?: boolean;
  brand: {
    primary: string;
    dark: string;
    light: string;
  };
}

export default function ProductCard({
  id,
  slugAr,
  slugEn,
  nameAr,
  nameEn,
  brandId,
  brandNameAr,
  brandNameEn,
  price,
  originalPrice,
  discount,
  discountPercentage,
  finalPrice,
  rating = 0,
  image,
  isRecommended = false,
  isInWishlist = false,
  brand,
}: ProductCardProps) {
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === "en" || locale === "ar") ? locale : "ar";

  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  const [guestModalOpen, setGuestModalOpen] = useState(false);

  const [cardIsInWishlist, setCardIsInWishlist] = useState(isInWishlist);

  const fmt = new Intl.NumberFormat(
    lang === "ar" ? "ar-EG" : "en-EG",
    { style: "currency", currency: "EGP", maximumFractionDigits: 0 }
  );
  const hasDiscount = (discountPercentage ?? 0) > 0;
  const displayPrice = finalPrice ?? price;
  const priceFmt = fmt.format(displayPrice);
  const originalPriceFmt = fmt.format(originalPrice ?? price);

  const productUrl = getLocalizedPath(
    `/product/${lang === "ar" ? (slugAr ?? id) : (slugEn ?? id)}`,
    lang
  );

  const borderStyle = isRecommended
    ? { border: `2px solid ${brand.primary}` }
    : cardIsInWishlist
    ? { border: "2px solid #ef4444" }
    : {};

  return (
    <div
      className="flex flex-col rounded-2xl bg-white overflow-hidden shadow-lg"
      style={borderStyle}
    >
      {/* Product image */}
      <div className="relative h-36 sm:h-56">
        <Link href={productUrl} className="block w-full h-full">
          {image ? (
            <Image
              src={image}
              alt={lang === "ar" ? nameAr : nameEn}
              fill
              className="object-contain"
              loading="lazy"
            />
          ) : null}
        </Link>

        {isRecommended && (
          <div
            className="absolute top-2 end-2 flex items-center gap-1 text-white text-xs font-bold px-2 py-1 rounded-full shadow"
            style={{ backgroundColor: brand.primary }}
          >
            <Sparkles className="w-3 h-3" />
            <span>{lang === "ar" ? "موصى به" : "Recommended"}</span>
          </div>
        )}

        {!isRecommended && hasDiscount && (
          <div className="absolute top-2 end-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
            -{discountPercentage}%
          </div>
        )}

        {/* Wishlist button — always visible, top-start */}
        <WishlistButton
          variant="card"
          productId={id}
          isInWishlist={isInWishlist}
          brand={brand}
          lang={lang}
          onStateChange={setCardIsInWishlist}
        />
      </div>

      <div className="p-2 sm:p-3 flex flex-col flex-1">
        {/* Brand name */}
        {(brandNameAr || brandNameEn) && (
          brandId ? (
            <Link
              href={getLocalizedPath(`/catalog?brandIds=${brandId}`, lang)}
              className="text-xs lg:text-base font-semibold lg:font-bold mb-0.5"
              style={{ color: brand.primary }}
            >
              {lang === "ar" ? brandNameAr : brandNameEn}
            </Link>
          ) : (
            <div className="text-xs mb-0.5" style={{ color: brand.primary }}>
              {lang === "ar" ? brandNameAr : brandNameEn}
            </div>
          )
        )}

        {/* Name */}
        <div className="flex-1 min-w-0">
          <Link href={productUrl} className="text-xs lg:text-base font-bold line-clamp-2">
            {lang === "ar" ? nameAr : nameEn}
          </Link>
        </div>

        {/* Stars + price + cart */}
        <div className="mt-auto pt-2">
          {/* Stars */}
          <div className="flex items-center gap-1 text-amber-500 mb-1">
            {rating ? (
              <>
                <Star className="w-4 h-4 fill-current" />
                <span className="ms-1 text-xs text-neutral-600">{rating}</span>
              </>
            ) : null}
          </div>

          <div className="flex justify-between items-center gap-1">
            {/* Price */}
            <div className="flex flex-col">
              <div className="text-sm lg:text-base font-bold">{priceFmt}</div>
              {hasDiscount && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-neutral-400 line-through">{originalPriceFmt}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              {!isAuthenticated && (
                <button
                  onClick={() => setGuestModalOpen(true)}
                  aria-label={lang === "ar" ? "اطلب كضيف" : "Order as guest"}
                  className="rounded text-white md:px-3 md:py-2 px-2 py-1 hover:opacity-90 transition-opacity bg-brand-terracotta text-xs font-semibold"
                  
                >
                  {/* <CreditCard className="w-4 h-4" /> */}
                  {/* <ShoppingBag className="w-4 h-4" /> */}
                  {lang === "ar" ? "شراء" : "buy"}
                </button>
              )}

              <AddToCartButton
                variant="card"
                productId={id}
                brand={brand}
                lang={lang}
              />
            </div>
          </div>
        </div>
      </div>

      {guestModalOpen && (
        <GuestOrderModal
          productId={id}
          lang={lang}
          brand={brand}
          onClose={() => setGuestModalOpen(false)}
        />
      )}
    </div>
  );
}
