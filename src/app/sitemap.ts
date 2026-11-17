import type { MetadataRoute } from "next";

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
  "/trade-show",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route || "/"}`,
    lastModified: now,
  }));
}
