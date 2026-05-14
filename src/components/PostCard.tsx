import Link from 'next/link';
import { PostData } from '@/lib/posts';

interface PostCardProps {
  post: PostData;
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      diary: '日记',
      resources: '资源',
      about: '关于',
    };
    return labels[category] || category;
  };

  return (
    <article className="py-8 border-b border-[var(--border-color)] last:border-b-0 hover:bg-gray-50/30 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3 text-xs text-[var(--text-muted)]">
        <span>{formatDate(post.date)}</span>
        <span className="text-[var(--text-color)] bg-gray-100/50 px-2 py-0.5 rounded">
          {getCategoryLabel(post.category)}
        </span>
        {post.mood && <span>{post.mood}</span>}
        {post.rating && <span>{'★'.repeat(post.rating)}</span>}
      </div>
      <Link href={`/posts/${post.id}`} className="block group">
        <h2 className="font-serif text-lg font-semibold text-[var(--text-color)] mb-2 group-hover:text-[var(--text-secondary)] transition-colors">
          {post.title}
        </h2>
        {post.summary && (
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {post.summary}
          </p>
        )}
      </Link>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-[var(--text-muted)] border border-[var(--border-color)] px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
