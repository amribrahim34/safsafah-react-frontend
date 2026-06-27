import type { Product } from "@/types/models/product";

interface BuildProductJsonLdOptions {
  product: Product;
  locale: string;
  slug: string;
}

/**
 * Builds a schema.org/Product JSON-LD object.
 * Used by both generateMetadata (head injection) and ProductJsonLd (inline script).
 */
export function buildProductJsonLd({
  product,
  locale,
  slug,
}: BuildProductJsonLdOptions): Record<string, unknown> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://safsafah.com";
  const productUrl = `${siteUrl}/${locale}/product/${slug}`;

  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const description = locale === "ar" ? product.descriptionAr : product.descriptionEn;
  const categoryName =
    locale === "ar" ? product.category?.nameAr : product.category?.nameEn;

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
        image: product.image ? [product.image] : undefined,
        sku: product.sku ?? undefined,
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
          price: product.price,
          availability:
            product.inStock !== false
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
        },
        ...(product.averageRating && product.ratingCount
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.averageRating,
                reviewCount: product.ratingCount,
              },
            }
          : {}),
      },
      breadcrumb,
    ],
  };
}
