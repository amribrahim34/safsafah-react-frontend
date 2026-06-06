import type { BlogPost } from '@/types/models/blog';

interface Options {
  post: BlogPost;
  locale: string;
  slug: string;
}

export function buildBlogJsonLd({ post, locale, slug }: Options) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://safsafah.com';
  const articleUrl = `${siteUrl}/${locale}/blog/${slug}`;
  const title = locale === 'ar' ? post.titleAr : post.titleEn;
  const description = (locale === 'ar' ? post.excerptAr : post.excerptEn)
    ?.replace(/<[^>]*>/g, '')
    .trim();
  const categoryName = locale === 'ar' ? post.category.nameAr : post.category.nameEn;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': articleUrl,
        headline: title,
        description,
        image: post.image
          ? { '@type': 'ImageObject', url: post.image, width: 1200, height: 630 }
          : undefined,
        datePublished: post.createdAt,
        dateModified: post.updatedAt,
        author: {
          '@type': 'Organization',
          name: 'Safsafah',
          url: siteUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Safsafah',
          logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
        articleSection: categoryName,
        inLanguage: locale === 'ar' ? 'ar' : 'en',
        timeRequired: `PT${post.readTime}M`,
        url: articleUrl,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: locale === 'ar' ? 'الرئيسية' : 'Home',
            item: `${siteUrl}/${locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: locale === 'ar' ? 'المدونة' : 'The Journal',
            item: `${siteUrl}/${locale}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: categoryName,
            item: `${siteUrl}/${locale}/blog?category=${post.category.slug}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: title,
            item: articleUrl,
          },
        ],
      },
    ],
  };
}
