import type { ProjectStory } from "@/types/supabase";

type ProjectStoryContentProps = {
  project: ProjectStory;
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

export default function ProjectStoryContent({
  project,
}: ProjectStoryContentProps) {
  const details = [
    project.service_type,
    project.location,
    project.project_date ? formatProjectDate(project.project_date) : null,
  ].filter(Boolean);
  const hasStoryContent = storySections.some(([field]) =>
    Boolean(project[field])
  );

  return (
    <>
      <header className="border-b border-[#20231F]/20 pb-10">
        <h1 className="max-w-3xl font-serif text-4xl leading-tight text-[#17352B] sm:text-5xl">
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
            <section
              className="grid gap-4 py-9 sm:grid-cols-[14rem_1fr]"
              key={field}
            >
              <h2 className="font-serif text-2xl text-[#17352B]">{heading}</h2>
              <p className="whitespace-pre-line text-base leading-7 text-[#20231F]/75">
                {project[field]}
              </p>
            </section>
          ) : null
        )}
      </div>

      {!project.summary && !hasStoryContent ? (
        <p className="mt-10 border border-dashed border-[#20231F]/30 px-6 py-10 text-center text-sm text-[#20231F]/65">
          This project does not have story content yet.
        </p>
      ) : null}
    </>
  );
}
