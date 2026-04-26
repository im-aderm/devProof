import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "DevProof | GitHub Intelligence Platform",
  description: "Analyze and compare public GitHub profiles and repositories instantly with the Obsidian Ledger protocol.",
  openGraph: {
    title: "DevProof | The Obsidian Ledger",
    description: "Transform GitHub activity into professional proof-of-skill assets.",
    type: "website",
    siteName: "DevProof",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevProof | GitHub Intelligence",
    description: "Deep architectural audits of public repositories and profiles.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${manrope.variable} font-sans bg-background text-on-surface antialiased`}>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
