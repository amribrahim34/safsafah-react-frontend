import type { Product } from "@/types/models/product";
import type { LocalReview } from "../types";

interface BuildProductJsonLdOptions {
  product: Product;
  locale: string;
  slug: string;
  /** Real reviews fetched for the product, used to emit review + rating data. */
  reviews?: LocalReview[];
}

/**
 * Builds a schema.org/Product JSON-LD object.
 * Used by both generateMetadata (head injection) and ProductJsonLd (inline script).
 */
export function buildProductJsonLd({
  product,
  locale,
  slug,
  reviews = [],
}: BuildProductJsonLdOptions): Record<string, unknown> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://safsafah.com";
  const productUrl = `${siteUrl}/${locale}/product/${slug}`;

  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const description = locale === "ar" ? product.descriptionAr : product.descriptionEn;
  const categoryName =
    locale === "ar" ? product.category?.nameAr : product.category?.nameEn;

  // ─── Reviews + rating ────────────────────────────────────────────────────
  // Google requires a POSITIVE ratingValue/reviewCount for AggregateRating —
  // emitting 0 turns a valid item into an error. So we resolve the real
  // counts and only attach the rating block when at least one rating exists.
  const ratedReviews = reviews.filter((r) => typeof r.rating === "number" && r.rating > 0);

  const ratingCount = product.ratingCount ?? ratedReviews.length;
  const averageRating =
    product.averageRating ??
    (ratedReviews.length
      ? ratedReviews.reduce((sum, r) => sum + r.rating, 0) / ratedReviews.length
      : 0);
  const hasRating = ratingCount > 0 && averageRating > 0;

  const reviewItems = ratedReviews.slice(0, 20).map((r) => ({
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      "@type": "Person",
      name: r.userName?.trim() || (locale === "ar" ? "عميل" : "Customer"),
    },
    ...(r.createdAt ? { datePublished: r.createdAt } : {}),
    ...(r.comment?.trim() ? { reviewBody: r.comment.trim() } : {}),
  }));

  // Prefer the full gallery; fall back to the single primary image.
  const images = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : undefined;

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "ar" ? "الرئيسية" : "Home",
        item: `${siteUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "ar" ? "المتجر" : "Shop",
        item: `${siteUrl}/${locale}/catalog`,
      },
      ...(product.category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: categoryName,
              item: `${siteUrl}/${locale}/catalog?categoryIds=${product.category.id}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: product.category ? 4 : 3,
        name,
        item: productUrl,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: name ?? undefined,
        description: description ?? undefined,
        image: images,
        sku: product.sku ?? undefined,
        ...(categoryName ? { category: categoryName } : {}),
        brand: product.brand
          ? {
              "@type": "Brand",
              name:
                locale === "ar" ? product.brand.nameAr : product.brand.nameEn,
            }
          : undefined,
        offers: {
          "@type": "Offer",
          url: productUrl,
          priceCurrency: "EGP",
          price: product.finalPrice ?? product.price,
          availability:
            product.inStock !== false
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
        },
        ...(hasRating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: Number(averageRating.toFixed(1)),
                reviewCount: ratingCount,
                bestRating: 5,
                worstRating: 1,
              },
            }
          : {}),
        ...(reviewItems.length ? { review: reviewItems } : {}),
      },
      breadcrumb,
    ],
  };
}
