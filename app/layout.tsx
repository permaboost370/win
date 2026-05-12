import type { Metadata, Viewport } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://win-nine-mu.vercel.app"),
  title: "$WINNING — Can't Stop, Won't Stop, GameStop.",
  description:
    "$WINNING — the meme coin built on relentless determination. Can't stop, won't stop, GameStop — the spirit of GME apes, tokenized. Hustle hard. Win harder.",
  icons: {
    icon: "/logowin.jpg",
    apple: "/logowin.jpg",
  },
  openGraph: {
    title: "$WINNING — Can't Stop, Won't Stop, GameStop.",
    description:
      "The meme coin carrying the GameStop chant on-chain. Can't stop, won't stop. Diamond hands forever.",
    type: "website",
    siteName: "$WINNING",
    images: [
      {
        url: "/bannerhigh.jpg",
        width: 2400,
        height: 806,
        alt: "$WINNING — Can't Stop, Won't Stop, GameStop.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "$WINNING — Can't Stop, Won't Stop, GameStop.",
    description:
      "The meme coin carrying the GameStop chant on-chain. Can't stop, won't stop. Diamond hands forever.",
    images: ["/bannerhigh.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-bone">
        {children}
      </body>
    </html>
  );
}
