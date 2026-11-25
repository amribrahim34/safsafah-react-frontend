import type { Metadata } from 'next';
import React from 'react';
import FloatingCart from '@/components/appchrome/FloatingCart';
import { BRAND } from '@/content/brand';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { DR_ALTHEA_345_DATA } from './_data/drAlthea345Data';
import DrAltheaHero from './_components/DrAltheaHero';
import DrAltheaHighlights from './_components/DrAltheaHighlights';
import DrAltheaDescription from './_components/DrAltheaDescription';
import DrAltheaComparison from './_components/DrAltheaComparison';
import DrAltheaFAQ from './_components/DrAltheaFAQ';
import DrAltheaOrderSection from './_components/DrAltheaOrderSection';
import DrAltheaSimilarProducts from './_components/DrAltheaSimilarProducts';
import DrAltheaStickyBar from './_components/DrAltheaStickyBar';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const LANDING_PATH = '/landing/dr-althea-345-relief-cream';

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const product = DR_ALTHEA_345_DATA;

  const title = isAr
    ? 'كريم دكتور ألثيا 345 ريليف الأصلي لتهدئة وترميم البشرة 50 مل | صفصافة مصر'
    : 'Dr. Althea 345 Relief Cream 50ml — Barrier & Post-Acne Care | Safsafah Egypt';

  const description = isAr
    ? `تسوقي الآن ${product.nameAr} الأصلي من صفصافة بسعر ${product.price} جنيه فقط (بدلاً من ${product.originalPrice} جنيه بخصم ${product.discountPercentage}٪). تركيبة 3-4-5 الكورية بالنياسيناميد والسنتيلا والسيراميد NP لعلاج آثار الحبوب وتهدئة الاحمرار وترميم حاجز البشرة. توصيل خلال 72 ساعة والدفع عند الاستلام.`
    : `Shop 100% authentic ${product.nameEn} at Safsafah Egypt — only ${product.price} EGP (was ${product.originalPrice} EGP, save ${product.discountPercentage}%). Vegan fragrance-free 3-4-5 gel-cream with Niacinamide, Resveratrol, Centella & Ceramide NP for post-acne marks and barrier repair. Fast 72h delivery & Cash on Delivery.`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://safsafah.com';
  const canonicalUrl = `${siteUrl}/${locale}${LANDING_PATH}`;
  const mainImage = `${siteUrl}${product.images[0]?.src || '/products/dr-althea-345/main.jpg'}`;

  return {
    title,
    description,
    keywords: isAr
      ? [
          'دكتور ألثيا 345',
          'كريم دكتور ألثيا 345 ريليف',
          'سعر كريم دكتور ألثيا 345 في مصر',
          'كريم 345 لعلاج آثار الحبوب',
          'كريم ترميم حاجز البشرة الكوري',
          'dr althea 345 relief cream egypt',
          'صفصافة دكتور ألثيا',
          'مرطب للبشرة الحساسة والمعرضة للحبوب',
        ]
      : [
          'dr althea 345 relief cream',
          'dr althea 345 relief cream 50ml egypt',
          'dr althea 345 price egypt',
          'post acne barrier repair cream egypt',
          'korean soothing gel cream oily skin',
          'safsafah dr althea 345',
          'vegan fragrance free barrier cream',
        ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ar-EG': `${siteUrl}/ar${LANDING_PATH}`,
        'en-EG': `${siteUrl}/en${LANDING_PATH}`,
        'x-default': `${siteUrl}/ar${LANDING_PATH}`,
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
    other: {
      'geo.region': 'EG',
      'geo.placename': 'Egypt',
      'geo.position': '26.8206;30.8025',
      ICBM: '26.8206, 30.8025',
      'product:price:amount': String(product.price),
      'product:price:currency': 'EGP',
      'product:availability': 'in stock',
    },
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function DrAlthea345LandingPage({ params }: PageProps) {
  const { locale } = await params;
  const lang = locale === 'ar' ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const product = DR_ALTHEA_345_DATA;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://safsafah.com';
  const pageUrl = `${siteUrl}/${lang}${LANDING_PATH}`;

  // ── 1. Product JSON-LD Schema ──
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: isAr ? product.nameAr : product.nameEn,
    description: isAr ? product.taglineAr : product.taglineEn,
    image: product.images.map((img) => `${siteUrl}${img.src}`),
    sku: `DR-ALTHEA-345-${product.id}`,
    mpn: 'DRA-345-RELIEF-50ML',
    brand: {
      '@type': 'Brand',
      name: 'Dr. Althea',
    },
    offers: {
      '@type': 'Offer',
      url: pageUrl,
      priceCurrency: 'EGP',
      price: product.price,
      priceValidUntil: `${new Date().getFullYear()}-12-31`,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Safsafah',
        url: siteUrl,
      },
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
          value: '50',
          currency: 'EGP',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'EG',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY',
          },
        },
      },
    },
  };

  // ── 2. BreadcrumbList Schema ──
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
        name: isAr ? 'دكتور ألثيا كريم 345 ريليف' : 'Dr. Althea 345 Relief Cream',
        item: pageUrl,
      },
    ],
  };

  // ── 3. FAQPage Schema ──
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

  // ── 4. Organization Schema ──
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: 'Safsafah',
    alternateName: 'صفصافة',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/safsafah-logo1.png`,
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
      label: isAr ? 'دكتور ألثيا 345 ريليف (50 مل)' : 'Dr. Althea 345 Relief 50ml',
      href: `/${lang}${LANDING_PATH}`,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* ── Structured Data injection ── */}
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

        {/* 1. Hero Section (Image Gallery + Conversion Panel) */}
        <DrAltheaHero product={product} lang={lang} />

        {/* 2. Key Science Pillars & Proof Highlights */}
        <DrAltheaHighlights lang={lang} />

        {/* 3. In-Depth Description, 3-4-5 Actives & Skin Profile Selector */}
        <DrAltheaDescription product={product} lang={lang} />

        {/* 4. Comparison Table */}
        <DrAltheaComparison lang={lang} />

        {/* 5. Frequently Asked Questions */}
        <DrAltheaFAQ faqs={product.faqs} lang={lang} />

        {/* 6. Express Cash on Delivery Order Form */}
        <DrAltheaOrderSection product={product} lang={lang} />

        {/* 7. Similar Products Grid */}
        <DrAltheaSimilarProducts lang={lang} currentProductId={product.id} />

        {/* 8. Mobile Floating Bottom Bar */}
        <DrAltheaStickyBar product={product} lang={lang} />
      </main>

      <FloatingCart brand={BRAND} />
    </div>
  );
}

// Generate static params for supported locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
