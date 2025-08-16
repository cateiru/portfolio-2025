import type { Metadata } from "next"
import "./globals.css"
import "../styles/components.css"
import "../styles/terminal.css"

export const metadata: Metadata = {
  title: "cateiru - ポートフォリオ",
  description: "cateiru のポートフォリオサイトです。プロフィール、ブログ、SNSリンクなどをご覧いただけます。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=M+PLUS+1+Code:wght@100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="layout">
          <main className="layout-main">{children}</main>
          <footer className="layout-footer">
            <p>&copy; 2025 cateiru. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
