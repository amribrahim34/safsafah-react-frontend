import type { BlogPost } from '@/types/models/blog';
import BlogCard from './BlogCard';

interface BlogGridProps {
  posts: BlogPost[];
  locale: string;
}

export default function BlogGrid({ posts, locale }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} locale={locale} />
      ))}
    </div>
  );
}
