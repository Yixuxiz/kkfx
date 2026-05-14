'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories } from '@/lib/config';
import ThemeToggle from './ThemeToggle';

function getCategoryFromPathname(pathname: string): string {
  if (pathname.startsWith('/diary')) return 'diary';
  if (pathname.startsWith('/resources')) return 'resources';
  if (pathname.startsWith('/about')) return 'about';
  return 'all';
}

export default function Navbar() {
  const pathname = usePathname();
  const currentCategory = getCategoryFromPathname(pathname || '/');

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[var(--bg-color)]/95 backdrop-blur-sm z-50 border-b border-[var(--border-color)]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl font-semibold text-[var(--text-color)] hover:text-[var(--text-secondary)] transition-colors">
          K.K.
        </Link>
        <div className="flex items-center space-x-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.id === 'all' ? '/' : `/${category.id}`}
              className={`text-sm text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors ${
                currentCategory === category.id ? 'text-[var(--text-color)]' : ''
              }`}
            >
              {category.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
