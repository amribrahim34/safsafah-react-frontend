import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SAFSAFAH - Premium Skincare & Beauty',
  description: 'Discover premium skincare and beauty products',
};

type LayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  // Locale layout should not have html/body tags
  // Those belong only in the root layout
  return <>{children}</>;
}

// Generate static params for known locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ar' },
  ];
}
