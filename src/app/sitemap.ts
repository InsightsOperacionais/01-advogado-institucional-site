import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { insightArticles } from "./(routes)/insights/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = siteConfig.pages.map(
    (page, index) => ({
    url: `${siteConfig.url}${page === "/" ? "" : page}`,
    lastModified: now,
    changeFrequency: (page === "/" ? "weekly" : "monthly") as
      | "weekly"
      | "monthly",
    priority: index === 0 ? 1 : 0.8,
  }),
  );
  const articleEntries: MetadataRoute.Sitemap = insightArticles.map((article) => ({
    url: `${siteConfig.url}/insights/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return staticEntries.concat(articleEntries);
}
