import Navbar from '@/components/Navbar';
import SocialLinks from '@/components/SocialLinks';
import MouseInkEffect from '@/components/MouseInkEffect';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'K.K.',
  description: 'K.K.的个人博客',
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="zh-CN" className={inter.className}>
      <body className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        <MouseInkEffect />
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          {children}
        </main>
        <footer className="border-t border-[var(--border-color)] py-8">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
            <SocialLinks />
            <p className="text-xs text-[var(--text-muted)]">© 2026 K.K.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
