import ProjectStoryContent from "@/app/components/ProjectStoryContent";
import type { ProjectStoryDisplayImage } from "@/app/components/ProjectStoryGallery";
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

  const supabase = createSupabasePublicClient();
  const { data: project, error } = await supabase
    .from("project_stories")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error || !project) return null;

  const { data: imageRows, error: imagesError } = await supabase
    .from("project_story_images")
    .select("*")
    .eq("project_story_id", project.id)
    .order("is_cover", { ascending: false })
    .order("sort_order", { ascending: true });

  if (imagesError) return null;

  const images: ProjectStoryDisplayImage[] = (imageRows ?? []).map((image) => ({
    ...image,
    publicUrl: supabase.storage
      .from("project-images")
      .getPublicUrl(image.storage_path).data.publicUrl,
  }));

  return { images, project };
});

export async function generateMetadata({
  params,
}: PublicProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedProject(slug);

  if (!page) return {};

  const { images, project } = page;

  const canonicalUrl = `${publicSiteUrl}/projects/${project.slug}`;

  return {
    alternates: { canonical: canonicalUrl },
    description: project.summary ?? undefined,
    openGraph: {
      description: project.summary ?? undefined,
      title: project.title,
      type: "article",
      url: canonicalUrl,
      ...(images[0]
        ? {
            images: [
              {
                alt: images[0].alt_text,
                height: images[0].height ?? undefined,
                url: images[0].publicUrl,
                width: images[0].width ?? undefined,
              },
            ],
          }
        : {}),
    },
    title: `${project.title} | Portland Painting & Restoration`,
  };
}

export default async function PublicProjectPage({
  params,
}: PublicProjectPageProps) {
  const { slug } = await params;
  const page = await getPublishedProject(slug);

  if (!page) notFound();

  const { images, project } = page;

  return (
    <article className="bg-[#F2EEE5] px-6 py-14 text-[#20231F] sm:py-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-[#687760]">
          Project story
        </p>
        <ProjectStoryContent images={images} project={project} />
      </div>
    </article>
  );
}
