import type { MetadataRoute } from "next";
import {
  createSupabasePublicClient,
  isSupabasePublicConfigured,
} from "@/lib/supabase/public";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route || "/"}`,
    lastModified: now,
  }));

  if (!isSupabasePublicConfigured()) return staticEntries;

  const supabase = createSupabasePublicClient();
  const projectResult = await supabase.from("project_stories").select("slug, updated_at").eq("status", "published").lte("published_at", now.toISOString()).order("published_at", { ascending: false });

  if (projectResult.error) return staticEntries;

  return [
    ...staticEntries,
    ...(projectResult.data ?? []).map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.updated_at),
    })),
  ];
}
