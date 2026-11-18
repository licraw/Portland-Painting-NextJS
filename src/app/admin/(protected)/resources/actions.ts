"use server";

import { hasValidAdminSession } from "@/lib/admin-session";
import { createSupabaseAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase/admin";
import type { Json } from "@/types/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function text(formData: FormData, name: string) {
  const value = formData.get(name);
  if (typeof value !== "string") return null;
  return value.trim() || null;
}

function slugify(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 160);
}

async function requireAdmin() {
  if (!(await hasValidAdminSession())) redirect("/admin/login");
}

function payload(formData: FormData) {
  const title = text(formData, "title");
  const category = text(formData, "category");
  if (!title || title.length < 3 || title.length > 160) return { error: "title" } as const;
  if (!category || category.length < 2 || category.length > 80) return { error: "category" } as const;
  const slug = slugify(text(formData, "slug") ?? title);
  if (!slug) return { error: "slug" } as const;

  const sections = [1, 2, 3, 4].map((index) => ({
    heading: text(formData, `section_${index}_heading`),
    body: text(formData, `section_${index}_body`),
  })).filter((section) => section.heading && section.body) as { heading: string; body: string }[];
  const status = formData.get("status") === "published" ? "published" : "draft";
  return { data: {
    category, download_label: text(formData, "download_label"), download_url: text(formData, "download_url"),
    hero_image_alt: text(formData, "hero_image_alt"), hero_image_url: text(formData, "hero_image_url"),
    introduction: text(formData, "introduction"), related_service_label: text(formData, "related_service_label"),
    related_service_url: text(formData, "related_service_url"), sections: sections as Json, slug, status,
    summary: text(formData, "summary"), title,
  }} as const;
}

export async function createResource(formData: FormData) {
  await requireAdmin();
  if (!isSupabaseAdminConfigured()) redirect("/admin/resources/new?error=configuration");
  const result = payload(formData);
  if ("error" in result) redirect(`/admin/resources/new?error=${result.error}`);
  const { data, error } = await createSupabaseAdminClient().from("resource_pages").insert({
    ...result.data, published_at: result.data.status === "published" ? new Date().toISOString() : null,
  }).select("id").single();
  if (error) redirect(`/admin/resources/new?error=${error.code === "23505" ? "duplicate-slug" : "save"}`);
  revalidatePath("/admin/resources"); revalidatePath("/resources"); revalidatePath(`/resources/${result.data.slug}`);
  redirect(`/admin/resources?created=${data.id}`);
}

export async function updateResource(id: number, formData: FormData) {
  await requireAdmin();
  if (!Number.isSafeInteger(id) || id < 1 || !isSupabaseAdminConfigured()) redirect("/admin/resources?error=save");
  const result = payload(formData);
  if ("error" in result) redirect(`/admin/resources/${id}/edit?error=${result.error}`);
  const supabase = createSupabaseAdminClient();
  const { data: current } = await supabase.from("resource_pages").select("slug,published_at").eq("id", id).maybeSingle();
  if (!current) redirect("/admin/resources?error=not-found");
  const { error } = await supabase.from("resource_pages").update({
    ...result.data, published_at: result.data.status === "published" ? current.published_at ?? new Date().toISOString() : null,
  }).eq("id", id);
  if (error) redirect(`/admin/resources/${id}/edit?error=${error.code === "23505" ? "duplicate-slug" : "save"}`);
  revalidatePath("/admin/resources"); revalidatePath("/resources");
  revalidatePath(`/resources/${current.slug}`); revalidatePath(`/resources/${result.data.slug}`);
  redirect(`/admin/resources?updated=${id}`);
}
