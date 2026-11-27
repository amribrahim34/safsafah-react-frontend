import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import BottomTabs from '@/components/appchrome/BottomTabs';
import Footer from '@/components/footer/Footer';
import { BRAND } from '@/content/brand';
import PromoBar from '@/components/header/PromoBar';
import Header from '@/components/header/Header';
import { getSettingsServer } from '@/lib/api/server';
import { buildOrganizationJsonLd } from '@/lib/seo';
const inter = Inter({ subsets: ['latin'] });

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://safsafah.com';

const metadataByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Safsafah | Premium Cosmetics & Skincare',
    description:
      'Discover Safsafah – your destination for premium cosmetics and skincare products. Shop trusted brands, expert-curated routines, and the latest beauty essentials. Enjoy fast delivery and exclusive deals every day.',
  },
  ar: {
    title: 'صفصافه | مستحضرات التجميل والعناية بالبشرة',
    description:
      'اكتشفي صفصافه – وجهتك المثالية لأفضل مستحضرات التجميل والعناية بالبشرة. تسوّقي من أشهر الماركات، وروتينات العناية المختارة بعناية، وأحدث منتجات الجمال. استمتعي بتوصيل سريع وعروض حصرية يومية.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = metadataByLocale[locale] ?? metadataByLocale['en'];
  const brandSuffix = locale === 'ar' ? 'صفصافه' : 'Safsafah';

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      template: `%s | ${brandSuffix}`,
      default: meta.title,
    },
    description: meta.description,
  };
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({ children }: LayoutProps) {
  const settings = await getSettingsServer();
  const organizationJsonLd = buildOrganizationJsonLd(settings);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <PromoBar  />
      <Header brand={BRAND} />
      {children}
      <Footer brand={BRAND} settings={settings} />
      <BottomTabs />
    </>
  );
}

// Generate static params for known locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ar' },
  ];
}
