import type { MetadataRoute } from "next";
import { getAllBlogs } from "../../lib/getAllBlogs";

const baseUrl = "https://www.paintpdx.com";

const staticRoutes = [
  "",
  "/estimate",
  "/contact",
  "/painting/interior",
  "/painting/exterior",
  "/gallery/interior",
  "/gallery/exterior",
  "/carpentry",
  "/carpentry-example",
  "/restoration",
  "/commercial",
  "/hoa",
  "/about-us/green-and-safe",
  "/about-us/employment",
  "/about-us/reviews",
  "/save-the-planet",
  "/blogs",
  "/trade-show",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const blogPosts = await getAllBlogs();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route || "/"}`,
    lastModified: now,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/content/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
  }));

  return [...staticEntries, ...blogEntries];
}
