import type { BlogPost } from '@/types/models/blog';
import { buildBlogJsonLd } from '../_lib/buildBlogJsonLd';

interface Props {
  post: BlogPost;
  locale: string;
  slug: string;
}

export default function BlogPostJsonLd({ post, locale, slug }: Props) {
  const jsonLd = buildBlogJsonLd({ post, locale, slug });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
