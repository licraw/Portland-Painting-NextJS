import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";

export default async function AdminResourcesPage({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams;
  const { data: resources, error } = await createSupabaseAdminClient().from("resource_pages").select("*").order("updated_at", { ascending: false });
  return <div className="mx-auto max-w-6xl px-6 py-12">
    <header className="flex items-end justify-between gap-5 border-b border-[#20231F]/20 pb-8"><div><p className="font-mono text-xs uppercase tracking-[.16em] text-[#687760]">Information center</p><h1 className="mt-3 font-serif text-4xl text-[#17352B]">Resources</h1></div><Link className="bg-[#17352B] px-5 py-3 text-sm font-semibold text-white" href="/admin/resources/new">Add resource</Link></header>
    {params.created || params.updated ? <p className="mt-8 border-l-2 border-[#687760] bg-[#687760]/10 px-4 py-3 text-sm text-[#17352B]" role="status">Resource saved.</p> : null}
    {error ? <p className="mt-8 text-sm text-[#8A3F2B]" role="alert">Resources could not be loaded.</p> : null}
    {!error && resources?.length === 0 ? <p className="mt-10 border border-dashed border-[#20231F]/30 p-10 text-center">No resources yet.</p> : null}
    <div className="mt-8 divide-y divide-[#20231F]/15 border-y border-[#20231F]/15">{resources?.map(resource => <article className="grid gap-4 py-6 sm:grid-cols-[1fr_auto]" key={resource.id}><div><p className="text-xs uppercase tracking-[.12em] text-[#687760]">{resource.category}</p><h2 className="mt-2 font-serif text-2xl text-[#17352B]">{resource.title}</h2></div><div className="flex items-center gap-4"><span className="font-mono text-xs uppercase text-[#687760]">{resource.status}</span><Link className="text-sm underline underline-offset-4" href={resource.status === "published" ? `/resources/${resource.slug}` : `/admin/resources/${resource.id}`}>View</Link><Link className="text-sm underline underline-offset-4" href={`/admin/resources/${resource.id}/edit`}>Edit</Link></div></article>)}</div>
  </div>;
}
