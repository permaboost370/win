import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://win-nine-mu.vercel.app"),
  title: "$WINNING — Can't Stop, Won't Stop, GameStop.",
  description:
    "$WINNING — the meme coin built on relentless determination. Can't stop, won't stop, GameStop — the spirit of GME apes, tokenized. Hustle hard. Win harder.",
  openGraph: {
    title: "$WINNING — Can't Stop, Won't Stop, GameStop.",
    description:
      "The meme coin carrying the GameStop chant on-chain. Can't stop, won't stop. Diamond hands forever.",
    type: "website",
    siteName: "$WINNING",
  },
  twitter: {
    card: "summary_large_image",
    title: "$WINNING — Can't Stop, Won't Stop, GameStop.",
    description:
      "The meme coin carrying the GameStop chant on-chain. Can't stop, won't stop. Diamond hands forever.",
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
