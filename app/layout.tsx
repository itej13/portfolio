import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Manrope } from "next/font/google";
import "./globals.css";
const display = Chakra_Petch({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const title = "Tejas Das — AI-native product engineer";
const description = "I turn ambitious ideas into working software. Explore AI systems, thoughtful interfaces, and end-to-end engineering by Tejas Das.";
export const metadata: Metadata = {
  metadataBase: new URL("https://tejas-portfolio-ivory.vercel.app"), title, description,
  openGraph: { title, description, type: "website", url: "/", siteName: "Tejas Das" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#08090b", colorScheme: "dark" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${body.variable}`}><body><noscript><style>{`.hero-sequence{height:auto}.hero-sticky{position:relative;min-height:620px}.scroll-cue,.chapter-progress,.motion-toggle{display:none}`}</style></noscript>{children}</body></html>;
}
