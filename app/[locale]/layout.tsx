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
  const { locale } = await params;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  
  return (
    <html lang={locale} dir={dir}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

// Generate static params for known locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ar' },
  ];
}
