import {
  createSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase/admin";
import ProjectStoryContent from "@/app/components/ProjectStoryContent";
import type { ProjectStoryDisplayImage } from "@/app/components/ProjectStoryGallery";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type ProjectPreviewPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPreviewPage({
  params,
}: ProjectPreviewPageProps) {
  if (!isSupabaseAdminConfigured()) redirect("/admin/projects");

  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id < 1) notFound();

  const supabase = createSupabaseAdminClient();
  const [{ data: project, error }, { data: imageRows, error: imagesError }] =
    await Promise.all([
      supabase.from("project_stories").select("*").eq("id", id).maybeSingle(),
      supabase
        .from("project_story_images")
        .select("*")
        .eq("project_story_id", id)
        .order("is_cover", { ascending: false })
        .order("sort_order", { ascending: true }),
    ]);

  if (error || imagesError || !project) notFound();

  const images: ProjectStoryDisplayImage[] = (imageRows ?? []).map((image) => ({
    ...image,
    publicUrl: supabase.storage
      .from("project-images")
      .getPublicUrl(image.storage_path).data.publicUrl,
  }));

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          className="text-sm font-medium text-[#17352B] underline decoration-[#17352B]/35 underline-offset-4 hover:decoration-[#17352B]"
          href="/admin/projects"
        >
          Back to projects
        </Link>
        <Link
          className="border border-[#17352B] px-4 py-2 text-sm font-semibold text-[#17352B] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#17352B] focus:ring-offset-2 focus:ring-offset-[#F2EEE5]"
          href={`/admin/projects/${project.id}/edit`}
        >
          Edit project
        </Link>
      </div>

      <div className="mt-10">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#687760]">
          {project.status} · Admin preview
        </p>
        {project.status === "published" ? (
          <Link
            className="mt-3 inline-block text-sm font-medium text-[#17352B] underline decoration-[#17352B]/35 underline-offset-4 hover:decoration-[#17352B]"
            href={`/projects/${project.slug}`}
          >
            Open public page
          </Link>
        ) : null}
      </div>

      <div className="mt-8">
        <ProjectStoryContent images={images} project={project} />
      </div>
    </article>
  );
}
