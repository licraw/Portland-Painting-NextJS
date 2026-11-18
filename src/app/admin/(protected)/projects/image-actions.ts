"use server";

import { hasValidAdminSession } from "@/lib/admin-session";
import {
  createSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase/admin";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const bucketName = "project-images";
const maximumImages = 12;
const maximumImageBytes = 3 * 1024 * 1024;
const maximumDimension = 2400;

type ImageActionResult =
  | { ok: true }
  | { ok: false; error: string };

type SignedUploadResult =
  | { ok: true; path: string; token: string }
  | { ok: false; error: string };

type FinalizeImageInput = {
  altText: string;
  height: number;
  path: string;
  width: number;
};

async function requireAdminSession() {
  if (!(await hasValidAdminSession())) redirect("/admin/login");
}

function isValidProjectId(value: number) {
  return Number.isSafeInteger(value) && value > 0;
}

function isProjectImagePath(projectId: number, path: string) {
  return new RegExp(`^${projectId}/[0-9a-f-]{36}\\.webp$`).test(path);
}

async function getProject(projectId: number) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("project_stories")
    .select("id, slug")
    .eq("id", projectId)
    .maybeSingle();

  return error ? null : data;
}

async function revalidateProject(projectId: number) {
  const project = await getProject(projectId);
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/admin/projects/${projectId}/edit`);
  if (project) revalidatePath(`/projects/${project.slug}`);
}

export async function createSignedProjectImageUpload(
  projectId: number
): Promise<SignedUploadResult> {
  await requireAdminSession();

  if (!isValidProjectId(projectId) || !isSupabaseAdminConfigured()) {
    return { ok: false, error: "Photo uploads are not configured." };
  }

  const supabase = createSupabaseAdminClient();
  const [{ count, error: countError }, project] = await Promise.all([
    supabase
      .from("project_story_images")
      .select("id", { count: "exact", head: true })
      .eq("project_story_id", projectId),
    getProject(projectId),
  ]);

  if (countError || !project) {
    return { ok: false, error: "The project could not be loaded." };
  }

  if ((count ?? 0) >= maximumImages) {
    return { ok: false, error: `Projects can have up to ${maximumImages} photos.` };
  }

  const path = `${projectId}/${randomUUID()}.webp`;
  const { data, error } = await supabase.storage
    .from(bucketName)
    .createSignedUploadUrl(path);

  if (error || !data?.token) {
    return { ok: false, error: "A secure upload could not be started." };
  }

  return { ok: true, path, token: data.token };
}

export async function finalizeProjectImageUpload(
  projectId: number,
  input: FinalizeImageInput
): Promise<ImageActionResult> {
  await requireAdminSession();

  if (!isValidProjectId(projectId) || !isSupabaseAdminConfigured()) {
    return { ok: false, error: "Photo uploads are not configured." };
  }

  if (!isProjectImagePath(projectId, input.path)) {
    return { ok: false, error: "The photo path is invalid." };
  }

  const altText = input.altText.trim();
  const dimensionsAreValid =
    Number.isSafeInteger(input.width) &&
    Number.isSafeInteger(input.height) &&
    input.width > 0 &&
    input.height > 0 &&
    input.width <= maximumDimension &&
    input.height <= maximumDimension;

  if (
    altText.length < 3 ||
    altText.length > 240 ||
    !dimensionsAreValid
  ) {
    await createSupabaseAdminClient().storage
      .from(bucketName)
      .remove([input.path]);
    return { ok: false, error: "The photo details are invalid." };
  }

  const supabase = createSupabaseAdminClient();
  const fileName = input.path.split("/").at(-1)!;
  const { data: objects, error: objectError } = await supabase.storage
    .from(bucketName)
    .list(String(projectId), { limit: 2, search: fileName });
  const uploadedObject = objects?.find((object) => object.name === fileName);
  const uploadedSize = Number(uploadedObject?.metadata?.size ?? 0);
  const uploadedMimeType = String(uploadedObject?.metadata?.mimetype ?? "");

  if (
    objectError ||
    !uploadedObject ||
    uploadedSize < 1 ||
    uploadedSize > maximumImageBytes ||
    uploadedMimeType !== "image/webp"
  ) {
    await supabase.storage.from(bucketName).remove([input.path]);
    return { ok: false, error: "The uploaded photo did not pass validation." };
  }

  const { data: currentImages, error: imagesError } = await supabase
    .from("project_story_images")
    .select("is_cover, sort_order")
    .eq("project_story_id", projectId)
    .order("sort_order", { ascending: false });

  if (imagesError || (currentImages?.length ?? 0) >= maximumImages) {
    await supabase.storage.from(bucketName).remove([input.path]);
    return {
      ok: false,
      error: imagesError
        ? "The photo could not be saved."
        : `Projects can have up to ${maximumImages} photos.`,
    };
  }

  const isCover = !currentImages?.some((image) => image.is_cover);
  const sortOrder = (currentImages?.[0]?.sort_order ?? -1) + 1;
  const { error: insertError } = await supabase
    .from("project_story_images")
    .insert({
      alt_text: altText,
      height: input.height,
      is_cover: isCover,
      project_story_id: projectId,
      sort_order: sortOrder,
      storage_path: input.path,
      width: input.width,
    });

  if (insertError) {
    await supabase.storage.from(bucketName).remove([input.path]);
    return { ok: false, error: "The photo record could not be saved." };
  }

  await revalidateProject(projectId);
  return { ok: true };
}

export async function deleteProjectImage(
  projectId: number,
  imageId: number
): Promise<ImageActionResult> {
  await requireAdminSession();

  if (
    !isValidProjectId(projectId) ||
    !Number.isSafeInteger(imageId) ||
    imageId < 1 ||
    !isSupabaseAdminConfigured()
  ) {
    return { ok: false, error: "The photo could not be removed." };
  }

  const supabase = createSupabaseAdminClient();
  const { data: image, error: loadError } = await supabase
    .from("project_story_images")
    .select("id, is_cover, storage_path")
    .eq("id", imageId)
    .eq("project_story_id", projectId)
    .maybeSingle();

  if (loadError || !image) {
    return { ok: false, error: "The photo could not be found." };
  }

  const { error: storageError } = await supabase.storage
    .from(bucketName)
    .remove([image.storage_path]);
  if (storageError) {
    return { ok: false, error: "The stored photo could not be removed." };
  }

  const { error: deleteError } = await supabase
    .from("project_story_images")
    .delete()
    .eq("id", image.id)
    .eq("project_story_id", projectId);
  if (deleteError) {
    return { ok: false, error: "The photo record could not be removed." };
  }

  if (image.is_cover) {
    const { data: nextImage } = await supabase
      .from("project_story_images")
      .select("id")
      .eq("project_story_id", projectId)
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (nextImage) {
      await supabase
        .from("project_story_images")
        .update({ is_cover: true })
        .eq("id", nextImage.id);
    }
  }

  await revalidateProject(projectId);
  return { ok: true };
}
