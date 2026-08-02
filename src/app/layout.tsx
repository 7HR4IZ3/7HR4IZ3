import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/content/site";

const recursive = localFont({
  src: "../../node_modules/@fontsource-variable/recursive/files/recursive-latin-wght-normal.woff2",
  display: "swap",
  variable: "--font-recursive",
  weight: "300 1000",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.alias} — Full Stack Engineer`,
    template: `%s — ${siteConfig.alias}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.alias} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.contact.github }],
  creator: siteConfig.name,
  keywords: ["Alhassan Abdulazeez", "Thraize", "full stack engineer Nigeria", "AI developer tools", "Next.js engineer", "Python developer", "mobile runtimes", "spatial computing"],
  openGraph: {
    type: "website",
    siteName: siteConfig.alias,
    title: `${siteConfig.alias} — Full Stack Engineer`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@iamthraize",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.variable}>{children}</body>
    </html>
  );
}
