import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import BottomTabs from '@/components/appchrome/BottomTabs';

const inter = Inter({ subsets: ['latin'] });

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

export default function LocaleLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
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
