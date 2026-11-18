import type { ResourcePage } from "@/types/supabase";

type Section = { heading: string; body: string };
const input = "mt-2 w-full border border-[#20231F]/30 bg-white px-4 py-3 outline-none focus:border-[#17352B] focus:ring-2 focus:ring-[#17352B]/20";
const label = "block text-sm font-medium text-[#20231F]";

export default function ResourceForm({ action, resource }: { action: (data: FormData) => void | Promise<void>; resource?: ResourcePage }) {
  const sections = Array.isArray(resource?.sections) ? resource.sections as Section[] : [];
  return <form action={action} className="mt-10 space-y-10">
    <fieldset className="space-y-6"><legend className="font-serif text-2xl text-[#17352B]">Basics</legend>
      <div><label className={label} htmlFor="title">Title</label><input autoFocus className={input} defaultValue={resource?.title} id="title" maxLength={160} minLength={3} name="title" required /></div>
      <div className="grid gap-6 sm:grid-cols-2"><div><label className={label} htmlFor="category">Category</label><input className={input} defaultValue={resource?.category} id="category" list="resource-categories" maxLength={80} name="category" required /><datalist id="resource-categories"><option value="Office forms"/><option value="Painting and preparation"/><option value="Carpentry and repairs"/><option value="Restoration and older homes"/><option value="Commercial and HOA"/><option value="Homeowner guides"/></datalist></div>
      <div><label className={label} htmlFor="slug">URL slug (optional)</label><input className={input} defaultValue={resource?.slug} id="slug" name="slug" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" /></div></div>
      <div><label className={label} htmlFor="summary">Brief description</label><textarea className={input} defaultValue={resource?.summary ?? ""} id="summary" maxLength={500} name="summary" rows={3}/></div>
      <div><label className={label} htmlFor="introduction">Introduction</label><textarea className={input} defaultValue={resource?.introduction ?? ""} id="introduction" name="introduction" rows={5}/></div>
    </fieldset>
    <fieldset className="space-y-7 border-t border-[#20231F]/15 pt-8"><legend className="font-serif text-2xl text-[#17352B]">Page sections</legend>{[0,1,2,3].map((i)=><div className="grid gap-3" key={i}><label className={label} htmlFor={`section_${i+1}_heading`}>Section {i+1}</label><input className={input} defaultValue={sections[i]?.heading ?? ""} id={`section_${i+1}_heading`} name={`section_${i+1}_heading`} placeholder="Section heading"/><textarea className={input} defaultValue={sections[i]?.body ?? ""} name={`section_${i+1}_body`} placeholder="Section content" rows={5}/></div>)}</fieldset>
    <fieldset className="grid gap-6 border-t border-[#20231F]/15 pt-8 sm:grid-cols-2"><legend className="mb-5 font-serif text-2xl text-[#17352B]">Optional media and links</legend>
      {[['hero_image_url','Image URL or site path'],['hero_image_alt','Image description'],['download_label','Download label'],['download_url','PDF URL or site path'],['related_service_label','Related service label'],['related_service_url','Related service URL']].map(([name,textLabel])=><div key={name}><label className={label} htmlFor={name}>{textLabel}</label><input className={input} defaultValue={(resource?.[name as keyof ResourcePage] as string | null) ?? ""} id={name} name={name}/></div>)}</fieldset>
    <div className="flex gap-3 justify-end border-t border-[#20231F]/15 pt-8"><button className="border border-[#17352B] px-5 py-3 text-sm font-semibold text-[#17352B]" name="status" value="draft">Save draft</button><button className="bg-[#17352B] px-5 py-3 text-sm font-semibold text-white" name="status" value="published">{resource?.status === "published" ? "Save published" : "Publish"}</button></div>
  </form>;
}
