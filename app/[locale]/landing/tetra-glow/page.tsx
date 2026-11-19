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
import TetraGlowFAQ from './_components/TetraGlowFAQ';
import TetraGlowOrderSection from './_components/TetraGlowOrderSection';
import TetraGlowSimilarProducts from './_components/TetraGlowSimilarProducts';
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
    ? `تسوقي الآن ${product.nameAr} من صفصافة بأفضل سعر في مصر — ${product.price} جنيه فقط (بدلاً من ${product.originalPrice} جنيه). تركيبة رباعية الفعالية لتفتيح وتوحيد لون المناطق الحساسة والبكيني والإبطين بأمان ونعومة فائقة. شحن وتوصيل خلال 72 ساعة والدفع عند الاستلام في جميع محافظات مصر.`
    : `Shop ${product.nameEn} at Safsafah Egypt — only ${product.price} EGP (was ${product.originalPrice} EGP). Quad-action dermatological formula to safely brighten and unify delicate intimate zones and underarms. Fast 72-hour delivery & Cash on Delivery across all Egypt governorates.`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://safsafah.com';
  const canonicalUrl = `${siteUrl}/${locale}/landing/tetra-glow`;
  const mainImage = `${siteUrl}${product.images[0]?.src || '/products/tetra-glow/main.png'}`;

  // Price validity: set to end of current year as a rolling promotional window
  const priceValidUntil = `${new Date().getFullYear()}-12-31`;

  return {
    title,
    description,
    keywords: isAr
      ? [
          'تيترا جلو', 'كريم تفتيح المناطق الحساسة', 'تفتيح البكيني', 'تفتيح الإبطين',
          'تفتيح بين الفخذين', 'كريم تفتيح مصر', 'صفصافة', 'تيترا جلو 50 جم',
          'كريم تفتيح المناطق الحساسة بدون هيدروكينون', 'ترانيكساميك اسيد تفتيح',
        ]
      : [
          'tetra glow', 'sensitive zone whitening cream', 'bikini brightening cream egypt',
          'underarm whitening egypt', 'inner thigh brightening', 'safsafah egypt',
          'tetra glow 50g', 'hydroquinone free whitening cream egypt',
          'tranexamic acid brightening', 'lumiskin cream egypt',
        ],
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
      url: canonicalUrl,
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
          type: 'image/jpeg',
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
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // GEO tags (supported by some search engines and crawlers via <meta>)
    other: {
      // Geographic targeting — Egypt
      'geo.region': 'EG',
      'geo.placename': 'Egypt',
      'geo.position': '26.8206;30.8025',
      'ICBM': '26.8206, 30.8025',
      // Product price signals for search parsers (non-standard but harmless)
      'product:price:amount': String(product.price),
      'product:price:currency': 'EGP',
      'product:sale_price:amount': String(product.price),
      'product:original_price:amount': String(product.originalPrice),
      'product:availability': 'in stock',
      'product:condition': 'new',
      'product:price_valid_until': priceValidUntil,
    },
  };
}

export default async function TetraGlowLandingPage({ params }: PageProps) {
  const { locale } = await params;
  const lang = locale === 'en' || locale === 'ar' ? locale : 'ar';
  const isAr = lang === 'ar';
  const product = TETRA_GLOW_DATA;

  // ─── Structured Data / JSON-LD ───────────────────────────────────────────────
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://safsafah.com';
  const pageUrl = `${siteUrl}/${lang}/landing/tetra-glow`;
  // Price offer valid until end of this calendar year
  const priceValidUntil = `${new Date().getFullYear()}-12-31`;

  // 1. Product Schema — enables Google Shopping / rich results with price & rating
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${pageUrl}#product`,
    name: isAr ? product.nameAr : product.nameEn,
    description: isAr ? product.taglineAr : product.taglineEn,
    url: pageUrl,
    image: product.images.map((img) => `${siteUrl}${img.src}`),
    sku: 'TETRA-GLOW-50G',
    mpn: 'TG-50G-001',
    gtin14: '00000000000000', // Replace with real GTIN when available
    brand: {
      '@type': 'Brand',
      name: 'Tetra Glow',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Safsafah',
      url: siteUrl,
    },
    offers: {
      '@type': 'Offer',
      url: pageUrl,
      priceCurrency: 'EGP',
      price: product.price,
      priceValidUntil,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'EG',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 50,
          currency: 'EGP',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'EG',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY',
          },
        },
      },
      seller: {
        '@type': 'Organization',
        name: 'Safsafah',
        url: siteUrl,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.ratingCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: product.reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: isAr ? r.commentAr : r.commentEn,
      name: isAr ? r.titleAr : r.titleEn,
    })),
  };

  // 2. BreadcrumbList Schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isAr ? 'الرئيسية' : 'Home',
        item: `${siteUrl}/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isAr ? 'العناية بالبشرة' : 'Skincare',
        item: `${siteUrl}/${lang}/catalog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isAr ? 'تفتيح المناطق الحساسة' : 'Sensitive Zone Care',
        item: pageUrl,
      },
    ],
  };

  // 3. FAQPage Schema — drives "People also ask" accordion in SERPs
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faqs.map((faq) => ({
      '@type': 'Question',
      name: isAr ? faq.questionAr : faq.questionEn,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isAr ? faq.answerAr : faq.answerEn,
      },
    })),
  };

  // 4. Organization / WebSite Schema for brand authority
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: 'Safsafah',
    alternateName: 'صفصافة',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.png`,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: 'EG',
      availableLanguage: ['Arabic', 'English'],
    },
    areaServed: {
      '@type': 'Country',
      name: 'Egypt',
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
      {/* ── Structured Data injection (all schemas in one pass for performance) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
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

        {/* 6. Frequently Asked Questions */}
        <TetraGlowFAQ faqs={product.faqs} lang={lang} />

        {/* 7. Express Cash on Delivery Order Form */}
        <TetraGlowOrderSection product={product} lang={lang} />

        {/* 8. Similar Products Grid with Link to Catalog */}
        <TetraGlowSimilarProducts lang={lang} currentProductId={product.id} />

        {/* 9. Mobile Floating Bottom Bar */}
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
