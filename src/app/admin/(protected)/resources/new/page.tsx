import Link from "next/link";
import ResourceForm from "../ResourceForm";
import { createResource } from "../actions";

export default function NewResourcePage() {
  return <div className="mx-auto max-w-4xl px-6 py-12"><Link className="text-sm underline underline-offset-4" href="/admin/resources">Back to resources</Link><header className="mt-8 border-b border-[#20231F]/20 pb-8"><p className="font-mono text-xs uppercase tracking-[.16em] text-[#687760]">Resource center</p><h1 className="mt-3 font-serif text-4xl text-[#17352B]">Add a resource</h1><p className="mt-4 max-w-2xl text-[#20231F]/70">Put the useful information on the page first. Add a PDF only when it helps someone print or save the material.</p></header><ResourceForm action={createResource}/></div>;
}
