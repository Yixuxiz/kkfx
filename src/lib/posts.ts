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

// 检查文件是否应该被忽略
function shouldIgnoreFile(fileName: string): boolean {
  // 忽略以 . 开头的文件（隐藏文件）
  if (fileName.startsWith('.')) {
    return true;
  }
  // 忽略模板文件
  if (fileName.includes('template')) {
    return true;
  }
  return false;
}

// 检查文章是否已发布
function isPostPublished(filePath: string): boolean {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const matterResult = matter(fileContents);
  // 默认发布，除非明确设置为 false
  return matterResult.data.published !== false;
}

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .filter((fileName) => !shouldIgnoreFile(fileName))
    .filter((fileName) => isPostPublished(path.join(postsDirectory, fileName)))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
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
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return allPostsData;
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

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .filter((fileName) => !shouldIgnoreFile(fileName))
    .filter((fileName) => isPostPublished(path.join(postsDirectory, fileName)))
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export function getPostsByCategory(category: string): PostData[] {
  const allPosts = getSortedPostsData();
  return allPosts.filter((post) => post.category === category);
}

export function getAllPostsSummary(): Omit<PostData, 'contentHtml'>[] {
  return getSortedPostsData().map(({ contentHtml, ...rest }) => rest);
}

export const categories = [
  { id: 'all', name: '所有', label: '所有' },
  { id: 'diary', name: '日记', label: '日记' },
  { id: 'resources', name: '资源', label: '资源' },
  { id: 'about', name: '关于', label: '关于' },
];
