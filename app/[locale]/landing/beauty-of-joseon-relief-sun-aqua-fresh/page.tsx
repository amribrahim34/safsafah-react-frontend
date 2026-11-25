import type { Metadata } from 'next';
import React from 'react';
import FloatingCart from '@/components/appchrome/FloatingCart';
import { BRAND } from '@/content/brand';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { BOJ_AQUA_FRESH_DATA } from './_data/bojAquaFreshData';
import BojHero from './_components/BojHero';
import BojHighlights from './_components/BojHighlights';
import BojDescription from './_components/BojDescription';
import BojComparison from './_components/BojComparison';
import BojFAQ from './_components/BojFAQ';
import BojOrderSection from './_components/BojOrderSection';
import BojSimilarProducts from './_components/BojSimilarProducts';
import BojStickyBar from './_components/BojStickyBar';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const LANDING_PATH = '/landing/beauty-of-joseon-relief-sun-aqua-fresh';

// ─── Metadata (Senior SEO Specialist Configuration) ───────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const product = BOJ_AQUA_FRESH_DATA;

  const title = isAr
    ? 'واقي شمس بيوتي أوف جوسون أكوا فريش بالأرز وفيتامين B5 (50 مل) | صفصافة مصر'
    : 'Beauty of Joseon Relief Sun Aqua-fresh: Rice + B5 SPF50+ PA++++ 50ml | Safsafah Egypt';

  const description = isAr
    ? `اطلبي الآن واقي شمس بيوتي أوف جوسون أكوا فريش الأصلي في مصر بسعر ${product.price} جنيه فقط (بدلاً من ${product.originalPrice} جنيه بخصم ${product.discountPercentage}٪). تركيبة مائية خفيفة بـ 30٪ ماء بذور الأرز وفيتامين B5 لحماية SPF50+ PA++++ بدون أثر أبيض أو لمعان دهني. شحن 72 ساعة والدفع عند الاستلام.`
    : `Shop 100% authentic Beauty of Joseon Relief Sun Aqua-fresh: Rice + B5 SPF50+ PA++++ (50ml) at Safsafah Egypt — only ${product.price} EGP (was ${product.originalPrice} EGP, save ${product.discountPercentage}%). Featherlight watery Korean sunscreen with zero white cast for oily & acne-prone skin. Fast 72h delivery & Cash on Delivery.`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://safsafah.com';
  const canonicalUrl = `${siteUrl}/${locale}${LANDING_PATH}`;
  const mainImage = `${siteUrl}${product.images[0]?.src || '/products/boj-aqua-fresh/main.jpg'}`;

  return {
    title,
    description,
    keywords: isAr
      ? [
          'بيوتي أوف جوسون أكوا فريش',
          'واقي شمس بيوتي أوف جوسون الأزرق',
          'سعر واقي شمس بيوتي أوف جوسون في مصر',
          'بيوتي أوف جوسون ريليف صن أكوا فريش',
          'واقي شمس بالأرز وفيتامين B5',
          'أفضل واقي شمس للبشرة الدهنية في مصر',
          'صن بلوك كوري بدون أثر أبيض',
          'beauty of joseon relief sun aqua fresh egypt',
          'بيوتي أوف جوسون الأصلي صفصافة',
          'واقي شمس للبشرة المعرضة للحبوب',
        ]
      : [
          'beauty of joseon relief sun aqua fresh',
          'beauty of joseon aqua fresh price egypt',
          'beauty of joseon rice b5 sunscreen egypt',
          'korean sunscreen oily skin egypt',
          'zero white cast sunscreen spf50 pa++++',
          'beauty of joseon blue sunscreen',
          'safsafah beauty of joseon',
          'authentic k beauty sunscreen egypt',
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
export default async function BojAquaFreshLandingPage({ params }: PageProps) {
  const { locale } = await params;
  const lang = locale === 'ar' ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const product = BOJ_AQUA_FRESH_DATA;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://safsafah.com';
  const pageUrl = `${siteUrl}/${lang}${LANDING_PATH}`;

  // ── 1. Product JSON-LD Schema (Google Merchant Listing & Rich Snippets) ──
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: isAr ? product.nameAr : product.nameEn,
    description: isAr ? product.taglineAr : product.taglineEn,
    image: product.images.map((img) => `${siteUrl}${img.src}`),
    sku: `BOJ-AQUA-FRESH-${product.id}`,
    mpn: 'BOJ-RS-AQUA-50ML',
    brand: {
      '@type': 'Brand',
      name: 'Beauty of Joseon',
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
        name: isAr ? 'الوقاية من الشمس' : 'Sun Care',
        item: `${siteUrl}/${lang}/catalog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isAr ? 'بيوتي أوف جوسون أكوا فريش (50 مل)' : 'BOJ Relief Sun Aqua-fresh 50ml',
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
    { label: isAr ? 'الوقاية من الشمس' : 'Sun Care', href: `/${lang}/catalog` },
    {
      label: isAr ? 'بيوتي أوف جوسون أكوا فريش (50 مل)' : 'BOJ Relief Sun Aqua-fresh 50ml',
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
        <BojHero product={product} lang={lang} />

        {/* 2. Key Science Pillars & Proof Highlights */}
        <BojHighlights lang={lang} />

        {/* 3. In-Depth Description, Actives & Skin Profile Selector */}
        <BojDescription product={product} lang={lang} />

        {/* 4. Comparison Table (BOJ Aqua-fresh vs. Ordinary Sunscreens) */}
        <BojComparison lang={lang} />

        {/* 5. Frequently Asked Questions (Accordion + JSON-LD) */}
        <BojFAQ faqs={product.faqs} lang={lang} />

        {/* 6. Express Cash on Delivery Order Form */}
        <BojOrderSection product={product} lang={lang} />

        {/* 8. Similar Products Grid with Link to Catalog */}
        <BojSimilarProducts lang={lang} currentProductId={product.id} />

        {/* 9. Mobile Floating Bottom Bar */}
        <BojStickyBar product={product} lang={lang} />
      </main>

      <FloatingCart brand={BRAND} />
    </div>
  );
}

// Generate static params for supported locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
