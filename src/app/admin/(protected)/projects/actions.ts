"use server";

import { hasValidAdminSession } from "@/lib/admin-session";
import {
  createSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ProjectStoryPayload = {
  approach: string | null;
  findings: string | null;
  location: string | null;
  preparation: string | null;
  problem: string | null;
  project_date: string | null;
  result: string | null;
  service_type: string | null;
  slug: string;
  status: "draft" | "published";
  summary: string | null;
  title: string;
};

function getOptionalText(formData: FormData, name: string) {
  const value = formData.get(name);
  if (typeof value !== "string") return null;

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : null;
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160)
    .replace(/-+$/g, "");
}

function getProjectStoryPayload(formData: FormData) {
  const title = getOptionalText(formData, "title");

  if (!title || title.length < 3 || title.length > 160) {
    return { error: "title" } as const;
  }

  const suppliedSlug = getOptionalText(formData, "slug");
  const slug = slugify(suppliedSlug ?? title);

  if (!slug) {
    return { error: "slug" } as const;
  }

  const requestedStatus = formData.get("status");
  const status = requestedStatus === "published" ? "published" : "draft";
  const payload: ProjectStoryPayload = {
    approach: getOptionalText(formData, "approach"),
    findings: getOptionalText(formData, "findings"),
    location: getOptionalText(formData, "location"),
    preparation: getOptionalText(formData, "preparation"),
    problem: getOptionalText(formData, "problem"),
    project_date: getOptionalText(formData, "project_date"),
    result: getOptionalText(formData, "result"),
    service_type: getOptionalText(formData, "service_type"),
    slug,
    status,
    summary: getOptionalText(formData, "summary"),
    title,
  };

  return { payload } as const;
}

async function requireAdminSession() {
  if (!(await hasValidAdminSession())) {
    redirect("/admin/login");
  }
}

function getProjectId(value: number) {
  return Number.isSafeInteger(value) && value > 0 ? value : null;
}

export async function createProjectStory(formData: FormData) {
  await requireAdminSession();

  if (!isSupabaseAdminConfigured()) {
    redirect("/admin/projects/new?error=configuration");
  }

  const result = getProjectStoryPayload(formData);
  if ("error" in result) {
    redirect(`/admin/projects/new?error=${result.error}`);
  }

  const payload: ProjectStoryPayload = { ...result.payload, status: "draft" };
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("project_stories")
    .insert({
      ...payload,
      published_at: null,
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      redirect("/admin/projects/new?error=duplicate-slug");
    }

    redirect("/admin/projects/new?error=save");
  }

  revalidatePath("/admin/projects");
  redirect(`/admin/projects/${data.id}/edit?created=1`);
}

export async function updateProjectStory(id: number, formData: FormData) {
  await requireAdminSession();

  const projectId = getProjectId(id);
  if (!projectId) redirect("/admin/projects?error=invalid-project");

  if (!isSupabaseAdminConfigured()) {
    redirect(`/admin/projects/${projectId}/edit?error=configuration`);
  }

  const result = getProjectStoryPayload(formData);
  if ("error" in result) {
    redirect(`/admin/projects/${projectId}/edit?error=${result.error}`);
  }

  const { payload } = result;
  const supabase = createSupabaseAdminClient();
  const { data: currentProject, error: loadError } = await supabase
    .from("project_stories")
    .select("published_at, slug")
    .eq("id", projectId)
    .maybeSingle();

  if (loadError || !currentProject) {
    redirect(`/admin/projects/${projectId}/edit?error=not-found`);
  }

  const { error } = await supabase
    .from("project_stories")
    .update({
      ...payload,
      published_at:
        payload.status === "published"
          ? currentProject.published_at ?? new Date().toISOString()
          : null,
    })
    .eq("id", projectId);

  if (error) {
    if (error.code === "23505") {
      redirect(`/admin/projects/${projectId}/edit?error=duplicate-slug`);
    }

    redirect(`/admin/projects/${projectId}/edit?error=save`);
  }

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/projects/${currentProject.slug}`);
  revalidatePath(`/projects/${payload.slug}`);
  redirect(`/admin/projects?updated=${projectId}`);
}

export async function deleteProjectStory(id: number) {
  await requireAdminSession();

  const projectId = getProjectId(id);
  if (!projectId || !isSupabaseAdminConfigured()) {
    redirect("/admin/projects?error=delete");
  }

  const supabase = createSupabaseAdminClient();
  const { data: project, error: projectLoadError } = await supabase
    .from("project_stories")
    .select("slug")
    .eq("id", projectId)
    .maybeSingle();

  if (projectLoadError || !project) {
    redirect("/admin/projects?error=delete");
  }

  const { data: images, error: imageLoadError } = await supabase
    .from("project_story_images")
    .select("storage_path")
    .eq("project_story_id", projectId);

  if (imageLoadError) redirect("/admin/projects?error=delete");

  const storagePaths = (images ?? []).map((image) => image.storage_path);
  if (storagePaths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("project-images")
      .remove(storagePaths);

    if (storageError) redirect("/admin/projects?error=delete");
  }

  const { error } = await supabase
    .from("project_stories")
    .delete()
    .eq("id", projectId);

  if (error) redirect("/admin/projects?error=delete");

  revalidatePath("/admin/projects");
  revalidatePath(`/projects/${project.slug}`);
  redirect("/admin/projects?deleted=1");
}
