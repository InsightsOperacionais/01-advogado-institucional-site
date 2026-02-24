import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/", // Bloqueia pastas sensíveis se houver
    },
    sitemap: "https://meusite.com.br/sitemap.xml",
  };
}
