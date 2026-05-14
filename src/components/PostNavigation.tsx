import Link from 'next/link';
import { PostData } from '@/lib/posts';

interface PostNavigationProps {
  allPosts: Omit<PostData, 'contentHtml'>[];
  currentPostId: string;
}

export default function PostNavigation({ allPosts, currentPostId }: PostNavigationProps) {
  const currentIndex = allPosts.findIndex((post) => post.id === currentPostId);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className="mt-12 pt-6 border-t border-[var(--border-color)] flex justify-between">
      {prevPost ? (
        <Link
          href={`/posts/${prevPost.id}`}
          className="group flex-1 mr-4"
        >
          <div className="text-xs text-[var(--text-muted)] mb-1">← 上一篇</div>
          <div className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-color)] transition-colors line-clamp-1">
            {prevPost.title}
          </div>
        </Link>
      ) : (
        <div className="flex-1 mr-4" />
      )}

      {nextPost && (
        <Link
          href={`/posts/${nextPost.id}`}
          className="group flex-1 ml-4 text-right"
        >
          <div className="text-xs text-[var(--text-muted)] mb-1">下一篇 →</div>
          <div className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-color)] transition-colors line-clamp-1">
            {nextPost.title}
          </div>
        </Link>
      )}
    </div>
  );
}
