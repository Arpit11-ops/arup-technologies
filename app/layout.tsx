import type { Metadata } from "next";
import { satoshi } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arup Technologies — AI-powered digital agency",
  description:
    "Websites, digital marketing, SEO, software & app development, and AI + workflow automation. Ship faster. Grow smarter.",
  openGraph: {
    title: "Arup Technologies",
    description: "AI-powered digital agency.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
