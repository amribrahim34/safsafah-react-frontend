import type { Metadata } from "next";
import { BRAND } from "@/content/brand";
import { COPY } from "@/content/copy";
import { productsService } from "@/lib/api/services/products.service";
import type { Language } from "@/types/models/common";
import type { BrandColors } from "@/types/models/brand";
import type { LocalReview } from "./types";

// Shared site chrome
import PromoBar from "@/components/header/PromoBar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

// Page-scoped components
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
    const title = locale === "ar" ? product.nameAr : product.nameEn;
    const description =
      locale === "ar"
        ? product.descriptionAr?.slice(0, 160)
        : product.descriptionEn?.slice(0, 160);

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
  brand,
  error,
}: {
  lang: Language;
  brand: BrandColors;
  error?: string | null;
}) {
  const T = COPY[lang];
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} brand={brand} />
      <Header brand={brand} searchPlaceholder={T.search} />
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-xl text-red-600">
          {lang === "ar" ? "فشل تحميل المنتج" : "Failed to load product"}
        </div>
        {error && <div className="text-sm text-neutral-600 mt-2">{error}</div>}
      </div>
      <Footer brand={brand} />
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
  const T = COPY[lang];

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

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Structured data for Google rich results (price, stock, rating) */}
      <ProductJsonLd product={product} locale={locale} slug={slug} />

      <PromoBar text={T.promo} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} />

      {/* Server-rendered hero — h1, price, badges in initial HTML for SEO */}
      <ProductHero product={product} brand={BRAND} lang={lang} reviews={reviews} />

      <ProductDescription
        descriptionAr={product.descriptionAr}
        descriptionEn={product.descriptionEn}
        lang={lang}
      />

      {/* Client chrome — analytics, reviews toggle, sticky bar, modals */}
      <ProductPageClient product={product} reviews={reviews} brand={BRAND} lang={lang} />

      <Footer brand={BRAND} />
    </div>
  );
}
