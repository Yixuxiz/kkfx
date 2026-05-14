'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h1, h2, h3');
    
    const items: TOCItem[] = Array.from(headingElements).map((heading) => {
      const level = parseInt(heading.tagName[1]);
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
      return {
        id,
        text: heading.textContent || '',
        level,
      };
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -60% 0%' }
    );

    headingElements.forEach((heading) => {
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
      if (id) {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24">
      <h3 className="text-sm font-medium text-[var(--text-color)] mb-3">目录</h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={`text-sm block py-1 transition-colors ${
                activeId === heading.id
                  ? 'text-[var(--text-color)] font-medium'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-color)]'
              }`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
