import type { Metadata } from 'next';
import { buildAlternates, NOINDEX_ROBOTS } from '@/lib/seo';
import BlogClient from './_components/BlogClient';

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const hasFilters = Object.keys(resolvedSearchParams).length > 0;
  const isAr = locale === 'ar';

  const title = isAr ? 'مدونة صفصافه' : 'Safsafah Journal';
  const description = isAr
    ? 'اكتشفي أحدث مقالات العناية بالبشرة والجمال من مدونة صفصافه. نصائح خبراء وروتينات مختارة بعناية.'
    : 'Discover the latest skincare and beauty articles from Safsafah Journal. Expert tips and curated routines.';

  if (hasFilters) {
    return {
      title,
      description,
      robots: NOINDEX_ROBOTS,
    };
  }

  return {
    title,
    description,
    alternates: buildAlternates(locale, '/blog'),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function BlogPage() {
  return <BlogClient />;
}
