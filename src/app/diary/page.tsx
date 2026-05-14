import PostCard from '@/components/PostCard';
import { getPostsByCategory } from '@/lib/posts';

export default function DiaryPage() {
  const posts = getPostsByCategory('diary');

  return (
    <div>
      <h1 className="font-serif text-xl font-semibold text-text-primary mb-8">
        日记
      </h1>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-text-muted py-10">暂无日记</p>
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
    title: 'K.K. - 日记',
  };
}
