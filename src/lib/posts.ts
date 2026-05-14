import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export interface PostData {
  id: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  mood?: string;
  rating?: number;
  summary?: string;
  contentHtml: string;
}

function shouldIgnoreFile(fileName: string): boolean {
  if (fileName.startsWith('.')) {
    return true;
  }
  if (fileName.includes('template')) {
    return true;
  }
  return false;
}

function isPostPublished(filePath: string): boolean {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const matterResult = matter(fileContents);
  return matterResult.data.published !== false;
}

export async function getSortedPostsData(): Promise<PostData[]> {
  let fileNames: string[] = [];
  
  if (fs.existsSync(postsDirectory)) {
    fileNames = fs.readdirSync(postsDirectory)
      .filter((fileName) => fileName.endsWith('.md'))
      .filter((fileName) => !shouldIgnoreFile(fileName))
      .filter((fileName) => isPostPublished(path.join(postsDirectory, fileName)));
  }

  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const id = fileName.replace(/\.md$/, '');
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || new Date().toISOString(),
        category: matterResult.data.category || 'diary',
        tags: matterResult.data.tags || [],
        mood: matterResult.data.mood,
        rating: matterResult.data.rating,
        summary: matterResult.data.summary,
        contentHtml: '',
      };
    })
  );

  return allPostsData
    .filter(Boolean)
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    title: matterResult.data.title || 'Untitled',
    date: matterResult.data.date || new Date().toISOString(),
    category: matterResult.data.category || 'diary',
    tags: matterResult.data.tags || [],
    mood: matterResult.data.mood,
    rating: matterResult.data.rating,
    summary: matterResult.data.summary,
    contentHtml,
  };
}

export async function getAllPostIds(): Promise<{ params: { id: string } }[]> {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({
    params: { id: post.id },
  }));
}

export async function getPostsByCategory(category: string): Promise<PostData[]> {
  const allPosts = await getSortedPostsData();
  return allPosts.filter((post) => post.category === category);
}

export async function getAllPostsSummary(): Promise<Omit<PostData, 'contentHtml'>[]> {
  const posts = await getSortedPostsData();
  return posts.map(({ contentHtml, ...rest }) => rest);
}

export const categories = [
  { id: 'all', name: '所有', label: '所有' },
  { id: 'diary', name: '日记', label: '日记' },
  { id: 'resources', name: '资源', label: '资源' },
  { id: 'about', name: '关于', label: '关于' },
];
