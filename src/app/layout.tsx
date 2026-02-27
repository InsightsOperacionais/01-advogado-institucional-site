import { ThemeProvider } from "@/components/layout/theme/theme-provider";
import { siteConfig } from "@/lib/site-config";
import type { Metadata, Viewport } from "next";

import "../styles/animations.css";
import "../styles/custom-styles.css";
import "../styles/globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.shortName} | Advocacia Empresarial de Alta Complexidade`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  applicationName: siteConfig.name,

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.shortName} | Advocacia Empresarial`,
    description: siteConfig.description,
    siteName: siteConfig.shortName,
    images: [
      {
        url: "/assets/team/faixada.png",
        width: 1200,
        height: 630,
        alt: "Sede da Von Marins Advocacia",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.shortName,
    description: siteConfig.description,
    images: ["/assets/team/faixada.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning é vital ao usar next-themes
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased md:subpixel-antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
