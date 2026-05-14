# K.K. 博客配置指南

## 社交媒体链接配置

编辑 `src/lib/social.ts` 文件，修改你的社交媒体链接：

```typescript
export const socialLinks: SocialLink[] = [
  {
    name: '邮箱',
    url: 'mailto:your-email@example.com',  // 修改为你的邮箱
    icon: '✉️',
  },
  {
    name: 'RSS',
    url: '/feed.xml',
    icon: '📡',
  },
  {
    name: '豆瓣',
    url: 'https://www.douban.com/people/your-id',  // 修改为你的豆瓣 ID
    icon: '🎬',
  },
  {
    name: '知乎',
    url: 'https://www.zhihu.com/people/your-id',  // 修改为你的知乎 ID
    icon: '📝',
  },
  {
    name: '小红书',
    url: 'https://www.xiaohongshu.com/user/profile/your-id',  // 修改为你的小红书 ID
    icon: '📕',
  },
];
```

## 添加更多社交媒体

只需在数组中添加新对象即可：

```typescript
{
  name: '微博',
  url: 'https://weibo.com/your-id',
  icon: '🌐',
}
```

## 网站 Logo 配置

1. 将你的 Logo 图片放入 `public/` 目录
2. 编辑 `src/app/page.tsx`，替换头像部分：

```tsx
<div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4 overflow-hidden">
  <img src="/your-logo.png" alt="K.K." className="w-full h-full object-cover" />
</div>
```

## 网站标题和描述

编辑 `src/app/layout.tsx`：

```typescript
export const metadata = {
  title: 'K.K.',  // 修改网站标题
  description: 'K.K.的个人博客',  // 修改网站描述
};
```

## 页脚信息

编辑 `src/app/layout.tsx` 的 footer 部分：

```tsx
<footer className="border-t border-gray-200 py-8 text-center">
  <p className="text-xs text-text-muted">© 2026 K.K. All rights reserved.</p>
</footer>
```

## 本地开发

```bash
npm run dev    # 启动开发服务器 http://localhost:3000
```

## 构建生产版本

```bash
npm run build  # 构建生产版本
npm run start  # 启动生产服务器
```

## Vercel 部署

1. 将代码推送到 GitHub 仓库
2. 在 Vercel 导入该仓库
3. 使用默认配置部署即可
4. 每次推送到 main 分支自动部署
