import ResourceContent from "@/app/components/ResourceContent";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ResourcePreview({params}:{params:Promise<{id:string}>}) { const id=Number((await params).id); const {data:resource}=await createSupabaseAdminClient().from("resource_pages").select("*").eq("id",id).maybeSingle(); if(!resource)notFound(); return <div className="mx-auto max-w-4xl px-6 py-12"><div className="mb-8 flex justify-between"><Link className="text-sm underline underline-offset-4" href="/admin/resources">Back to resources</Link><Link className="text-sm underline underline-offset-4" href={`/admin/resources/${id}/edit`}>Edit</Link></div><p className="mb-4 font-mono text-xs uppercase tracking-[.16em] text-[#687760]">{resource.status} · Admin preview</p><ResourceContent resource={resource}/></div> }
