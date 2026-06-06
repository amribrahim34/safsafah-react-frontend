import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import enBlog from '@/locales/en/blog.json';
import arBlog from '@/locales/ar/blog.json';
import { blogService } from '@/lib/api/services/blog.service';
import { productsService } from '@/lib/api/services/products.service';
import type { BlogPost } from '@/types/models/blog';
import type { Product } from '@/types/models/product';
import { parseToc } from './_lib/parseToc';
import { preprocessHtml } from './_lib/preprocessHtml';
import BlogPostJsonLd from './_components/BlogPostJsonLd';
import BlogPostBreadcrumb from './_components/BlogPostBreadcrumb';
import BlogPostHero from './_components/BlogPostHero';
import BlogPostContent from './_components/BlogPostContent';
import BlogPostSidebar from './_components/BlogPostSidebar';
import BlogPostTocClient from './_components/BlogPostTocClient';
import BlogPostShareButtons from './_components/BlogPostShareButtons';
import BlogPostRelatedPosts from './_components/BlogPostRelatedPosts';

// ─── Types ────────────────────────────────────────────────────────────────────
type PageParams = Promise<{ slug: string; locale: string }>;

function makeT(locale: string) {
  const dict = locale === 'ar' ? arBlog : enBlog;
  return (key: string): string =>
    (dict as Record<string, string>)[key] ?? key;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug, locale } = await params;
  try {
    const post = await blogService.getBlogPostBySlug(slug);
    if (!post) return {};

    const title = (locale === 'ar' ? post.titleAr : post.titleEn)?.slice(0, 60);
    const rawDesc = (locale === 'ar' ? post.excerptAr : post.excerptEn) ?? '';
    const description = rawDesc.replace(/<[^>]*>/g, '').trim().slice(0, 155) || undefined;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://safsafah.com';
    const articleUrl = `${siteUrl}/${locale}/blog/${slug}`;
    const categoryName = locale === 'ar' ? post.category.nameAr : post.category.nameEn;

    return {
      title: title ?? undefined,
      description,
      alternates: { canonical: articleUrl },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
        },
      },
      openGraph: {
        type: 'article',
        title: title ?? undefined,
        description,
        url: articleUrl,
        siteName: locale === 'ar' ? 'Safsafah | صفصافه' : 'Safsafah',
        locale: locale === 'ar' ? 'ar_EG' : 'en_US',
        images: post.image
          ? [{ url: post.image, width: 1200, height: 630, alt: title ?? '' }]
          : [],
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        authors: [siteUrl],
        section: categoryName,
      },
      twitter: {
        card: 'summary_large_image',
        title: title ?? undefined,
        description,
        images: post.image ? [post.image] : [],
      },
    };
  } catch {
    return {};
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: { params: PageParams }) {
  const { slug, locale } = await params;
  const t = makeT(locale);
  const isRTL = locale === 'ar';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://safsafah.com';
  const articleUrl = `${siteUrl}/${locale}/blog/${slug}`;

  // Fetch post — 404 on error or missing
  let post;
  try {
    post = await blogService.getBlogPostBySlug(slug);
  } catch {
    notFound();
  }
  if (!post) notFound();

  // Fetch related posts — graceful fallback
  let relatedPosts: BlogPost[] = [];
  try {
    relatedPosts = await blogService.getRelatedPosts(post.category.id, slug);
  } catch {
    relatedPosts = [];
  }

  // Preprocess HTML: inject heading ids + product sentinels
  const rawHtml = isRTL ? post.contentAr : post.contentEn;
  const processedHtml = preprocessHtml(rawHtml ?? '');

  // Parse TOC from processed HTML (headings now have ids)
  const tocItems = parseToc(processedHtml);

  // Fetch recommended products (use featured/new arrivals as fallback)
  let recommendedProducts: Product[] = [];
  try {
    const result = await productsService.getProducts({ limit: 3, page: 1 });
    recommendedProducts = result.products ?? [];
  } catch {
    recommendedProducts = [];
  }

  const articleTitle = isRTL ? post.titleAr : post.titleEn;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-[#FAF7F2]">
      {/* Structured data */}
      <BlogPostJsonLd post={post} locale={locale} slug={slug} />

      {/* Breadcrumb */}
      <BlogPostBreadcrumb post={post} locale={locale} t={t} />

      {/* Hero */}
      <BlogPostHero post={post} locale={locale} t={t} />

      {/* Article + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 xl:gap-14">

          {/* Main content */}
          <main className="min-w-0 bg-white rounded-3xl shadow-sm px-6 py-8 sm:px-10 sm:py-12">
            {/* Mobile TOC — rendered above article on small screens */}
            {tocItems.length > 0 && (
              <BlogPostTocClient tocItems={tocItems} locale={locale} />
            )}

            <BlogPostContent
              html={processedHtml}
              locale={locale}
              recommendedProducts={recommendedProducts}
              t={t}
            />

            {/* Mobile share + related — below article on small screens */}
            <div className="lg:hidden mt-10 pt-8 border-t border-neutral-100 space-y-8">
              <BlogPostShareButtons url={articleUrl} title={articleTitle} locale={locale} />
              {relatedPosts.length > 0 && (
                <BlogPostRelatedPosts posts={relatedPosts} locale={locale} t={t} />
              )}
            </div>
          </main>

          {/* Desktop sidebar */}
          <BlogPostSidebar
            tocItems={tocItems}
            relatedPosts={relatedPosts}
            locale={locale}
            articleUrl={articleUrl}
            articleTitle={articleTitle}
            t={t}
          />
        </div>
      </div>
    </div>
  );
}
