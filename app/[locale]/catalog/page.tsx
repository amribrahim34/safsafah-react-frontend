import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildAlternates, NOINDEX_ROBOTS } from '@/lib/seo';
import CatalogClient from './_components/CatalogClient';
import { validateCatalogRequest, type RawSearchParams } from './_lib/validateCatalogParams';

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<RawSearchParams>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const hasFilters = Object.keys(resolvedSearchParams).length > 0;
  const isAr = locale === 'ar';

  const title = isAr ? 'تسوقي جميع المنتجات' : 'Shop All Products';
  const description = isAr
    ? 'تصفحي جميع منتجات العناية بالبشرة والتجميل من صفصافه. فلاتر متقدمة حسب النوع، الماركة، ونوع البشرة.'
    : 'Browse all skincare and beauty products at Safsafah. Advanced filters by category, brand, and skin type.';

  if (hasFilters) {
    const isValid = await validateCatalogRequest(JSON.stringify(resolvedSearchParams));
    if (!isValid) {
      notFound();
    }
    return {
      title,
      description,
      robots: NOINDEX_ROBOTS,
    };
  }

  return {
    title,
    description,
    alternates: buildAlternates(locale, '/catalog'),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  if (Object.keys(resolvedSearchParams).length > 0) {
    const isValid = await validateCatalogRequest(JSON.stringify(resolvedSearchParams));
    if (!isValid) {
      notFound();
    }
  }

  return <CatalogClient />;
}
