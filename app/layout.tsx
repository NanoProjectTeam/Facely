import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#070709",
};

export const metadata: Metadata = {
  title: "Facely — Free Open-Source Bio-Link & Aesthetic Profile Website",
  description:
    "100% free, open-source personal bio-link and profile website inspired by guns.lol, optimized for zero-cost deployment on Vercel.",
  keywords: [
    "guns.lol alternative",
    "bio link",
    "link in bio",
    "aesthetic profile",
    "free bio link",
    "discord presence bio",
    "open source bio link",
    "lanyard discord status",
  ],
  authors: [{ name: "Facely Community" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://assets.mixkit.co" />
        <link rel="preconnect" href="https://api.lanyard.rest" />
      </head>
      <body className="antialiased selection:bg-purple-600/30 selection:text-purple-200">
        {children}
      </body>
    </html>
  );
}
