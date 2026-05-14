import { socialLinks } from '@/lib/social';

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target={link.url.startsWith('http') ? '_blank' : undefined}
          rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors"
          title={link.name}
        >
          <span className="text-sm">{link.icon}</span>
          <span className="text-xs">{link.name}</span>
        </a>
      ))}
    </div>
  );
}
