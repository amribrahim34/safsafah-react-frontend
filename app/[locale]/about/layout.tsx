import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'عن صفصافه' : 'About Safsafah',
    description: isAr
      ? 'تعرفي على قصة صفصافه وكيف نختار أفضل منتجات العناية والجمال في مصر.'
      : 'Learn about Safsafah and how we curate the best beauty and skincare products in Egypt.',
    alternates: buildAlternates(locale, '/about'),
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
