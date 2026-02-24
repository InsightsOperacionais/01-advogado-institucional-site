import { ThemeProvider } from "@/components/layout/theme/theme-provider";
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
  // Substitua pela sua URL real - Essencial para que as imagens OG carreguem
  metadataBase: new URL("https://meusite.com.br"),

  title: {
    default: "Minha Marca | Especialista em Design",
    template: "%s | Minha Marca",
  },
  description:
    "Especialista em criar interfaces de alto impacto e soluções digitais modernas.",
  keywords: ["Next.js", "React", "Web Design", "UI/UX", "Tailwind CSS"],
  authors: [{ name: "Seu Nome", url: "https://linkedin.com/in/seu-perfil" }],
  creator: "Seu Nome",

  // URLs canônicas evitam problemas de SEO com "www" ou "http"
  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      { url: "/favicon.svg?v=1", type: "image/svg+xml", sizes: "any" },
      { url: "/icon.png?v=1", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-icon.png?v=1",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://meusite.com.br",
    title: "Minha Marca | Design & Tecnologia",
    description:
      "Transformando ideias em experiências digitais de alta performance.",
    siteName: "Minha Marca",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Preview do Portfólio de Design",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Minha Marca",
    description: "Design & Desenvolvimento Web",
    images: ["/og-image.png"],
    creator: "@seu_usuario",
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
