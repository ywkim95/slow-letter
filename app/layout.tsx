import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slow Mailbox | 느린 우체통",
  description: "마음을 전하는 느린 우체통 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${outfit.className} antialiased selection:bg-primary/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
