import {
  createSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase/admin";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type ProjectPreviewPageProps = {
  params: Promise<{ id: string }>;
};

const storySections = [
  ["problem", "Problem or existing condition"],
  ["findings", "What we found"],
  ["approach", "How we approached it"],
  ["preparation", "Repair and preparation"],
  ["result", "Finished result"],
] as const;

function formatProjectDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default async function ProjectPreviewPage({
  params,
}: ProjectPreviewPageProps) {
  if (!isSupabaseAdminConfigured()) redirect("/admin/projects");

  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id < 1) notFound();

  const { data: project, error } = await createSupabaseAdminClient()
    .from("project_stories")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !project) notFound();

  const details = [
    project.service_type,
    project.location,
    project.project_date ? formatProjectDate(project.project_date) : null,
  ].filter(Boolean);

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          className="text-sm font-medium text-[#17352B] underline decoration-[#17352B]/35 underline-offset-4 hover:decoration-[#17352B]"
          href="/admin/projects"
        >
          Back to projects
        </Link>
        <Link
          className="border border-[#17352B] px-4 py-2 text-sm font-semibold text-[#17352B] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#17352B] focus:ring-offset-2 focus:ring-offset-[#F2EEE5]"
          href={`/admin/projects/${project.id}/edit`}
        >
          Edit project
        </Link>
      </div>

      <header className="mt-10 border-b border-[#20231F]/20 pb-10">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#687760]">
          {project.status} · Admin preview
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-[#17352B] sm:text-5xl">
          {project.title}
        </h1>
        {project.summary ? (
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#20231F]/75">
            {project.summary}
          </p>
        ) : null}
        {details.length > 0 ? (
          <p className="mt-6 text-sm text-[#20231F]/60">
            {details.join(" · ")}
          </p>
        ) : null}
      </header>

      <div className="divide-y divide-[#20231F]/15">
        {storySections.map(([field, heading]) =>
          project[field] ? (
            <section className="grid gap-4 py-9 sm:grid-cols-[14rem_1fr]" key={field}>
              <h2 className="font-serif text-2xl text-[#17352B]">{heading}</h2>
              <p className="whitespace-pre-line text-base leading-7 text-[#20231F]/75">
                {project[field]}
              </p>
            </section>
          ) : null
        )}
      </div>

      {!project.summary &&
      !storySections.some(([field]) => Boolean(project[field])) ? (
        <p className="mt-10 border border-dashed border-[#20231F]/30 px-6 py-10 text-center text-sm text-[#20231F]/65">
          This project does not have story content yet. Edit it to add details.
        </p>
      ) : null}
    </article>
  );
}
