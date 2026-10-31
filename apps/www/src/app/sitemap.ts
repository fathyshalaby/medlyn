import type { MetadataRoute } from "next";
import { contentUpdatedAt, siteUrl } from "@/lib/seo";

const paths = ["/", "/vision", "/research", "/book"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: new URL(path, siteUrl).href,
    lastModified: contentUpdatedAt,
    priority: path === "/" ? 1 : 0.8,
  }));
}
