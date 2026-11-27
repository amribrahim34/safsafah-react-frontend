import type { Metadata } from 'next';
import React from 'react';
import FloatingCart from '@/components/appchrome/FloatingCart';
import { BRAND } from '@/content/brand';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { VICHY_NORMADERM_DATA } from './_data/vichyNormadermData';
import VichyNormadermHero from './_components/VichyNormadermHero';
import VichyNormadermHighlights from './_components/VichyNormadermHighlights';
import VichyNormadermDescription from './_components/VichyNormadermDescription';
import VichyNormadermFormulaStandards from './_components/VichyNormadermFormulaStandards';
import VichyNormadermComparison from './_components/VichyNormadermComparison';
import VichyNormadermTestimonials from './_components/VichyNormadermTestimonials';
import VichyNormadermFAQ from './_components/VichyNormadermFAQ';
import VichyNormadermOrderSection from './_components/VichyNormadermOrderSection';
import VichyNormadermSimilarProducts from './_components/VichyNormadermSimilarProducts';
import VichyNormadermStickyBar from './_components/VichyNormadermStickyBar';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const product = VICHY_NORMADERM_DATA;

  const title = isAr
    ? `${product.nameAr} | صفصافة`
    : `${product.nameEn} | Safsafah`;

  const description = isAr
    ? `تسوقي الآن ${product.nameAr} من صفصافة بأفضل سعر في مصر — ${product.price} جنيه فقط (بدلاً من ${product.originalPrice} جنيه بخصم ${product.discountPercentage}٪). جل منقي بقاعدة نباتية خالٍ من السلفات والصابون والكحول بدرجة حموضة 5.5 مع حمض الساليسيليك ومعادن الزنك والنحاس والبروبيوتيك. توصيل خلال 72 ساعة والدفع عند الاستلام.`
    : `Shop ${product.nameEn} at Safsafah Egypt — only ${product.price} EGP (was ${product.originalPrice} EGP, save ${product.discountPercentage}%). Sulfate-, soap- & alcohol-free purifying gel at physiological pH 5.5 with Salicylic Acid, Zinc & Copper minerals & Bifidus probiotic. Fast 72h delivery & Cash on Delivery.`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://safsafah.com';
  const canonicalUrl = `${siteUrl}/${locale}/landing/vichy-normaderm`;
  const mainImage = `${siteUrl}${product.images[0]?.src || '/products/vichy-normaderm/main.png'}`;
  const priceValidUntil = `${new Date().getFullYear()}-12-31`;

  return {
    title,
    description,
    keywords: isAr
      ? [
          'فيشي نورماديرم',
          'فيشي نورماديرم فيتوسوليوشن',
          'غسول فيشي للبشرة الدهنية',
          'غسول فيشي 200 مل',
          'غسول حب الشباب فيشي',
          'غسول ساليسيليك اسيد',
          'غسول خالي من السلفات',
          'غسول للرؤوس السوداء والمسام',
          'سعر غسول فيشي في مصر',
          'صفصافة غسول فيشي',
          'vichy normaderm egypt',
        ]
      : [
          'vichy normaderm',
          'normaderm phytosolution',
          'vichy normaderm daily purifying gel',
          'salicylic acid cleanser egypt',
          'sulfate free cleanser oily skin',
          'acne cleanser egypt',
          'vichy cleanser 200ml',
          'safsafah vichy normaderm',
          'oily skin face wash egypt',
        ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ar-EG': `${siteUrl}/ar/landing/vichy-normaderm`,
        'en-EG': `${siteUrl}/en/landing/vichy-normaderm`,
        'x-default': `${siteUrl}/ar/landing/vichy-normaderm`,
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
          type: 'image/png',
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
export default async function VichyNormadermLandingPage({ params }: PageProps) {
  const { locale } = await params;
  const lang = locale === 'ar' ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const product = VICHY_NORMADERM_DATA;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://safsafah.com';
  const pageUrl = `${siteUrl}/${lang}/landing/vichy-normaderm`;

  // ── 1. Product JSON-LD Schema (Google Rich Results / Merchant Listing) ──
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: isAr ? product.nameAr : product.nameEn,
    description: isAr ? product.taglineAr : product.taglineEn,
    image: product.images.map((img) => `${siteUrl}${img.src}`),
    sku: `VICHY-NORMADERM-${product.id}`,
    mpn: 'VICHY-NORM-200ML',
    brand: {
      '@type': 'Brand',
      name: 'Vichy Laboratoires',
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
        name: isAr ? 'غسول فيشي نورماديرم' : 'Vichy Normaderm Cleanser',
        item: pageUrl,
      },
    ],
  };

  // ── 3. FAQPage Schema (Drives Accordion Rich Snippets in SERPs) ──
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
      label: isAr ? 'فيشي نورماديرم 200مل' : 'Vichy Normaderm 200ml',
      href: `/${lang}/landing/vichy-normaderm`,
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
        <VichyNormadermHero product={product} lang={lang} />

        {/* 2. Official Vichy Clinical Results (Visual Gauges) */}
        <VichyNormadermHighlights lang={lang} />

        {/* 3. Product Overview, Visual Skin-Action Map & Application Routine */}
        <VichyNormadermDescription product={product} lang={lang} />

        {/* 4. Official Formula Purity, Target Zones & Full INCI List */}
        <VichyNormadermFormulaStandards lang={lang} />

        {/* 5. Comparison Table (Vichy vs. Ordinary Cleansers) */}
        <VichyNormadermComparison lang={lang} />

        {/* 6. Verified Customer Reviews (from Noon Egypt) */}
        <VichyNormadermTestimonials reviews={product.reviews} lang={lang} />

        {/* 7. Frequently Asked Questions (Accordion + JSON-LD) */}
        <VichyNormadermFAQ faqs={product.faqs} lang={lang} />

        {/* 7. Express Cash on Delivery Order Form */}
        <VichyNormadermOrderSection product={product} lang={lang} />

        {/* 8. Similar Products Grid with Link to Catalog */}
        <VichyNormadermSimilarProducts lang={lang} currentProductId={product.id} />

        {/* 9. Mobile Floating Bottom Bar */}
        <VichyNormadermStickyBar product={product} lang={lang} />
      </main>

      <FloatingCart brand={BRAND} />
    </div>
  );
}

// Generate static params for supported locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
