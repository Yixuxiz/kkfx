'use client';

import { useState, useEffect } from 'react';
import { themes } from '@/lib/theme';

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const theme = themes[currentTheme];
    document.documentElement.style.setProperty('--bg-color', theme.bgColor);
    document.documentElement.style.setProperty('--text-color', theme.textColor);
    document.documentElement.style.setProperty('--text-secondary', theme.textSecondary);
    document.documentElement.style.setProperty('--text-muted', theme.textMuted);
    document.documentElement.style.setProperty('--border-color', theme.borderColor);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  const theme = themes[currentTheme];

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-200/50 transition-colors"
      title={theme.name}
      style={{ color: theme.textColor }}
    >
      {currentTheme === 'light' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
        </svg>
      )}
    </button>
  );
}
