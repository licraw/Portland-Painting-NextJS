import ProjectStoryContent from "@/app/components/ProjectStoryContent";
import {
  createSupabasePublicClient,
  isSupabasePublicConfigured,
} from "@/lib/supabase/public";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type PublicProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const publicSiteUrl = "https://www.paintpdx.com";

const getPublishedProject = cache(async (slug: string) => {
  if (!isSupabasePublicConfigured()) return null;

  const { data, error } = await createSupabasePublicClient()
    .from("project_stories")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error) return null;
  return data;
});

export async function generateMetadata({
  params,
}: PublicProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProject(slug);

  if (!project) return {};

  const canonicalUrl = `${publicSiteUrl}/projects/${project.slug}`;

  return {
    alternates: { canonical: canonicalUrl },
    description: project.summary ?? undefined,
    openGraph: {
      description: project.summary ?? undefined,
      title: project.title,
      type: "article",
      url: canonicalUrl,
    },
    title: `${project.title} | Portland Painting & Restoration`,
  };
}

export default async function PublicProjectPage({
  params,
}: PublicProjectPageProps) {
  const { slug } = await params;
  const project = await getPublishedProject(slug);

  if (!project) notFound();

  return (
    <article className="bg-[#F2EEE5] px-6 py-14 text-[#20231F] sm:py-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-[#687760]">
          Project story
        </p>
        <ProjectStoryContent project={project} />
      </div>
    </article>
  );
}
