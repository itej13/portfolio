import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tejasdas.dev"),
  title: "Tejas Das — AI-first full-stack developer",
  description:
    "Tejas Das builds and ships AI-first products end to end: focused, fast, and production-minded.",
  openGraph: {
    title: "Tejas Das — AI-first full-stack developer",
    description: "I build & ship AI-first products, end to end.",
    type: "website",
    url: "/",
    siteName: "Tejas Das",
  },
  twitter: {
    card: "summary",
    title: "Tejas Das — AI-first full-stack developer",
    description: "I build & ship AI-first products, end to end.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
