import type { Metadata } from "next";
import { Inter, Manrope, Outfit } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { AuthProvider } from "@/components/providers/SessionProvider";
import CommandPalette from "@/components/ui/CommandPalette";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "DevProof | Advanced Engineering Intelligence",
  description: "Quantify engineering excellence through automated GitHub ledger analysis and AI-driven skill verification.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "DevProof | Engineering Intelligence Protocol",
    description: "Verified technical dossiers and repository analysis for modern developers.",
    url: "https://devproof.io",
    siteName: "DevProof",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevProof | Engineering Intelligence",
    description: "Quantify your technical impact.",
    images: ["/logo.png"],
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
      <body className={`${inter.variable} ${manrope.variable} ${outfit.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <AuthProvider>
          <AnalyticsProvider>
            <CommandPalette />
            {children}
          </AnalyticsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
