import { getPostData, getAllPostIds, PostData, getAllPostsSummary } from '@/lib/posts';
import TableOfContents from '@/components/TableOfContents';
import PostNavigation from '@/components/PostNavigation';

interface PostPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return getAllPostIds();
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostData(params.id);
  return {
    title: `K.K. - ${post.title}`,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post: PostData = await getPostData(params.id);
  const allPosts = getAllPostsSummary();

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

  const addIdsToHeadings = (html: string) => {
    return html.replace(
      /<(h[1-3])>(.*?)<\/\1>/g,
      (match, tag, content) => {
        const id = content.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fa5-]/g, '');
        return `<${tag} id="${id}">${content}</${tag}>`;
      }
    );
  };

  const contentWithIds = addIdsToHeadings(post.contentHtml);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="flex-1">
          <header className="mb-10 pb-6 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-3 mb-4 text-sm text-[var(--text-muted)]">
              <span>{formatDate(post.date)}</span>
              <span className="text-[var(--text-color)] bg-gray-100/50 px-2 py-0.5 rounded text-xs">
                {getCategoryLabel(post.category)}
              </span>
              {post.mood && <span>{post.mood}</span>}
              {post.rating && <span>{'★'.repeat(post.rating)}</span>}
            </div>
            <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-[var(--text-color)] mb-4">
              {post.title}
            </h1>
            {post.summary && (
              <p className="text-[var(--text-secondary)] italic">{post.summary}</p>
            )}
          </header>

          <div
            className="prose prose-gray max-w-none text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: contentWithIds }}
          />

          <footer className="mt-12 pt-6 border-t border-[var(--border-color)]">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
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

            <PostNavigation allPosts={allPosts} currentPostId={post.id} />
          </footer>
        </article>

        <aside className="hidden lg:block w-48 flex-shrink-0">
          <div className="sticky top-20">
            <TableOfContents content={contentWithIds} />
          </div>
        </aside>
      </div>
    </div>
  );
}
