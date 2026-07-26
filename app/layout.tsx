import type { Metadata, Viewport } from "next";
import { Chakra_Petch, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tejasdas.dev"),
  title: "Tejas Das — AI-native product engineer",
  description:
    "Tejas Das builds and ships AI products end to end: a RAG codebase mentor, a local voice AI, live SaaS. Five systems live in production, one on-device.",
  openGraph: {
    title: "Tejas Das — AI-native product engineer",
    description: "Five systems live in production, one on-device. All real, all shipped.",
    type: "website",
    url: "/",
    siteName: "Tejas Das",
  },
  twitter: {
    card: "summary",
    title: "Tejas Das — AI-native product engineer",
    description: "Five systems live in production, one on-device. All real, all shipped.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#030608",
};

// Runs before first paint: marks JS availability (so reveal-hiding never
// strands no-JS visitors) and decides the one-per-session boot overlay
// (never on repeat visits, never under reduced motion).
const prePaint = `(function(){var d=document.documentElement;d.dataset.js="1";try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("hud-boot"))d.dataset.boot="1"}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
        {children}
      </body>
    </html>
  );
}
