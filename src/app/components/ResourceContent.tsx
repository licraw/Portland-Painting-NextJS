import type { ResourcePage } from "@/types/supabase";
import Image from "next/image";

type Section={heading:string;body:string};
export default function ResourceContent({ resource }: { resource: ResourcePage }) {
  const sections = Array.isArray(resource.sections) ? resource.sections as Section[] : [];
  return <article><header className="border-b border-[#20231F]/20 pb-10"><p className="font-mono text-xs uppercase tracking-[.16em] text-[#687760]">{resource.category}</p><h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-[#17352B] sm:text-5xl">{resource.title}</h1>{resource.summary ? <p className="mt-6 max-w-2xl text-lg leading-8 text-[#20231F]/75">{resource.summary}</p>:null}</header>
    {resource.hero_image_url ? <figure className="mt-8 overflow-hidden bg-[#E7E0D3]"><Image className="h-auto max-h-[36rem] w-full object-cover" src={resource.hero_image_url} alt={resource.hero_image_alt ?? ""} width={1200} height={720} unoptimized/></figure>:null}
    {resource.introduction ? <p className="max-w-3xl py-9 text-lg leading-8 text-[#20231F]/80 whitespace-pre-line">{resource.introduction}</p>:null}
    <div className="divide-y divide-[#20231F]/15">{sections.map((section,i)=><section className="grid gap-4 py-9 sm:grid-cols-[14rem_1fr]" key={`${section.heading}-${i}`}><h2 className="font-serif text-2xl text-[#17352B]">{section.heading}</h2><p className="whitespace-pre-line leading-7 text-[#20231F]/75">{section.body}</p></section>)}</div>
    {(resource.download_url || resource.related_service_url) ? <footer className="mt-8 flex flex-wrap gap-3 border-t border-[#20231F]/20 pt-8">{resource.download_url ? <a className="bg-[#17352B] px-5 py-3 text-sm font-semibold text-white" href={resource.download_url} download>{resource.download_label}</a>:null}{resource.related_service_url ? <a className="border border-[#17352B] px-5 py-3 text-sm font-semibold text-[#17352B]" href={resource.related_service_url}>{resource.related_service_label}</a>:null}</footer>:null}
  </article>;
}
