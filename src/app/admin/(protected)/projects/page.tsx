import {
  createSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase/admin";
import type { ProjectStory } from "@/types/supabase";
import Link from "next/link";
import { deleteProjectStory } from "./actions";
import DeleteProjectButton from "./DeleteProjectButton";

type AdminProjectsPageProps = {
  searchParams: Promise<{
    created?: string | string[];
    deleted?: string | string[];
    error?: string | string[];
    updated?: string | string[];
  }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(value)
  );
}

export default async function AdminProjectsPage({
  searchParams,
}: AdminProjectsPageProps) {
  const isConfigured = isSupabaseAdminConfigured();
  let projects: ProjectStory[] = [];
  let loadFailed = false;

  if (isConfigured) {
    const { data, error } = await createSupabaseAdminClient()
      .from("project_stories")
      .select("*")
      .order("updated_at", { ascending: false });

    projects = data ?? [];
    loadFailed = Boolean(error);
  }

  const resolvedSearchParams = await searchParams;
  const createdParam = resolvedSearchParams.created;
  const wasCreated = Array.isArray(createdParam)
    ? Boolean(createdParam[0])
    : Boolean(createdParam);
  const updatedParam = resolvedSearchParams.updated;
  const wasUpdated = Array.isArray(updatedParam)
    ? Boolean(updatedParam[0])
    : Boolean(updatedParam);
  const deletedParam = resolvedSearchParams.deleted;
  const wasDeleted = Array.isArray(deletedParam)
    ? Boolean(deletedParam[0])
    : Boolean(deletedParam);
  const errorParam = resolvedSearchParams.error;
  const hasActionError = Array.isArray(errorParam)
    ? Boolean(errorParam[0])
    : Boolean(errorParam);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-6 border-b border-[#20231F]/20 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#687760]">
            Project stories
          </p>
          <h1 className="mt-3 font-serif text-4xl text-[#17352B]">Projects</h1>
        </div>
        {isConfigured ? (
          <Link
            className="inline-flex justify-center bg-[#17352B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#244B3D] focus:outline-none focus:ring-2 focus:ring-[#17352B] focus:ring-offset-2 focus:ring-offset-[#F2EEE5]"
            href="/admin/projects/new"
          >
            Add project
          </Link>
        ) : null}
      </div>

      {wasCreated || wasUpdated || wasDeleted ? (
        <p
          className="mt-8 border-l-2 border-[#687760] bg-[#687760]/10 px-4 py-3 text-sm text-[#17352B]"
          role="status"
        >
          {wasDeleted
            ? "Project deleted."
            : wasUpdated
              ? "Project updated."
              : "Project saved."}
        </p>
      ) : null}

      {hasActionError ? (
        <p
          className="mt-8 border-l-2 border-[#A84F36] bg-[#A84F36]/10 px-4 py-3 text-sm text-[#7A3525]"
          role="alert"
        >
          The project action could not be completed. Refresh and try again.
        </p>
      ) : null}

      {!isConfigured ? (
        <div className="mt-10 border border-[#20231F]/20 bg-[#FAF8F3] p-6">
          <h2 className="font-serif text-2xl text-[#17352B]">
            Supabase configuration required
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#20231F]/70">
            Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY to your local
            environment, then restart the development server.
          </p>
        </div>
      ) : loadFailed ? (
        <p
          className="mt-8 border-l-2 border-[#A84F36] bg-[#A84F36]/10 px-4 py-3 text-sm text-[#7A3525]"
          role="alert"
        >
          Projects could not be loaded. Check the Supabase configuration.
        </p>
      ) : projects.length === 0 ? (
        <div className="mt-10 border border-dashed border-[#20231F]/30 px-6 py-12 text-center">
          <h2 className="font-serif text-2xl text-[#17352B]">No projects yet</h2>
          <p className="mt-3 text-sm text-[#20231F]/65">
            Add the first project story when you are ready.
          </p>
        </div>
      ) : (
        <div className="mt-8 divide-y divide-[#20231F]/15 border-y border-[#20231F]/15">
          {projects.map((project) => (
            <article
              className="grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-center"
              key={project.id}
            >
              <div>
                <h2 className="font-serif text-2xl text-[#17352B]">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm text-[#20231F]/60">
                  {[project.service_type, project.location]
                    .filter(Boolean)
                    .join(" · ") || "No project details added"}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#687760]">
                  {project.status}
                </p>
                <p className="mt-2 text-xs text-[#20231F]/55">
                  Updated {formatDate(project.updated_at)}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 sm:justify-end">
                  <Link
                    className="text-sm font-medium text-[#17352B] underline decoration-[#17352B]/35 underline-offset-4 hover:decoration-[#17352B]"
                    href={`/admin/projects/${project.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="text-sm font-medium text-[#17352B] underline decoration-[#17352B]/35 underline-offset-4 hover:decoration-[#17352B]"
                    href={`/admin/projects/${project.id}/edit`}
                  >
                    Edit
                  </Link>
                  <DeleteProjectButton
                    action={deleteProjectStory.bind(null, project.id)}
                    projectTitle={project.title}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
