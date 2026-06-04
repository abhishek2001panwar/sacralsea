import type { Metadata } from "next";
import {Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
})
export const metadata: Metadata = {
  title: "SacralSea - A Brand Strategy and Digital Experience Agency",
  description: "We build brands, campaigns, and digital experiences for companies that refuse to be ordinary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
