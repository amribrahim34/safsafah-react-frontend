import type { Metadata } from "next";
import enHome from "@/locales/en/home.json";
import arHome from "@/locales/ar/home.json";
import { BRAND } from "@/content/brand";
import { productsService } from "@/lib/api/services/products.service";
import type { Language } from "@/types/models/common";
import type { BrandColors } from "@/types/models/brand";
import type { LocalReview } from "./types";


// Page-scoped components
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductDescription from "./_components/ProductDescription";
import ProductHero from "./_components/ProductHero";
import ProductJsonLd from "./_components/ProductJsonLd";
import ProductPageClient from "./_components/ProductPageClient";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  try {
    const product = await productsService.getProductBySlug(slug);
    if (!product) return {};
    const rawTitle = locale === "ar" ? product.nameAr : product.nameEn;
    const title = rawTitle ? rawTitle.slice(0, 60) : undefined;

    const fallbackDesc = locale === "ar"
      ? `تسوقي ${title || 'هذا المنتج'} من صفصافه. أفضل منتجات العناية والجمال.`
      : `Shop ${title || 'this product'} at Safsafah. Premium beauty and skincare products.`;

    const rawDesc = locale === "ar" ? product.descriptionAr : product.descriptionEn;
    const cleanDesc = rawDesc ? rawDesc.replace(/<[^>]*>?/gm, '').trim().slice(0, 155) : "";
    const description = cleanDesc || fallbackDesc;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://safsafah.com";
    const productUrl = `${siteUrl}/${locale}/product/${slug}`;
    const imageUrl = product.image ?? "";

    return {
      title: title ?? undefined,
      description: description ?? undefined,
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-snippet": -1,
          "max-image-preview": "large",
          "max-video-preview": -1,
        },
      },
      twitter: {
        card: "summary_large_image",
        title: title ?? undefined,
        description: description ?? undefined,
        images: imageUrl ? [imageUrl] : [],
      },
      openGraph: {
        type: "website",
        title: title ?? undefined,
        description: description ?? undefined,
        siteName: locale === "ar" ? "Safsafah | صفصافه" : "Safsafah",
        locale: locale === "ar" ? "ar_EG" : "en_US",
        url: productUrl,
        images: imageUrl
          ? [
              {
                url: imageUrl,
                width: 1024,
                height: 1024,
                alt: title ?? "Product Image",
              },
            ]
          : [],
        ...(product.updatedAt ? { modifiedTime: product.updatedAt } : {}),
      },
    };
  } catch {
    return {};
  }
}

// ─── Error fallback ────────────────────────────────────────────────────────────
function ErrorState({
  lang,
  error,
}: {
  lang: Language;
  brand: BrandColors;
  error?: string | null;
}) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
       <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-xl text-red-600">
          {lang === "ar" ? "فشل تحميل المنتج" : "Failed to load product"}
        </div>
        {error && <div className="text-sm text-neutral-600 mt-2">{error}</div>}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const lang = (locale === "en" ? "en" : "ar") as Language;
  const homeT = lang === 'ar' ? arHome : enHome;

  let product;
  try {
    product = await productsService.getProductBySlug(slug);
  } catch {
    return <ErrorState lang={lang} brand={BRAND} error={null} />;
  }

  if (!product) {
    return <ErrorState lang={lang} brand={BRAND} error={null} />;
  }

  let reviews: LocalReview[] = [];
  try {
    const res = await productsService.getProductReviews(product.id);
    const raw = res as unknown as LocalReview[] | { data: LocalReview[] };
    reviews = Array.isArray(raw) ? raw : (raw.data ?? []);
  } catch {
    reviews = [];
  }

  const productName = lang === "ar" ? product.nameAr : product.nameEn;
  const categoryName = lang === "ar" ? product.category?.nameAr : product.category?.nameEn;
  const breadcrumbItems = [
    { label: lang === "ar" ? "الرئيسية" : "Home", href: `/${locale}` },
    { label: lang === "ar" ? "المتجر" : "Shop", href: `/${locale}/catalog` },
    ...(product.category
      ? [
          {
            label: categoryName ?? "",
            href: `/${locale}/catalog?categoryIds=${product.category.id}`,
          },
        ]
      : []),
    { label: productName ?? "" },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Structured data for Google rich results (price, stock, rating) */}
      <ProductJsonLd product={product} locale={locale} slug={slug} />

      <Breadcrumbs items={breadcrumbItems} locale={locale} />

      {/* Server-rendered hero — h1, price, badges in initial HTML for SEO */}
      <ProductHero product={product} brand={BRAND} lang={lang} reviews={reviews} />

      <ProductDescription
        descriptionAr={product.descriptionAr}
        descriptionEn={product.descriptionEn}
        lang={lang}
      />

      {/* Client chrome — analytics, reviews toggle, sticky bar, modals */}
      <ProductPageClient product={product} reviews={reviews} brand={BRAND} lang={lang} />

    </div>
  );
}
