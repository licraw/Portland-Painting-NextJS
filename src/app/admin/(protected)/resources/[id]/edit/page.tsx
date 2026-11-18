import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { notFound } from "next/navigation";
import ResourceForm from "../../ResourceForm";
import { updateResource } from "../../actions";

export default async function EditResourcePage({ params }: { params: Promise<{id:string}> }) {
  const id = Number((await params).id); if (!Number.isSafeInteger(id)) notFound();
  const { data: resource } = await createSupabaseAdminClient().from("resource_pages").select("*").eq("id",id).maybeSingle(); if (!resource) notFound();
  return <div className="mx-auto max-w-4xl px-6 py-12"><div className="flex justify-between"><Link className="text-sm underline underline-offset-4" href="/admin/resources">Back to resources</Link><Link className="text-sm underline underline-offset-4" href={resource.status === "published" ? `/resources/${resource.slug}` : `/admin/resources/${resource.id}`}>View</Link></div><h1 className="mt-8 border-b border-[#20231F]/20 pb-8 font-serif text-4xl text-[#17352B]">Edit resource</h1><ResourceForm action={updateResource.bind(null,id)} resource={resource}/></div>;
}
