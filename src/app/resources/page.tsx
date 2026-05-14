import PostCard from '@/components/PostCard';
import { getPostsByCategory } from '@/lib/posts';

export default async function ResourcesPage() {
  const posts = await getPostsByCategory('resources');

  return (
    <div>
      <h1 className="font-serif text-xl font-semibold text-[var(--text-color)] mb-8">
        资源
      </h1>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-[var(--text-muted)] py-10">暂无资源</p>
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
    title: 'K.K. - 资源',
  };
}
