export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: '邮箱',
    url: 'mailto:your-email@example.com',
    icon: '✉️',
  },
  {
    name: 'RSS',
    url: '/feed.xml',
    icon: '📡',
  },
  {
    name: '豆瓣',
    url: 'https://www.douban.com/people/your-id',
    icon: '🎬',
  },
  {
    name: '知乎',
    url: 'https://www.zhihu.com/people/your-id',
    icon: '📝',
  },
  {
    name: '小红书',
    url: 'https://www.xiaohongshu.com/user/profile/your-id',
    icon: '📕',
  },
];
