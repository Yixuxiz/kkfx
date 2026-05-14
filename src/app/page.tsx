import PostCard from '@/components/PostCard';
import { getSortedPostsData } from '@/lib/posts';

export default async function HomePage() {
  const posts = await getSortedPostsData();

  return (
    <div>
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-[var(--text-muted)] py-10">暂无文章</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: 'K.K. - 所有文章',
  };
}
