import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { contentUpdatedAt, siteUrl } from "@/lib/seo";

const paths = ["/", "/vision", "/research", "/book", "/blog", "/impressum", "/privacy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = paths.map((path) => ({
    url: new URL(path, siteUrl).href,
    lastModified: contentUpdatedAt,
    priority: path === "/" ? 1 : path === "/blog" ? 0.7 : 0.8,
  }));
  const posts = blogPosts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, siteUrl).href,
    lastModified: post.date,
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
