import type { Metadata } from 'next';
import React from 'react';
import FloatingCart from '@/components/appchrome/FloatingCart';
import { BRAND } from '@/content/brand';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { TETRA_GLOW_DATA } from './_data/tetraGlowData';
import TetraGlowHero from './_components/TetraGlowHero';
import TetraGlowHighlights from './_components/TetraGlowHighlights';
import TetraGlowDescription from './_components/TetraGlowDescription';
import TetraGlowComparison from './_components/TetraGlowComparison';
import TetraGlowTestimonials from './_components/TetraGlowTestimonials';
import TetraGlowFAQ from './_components/TetraGlowFAQ';
import TetraGlowOrderSection from './_components/TetraGlowOrderSection';
import TetraGlowStickyBar from './_components/TetraGlowStickyBar';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const product = TETRA_GLOW_DATA;

  const title = isAr
    ? `${product.nameAr} | صفصافة`
    : `${product.nameEn} | Safsafah`;

  const description = isAr
    ? `تسوقي الآن ${product.nameAr} من صفصافة بأفضل سعر في مصر. تركيبة رباعية الفعالية لتفتيح وتوحيد لون المناطق الحساسة والبكيني والإبطين بأمان ونعومة فائقة.`
    : `Shop ${product.nameEn} online at Safsafah Egypt. Quad-action dermatological formula to safely brighten and unify delicate intimate zones and underarms.`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://safsafah.com';
  const canonicalUrl = `${siteUrl}/${locale}/landing/tetra-glow`;
  const mainImage = `${siteUrl}${product.images[0]?.src || '/products/tetra-glow/main.jpg'}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ar-EG': `${siteUrl}/ar/landing/tetra-glow`,
        'en-EG': `${siteUrl}/en/landing/tetra-glow`,
        'x-default': `${siteUrl}/ar/landing/tetra-glow`,
      },
    },
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: isAr ? 'صفصافة | Safsafah' : 'Safsafah',
      locale: isAr ? 'ar_EG' : 'en_US',
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 1200,
          alt: isAr ? product.nameAr : product.nameEn,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [mainImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TetraGlowLandingPage({ params }: PageProps) {
  const { locale } = await params;
  const lang = locale === 'en' || locale === 'ar' ? locale : 'ar';
  const isAr = lang === 'ar';
  const product = TETRA_GLOW_DATA;

  // JSON-LD Structured Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: isAr ? product.nameAr : product.nameEn,
    image: product.images.map((img) => img.src),
    description: isAr ? product.taglineAr : product.taglineEn,
    sku: `TETRA-GLOW-50G`,
    brand: {
      '@type': 'Brand',
      name: 'Tetra Glow',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EGP',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Safsafah',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.ratingCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  const breadcrumbItems = [
    { label: isAr ? 'الرئيسية' : 'Home', href: `/${lang}` },
    { label: isAr ? 'العناية بالبشرة' : 'Skincare', href: `/${lang}/catalog` },
    {
      label: isAr ? 'تفتيح المناطق الحساسة' : 'Sensitive Zone Care',
      href: `/${lang}/landing/tetra-glow`,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Breadcrumbs Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <Breadcrumbs items={breadcrumbItems} locale={lang} />
        </div>

        {/* 1. Hero Section (Image Gallery + Buy / Conversion Panel) */}
        <TetraGlowHero product={product} lang={lang} />

        {/* 2. Key Pillars & Clinical Proof Highlights */}
        <TetraGlowHighlights lang={lang} />

        {/* 3. In-Depth Product Description, Ingredients, & Application Areas */}
        <TetraGlowDescription product={product} lang={lang} />

        {/* 4. Comparison Table (Tetra Glow vs. Ordinary Bleaches) */}
        <TetraGlowComparison lang={lang} />

        {/* 5. Customer Testimonials & Reviews */}
        <TetraGlowTestimonials reviews={product.reviews} lang={lang} />

        {/* 6. Frequently Asked Questions */}
        <TetraGlowFAQ faqs={product.faqs} lang={lang} />

        {/* 7. Express Cash on Delivery Order Form */}
        <TetraGlowOrderSection product={product} lang={lang} />

        {/* 8. Mobile Floating Bottom Bar */}
        <TetraGlowStickyBar product={product} lang={lang} />
      </main>

      <FloatingCart brand={BRAND} />
    </div>
  );
}

// Generate static params for supported locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
