import type { Metadata } from 'next';
import React from 'react';
import FloatingCart from '@/components/appchrome/FloatingCart';
import { BRAND } from '@/content/brand';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { CICAPLAST_DATA } from './_data/cicaplastData';
import CicaplastHero from './_components/CicaplastHero';
import CicaplastHighlights from './_components/CicaplastHighlights';
import CicaplastDescription from './_components/CicaplastDescription';
import CicaplastComparison from './_components/CicaplastComparison';
import CicaplastFAQ from './_components/CicaplastFAQ';
import CicaplastOrderSection from './_components/CicaplastOrderSection';
import CicaplastSimilarProducts from './_components/CicaplastSimilarProducts';
import CicaplastStickyBar from './_components/CicaplastStickyBar';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const product = CICAPLAST_DATA;

  const title = isAr
    ? `${product.nameAr} | صفصافة`
    : `${product.nameEn} | Safsafah`;

  const description = isAr
    ? `تسوقي الآن ${product.nameAr} من صفصافة بأفضل سعر في مصر — ${product.price} جنيه فقط (بدلاً من ${product.originalPrice} جنيه بخصم ${product.discountPercentage}٪). بلسم مرمم فائق بالبانثينول 5٪ وتريبيوما وماديكاسوسايد لعلاج الجفاف والتهيج والتشققات للوجه والجسم والشفاه. شحن 72 ساعة والدفع عند الاستلام.`
    : `Shop ${product.nameEn} at Safsafah Egypt — only ${product.price} EGP (was ${product.originalPrice} EGP, save ${product.discountPercentage}%). Dermatological ultra-repairing multi-purpose balm with 5% Panthenol, Madecassoside & Tribioma for irritated skin, face, body & lips. Fast 72h delivery & Cash on Delivery.`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://safsafah.com';
  const canonicalUrl = `${siteUrl}/${locale}/landing/cicaplast-baume-b5`;
  const mainImage = `${siteUrl}${product.images[0]?.src || '/products/cicaplast-b5/main.jpg'}`;

  return {
    title,
    description,
    keywords: isAr
      ? [
          'لاروش بوزيه سيكابلاست',
          'سيكابلاست بوم b5',
          'سيكابلاست بوم b5 بلس',
          'كريم سيكابلاست للوجه',
          'سيكابلاست للشفاه والجسم',
          'مرمم حاجز البشرة',
          'كريم لاروش بوزيه للترميم',
          'سعر سيكابلاست 100 مل في مصر',
          'صفصافة لاروش بوزيه',
          'cicaplast baume b5 egypt',
          'كريم لعلاج حروق الليزر والتقشير',
          'كريم تسلخات الرضع سيكابلاست',
        ]
      : [
          'cicaplast baume b5+',
          'la roche posay cicaplast egypt',
          'cicaplast baume b5 100ml price egypt',
          'barrier repair balm egypt',
          'soothing multi purpose balm',
          'madecassoside panthenol cream',
          'safsafah cicaplast',
          'cicaplast for babies diaper rash',
          'post laser soothing balm egypt',
        ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ar-EG': `${siteUrl}/ar/landing/cicaplast-baume-b5`,
        'en-EG': `${siteUrl}/en/landing/cicaplast-baume-b5`,
        'x-default': `${siteUrl}/ar/landing/cicaplast-baume-b5`,
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
      'ICBM': '26.8206, 30.8025',
      'product:price:amount': String(product.price),
      'product:price:currency': 'EGP',
      'product:availability': 'in stock',
    },
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function CicaplastLandingPage({ params }: PageProps) {
  const { locale } = await params;
  const lang = locale === 'ar' ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const product = CICAPLAST_DATA;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://safsafah.com';
  const pageUrl = `${siteUrl}/${lang}/landing/cicaplast-baume-b5`;

  // ── 1. Product JSON-LD Schema (Merchant Listing & Product Rich Snippet) ──
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: isAr ? product.nameAr : product.nameEn,
    description: isAr ? product.taglineAr : product.taglineEn,
    image: product.images.map((img) => `${siteUrl}${img.src}`),
    sku: `LRP-CICAPLAST-${product.id}`,
    mpn: 'LRP-CICA-B5PLUS-100ML',
    brand: {
      '@type': 'Brand',
      name: 'La Roche-Posay',
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
          value: '0',
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
        name: isAr ? 'سيكابلاست بوم +B5' : 'Cicaplast Baume B5+',
        item: pageUrl,
      },
    ],
  };

  // ── 3. FAQPage Schema (Google Rich Snippet Accordions) ──
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

  const breadcrumbItems = [
    { label: isAr ? 'الرئيسية' : 'Home', href: `/${lang}` },
    { label: isAr ? 'العناية بالبشرة' : 'Skincare', href: `/${lang}/catalog` },
    {
      label: isAr ? 'سيكابلاست بوم +B5 (100 مل)' : 'Cicaplast Baume B5+ 100ml',
      href: `/${lang}/landing/cicaplast-baume-b5`,
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

      <main className="min-h-screen bg-white">
        {/* Breadcrumbs Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <Breadcrumbs items={breadcrumbItems} locale={lang} />
        </div>

        {/* 1. Hero Section (Image Gallery + Buy / Conversion Panel) */}
        <CicaplastHero product={product} lang={lang} />

        {/* 2. Key Science Pillars & Proof Highlights */}
        <CicaplastHighlights lang={lang} />

        {/* 3. In-Depth Product Description, Active Ingredients & Application Areas */}
        <CicaplastDescription product={product} lang={lang} />

        {/* 4. Comparison Table (Cicaplast vs. Ordinary Creams) */}
        <CicaplastComparison lang={lang} />

        {/* 6. Frequently Asked Questions (Accordion + JSON-LD) */}
        <CicaplastFAQ faqs={product.faqs} lang={lang} />

        {/* 7. Express Cash on Delivery Order Form */}
        <CicaplastOrderSection product={product} lang={lang} />

        {/* 8. Similar Products Grid with Link to Catalog */}
        <CicaplastSimilarProducts lang={lang} currentProductId={product.id} />

        {/* 9. Mobile Floating Bottom Bar */}
        <CicaplastStickyBar product={product} lang={lang} />
      </main>

      <FloatingCart brand={BRAND} />
    </div>
  );
}

// Generate static params for supported locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
