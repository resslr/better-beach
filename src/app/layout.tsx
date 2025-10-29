import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/ui/navigation-menu";
import { Footer } from "@/components/ui/footer";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1e90ff" },
    { media: "(prefers-color-scheme: dark)", color: "#1e90ff" },
  ],
};

export const metadata: Metadata = {
  title: "BetterBeach - Reef-Safe Sunscreen Checker",
  description:
    "Check if your sunscreen is safe for coral reefs. Scan ingredients and protect our oceans.",
  applicationName: "BetterBeach",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BetterBeach",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "BetterBeach",
    title: "BetterBeach - Reef-Safe Sunscreen Checker",
    description:
      "Check if your sunscreen is safe for coral reefs. Scan ingredients and protect our oceans.",
  },
  twitter: {
    card: "summary",
    title: "BetterBeach - Reef-Safe Sunscreen Checker",
    description:
      "Check if your sunscreen is safe for coral reefs. Scan ingredients and protect our oceans.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BetterBeach" />
      </head>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="betterbeach-theme">
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
              <Navigation />
            </header>
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
