import type { Metadata } from "next";
import "./globals.css";
import "../styles/components.css";
import "../styles/terminal.css";
import { ThemeToggle } from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: "cateiru - ポートフォリオ",
  description: "cateiru のポートフォリオサイトです。プロフィール、ブログ、SNSリンクなどをご覧いただけます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="layout">
          <header className="layout-header">
            <ThemeToggle />
          </header>
          <main className="layout-main">
            {children}
          </main>
          <footer className="layout-footer">
            <p>&copy; 2025 cateiru. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
