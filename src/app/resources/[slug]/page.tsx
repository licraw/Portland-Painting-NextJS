import ResourceContent from "@/app/components/ResourceContent";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

async function getResource(slug:string){ const {data}=await createSupabasePublicClient().from("resource_pages").select("*").eq("slug",slug).eq("status","published").lte("published_at",new Date().toISOString()).maybeSingle(); return data; }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const resource=await getResource((await params).slug); if(!resource)return{}; const url=`https://www.paintpdx.com/resources/${resource.slug}`; return{title:`${resource.title} | Portland Painting & Restoration`,description:resource.summary??undefined,alternates:{canonical:url},openGraph:{title:resource.title,description:resource.summary??undefined,url,type:"article"}}}
export default async function ResourcePage({params}:{params:Promise<{slug:string}>}){const resource=await getResource((await params).slug);if(!resource)notFound();return <div className="bg-[#F2EEE5] px-6 py-14 text-[#20231F] sm:py-20"><div className="mx-auto max-w-4xl"><ResourceContent resource={resource}/></div></div>}
