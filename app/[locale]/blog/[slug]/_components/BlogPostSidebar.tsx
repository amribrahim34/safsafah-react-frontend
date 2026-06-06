import type { BlogPost } from '@/types/models/blog';
import type { TocItem } from '../_lib/parseToc';
import BlogPostTocClient from './BlogPostTocClient';
import BlogPostRelatedPosts from './BlogPostRelatedPosts';
import BlogPostShareButtons from './BlogPostShareButtons';

interface Props {
  tocItems: TocItem[];
  relatedPosts: BlogPost[];
  locale: string;
  articleUrl: string;
  articleTitle: string;
  t: (key: string) => string;
}

export default function BlogPostSidebar({
  tocItems,
  relatedPosts,
  locale,
  articleUrl,
  articleTitle,
  t,
}: Props) {
  return (
    <aside className="hidden lg:flex flex-col gap-8 sticky top-24 self-start">
      {/* Table of Contents — client component handles scroll-spy + mobile accordion */}
      {tocItems.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <BlogPostTocClient tocItems={tocItems} locale={locale} />
        </div>
      )}

      {/* Share buttons */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-6">
        <BlogPostShareButtons
          url={articleUrl}
          title={articleTitle}
          locale={locale}
        />
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <BlogPostRelatedPosts posts={relatedPosts} locale={locale} t={t} />
        </div>
      )}
    </aside>
  );
}
