import { isSupabaseAdminConfigured } from "@/lib/supabase/admin";
import Link from "next/link";
import { createProjectStory } from "../actions";
import ProjectStoryForm from "../ProjectStoryForm";

type NewProjectPageProps = {
  searchParams: Promise<{ error?: string | string[] }>;
};

const errorMessages: Record<string, string> = {
  configuration:
    "Supabase is not configured. Add the URL and secret key to your local environment.",
  "duplicate-slug":
    "That URL slug is already in use. Enter a different slug and try again.",
  save: "The project could not be saved. Check the Supabase configuration and try again.",
  slug: "Enter a title or URL slug containing letters or numbers.",
  title: "Enter a title between 3 and 160 characters.",
};

export default async function NewProjectPage({
  searchParams,
}: NewProjectPageProps) {
  const errorParam = (await searchParams).error;
  const errorKey = Array.isArray(errorParam) ? errorParam[0] : errorParam;
  const errorMessage = errorKey ? errorMessages[errorKey] : undefined;
  const isConfigured = isSupabaseAdminConfigured();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link
        className="text-sm font-medium text-[#17352B] underline decoration-[#17352B]/35 underline-offset-4 hover:decoration-[#17352B]"
        href="/admin/projects"
      >
        Back to projects
      </Link>

      <div className="mt-8 border-b border-[#20231F]/20 pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#687760]">
          Project story
        </p>
        <h1 className="mt-3 font-serif text-4xl text-[#17352B]">
          Add a project
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#20231F]/70">
          Record what was there, what the crew found, how the work was prepared,
          and the finished result.
        </p>
      </div>

      {!isConfigured || errorMessage ? (
        <p
          className="mt-8 border-l-2 border-[#A84F36] bg-[#A84F36]/10 px-4 py-3 text-sm text-[#7A3525]"
          role="alert"
        >
          {errorMessage ??
            "Supabase is not configured. Add the URL and secret key to your local environment."}
        </p>
      ) : null}

      {isConfigured ? (
        <ProjectStoryForm action={createProjectStory} isNew />
      ) : null}
    </div>
  );
}
