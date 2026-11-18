import type { ProjectStory } from "@/types/supabase";

type ProjectStoryFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  isNew?: boolean;
  project?: ProjectStory;
};

const inputClassName =
  "mt-2 w-full border border-[#20231F]/30 bg-white px-4 py-3 text-base outline-none transition focus:border-[#17352B] focus:ring-2 focus:ring-[#17352B]/20";
const labelClassName = "block text-sm font-medium text-[#20231F]";

const storyFields = [
  ["problem", "Problem or existing condition"],
  ["findings", "What we found"],
  ["approach", "How we approached it"],
  ["preparation", "Repair and preparation"],
  ["result", "Finished result"],
] as const;

export default function ProjectStoryForm({
  action,
  isNew = false,
  project,
}: ProjectStoryFormProps) {
  return (
    <form action={action} className="mt-10 space-y-12">
      <fieldset className="space-y-6">
        <legend className="font-serif text-2xl text-[#17352B]">Basics</legend>
        <div>
          <label className={labelClassName} htmlFor="title">
            Project title
          </label>
          <input
            autoFocus
            className={inputClassName}
            defaultValue={project?.title}
            id="title"
            maxLength={160}
            minLength={3}
            name="title"
            required
          />
        </div>
        <div>
          <label className={labelClassName} htmlFor="slug">
            URL slug{" "}
            <span className="font-normal text-[#20231F]/55">(optional)</span>
          </label>
          <input
            autoCapitalize="none"
            className={inputClassName}
            defaultValue={project?.slug}
            id="slug"
            maxLength={160}
            name="slug"
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            placeholder="generated-from-the-title"
            spellCheck={false}
          />
        </div>
        <div>
          <label className={labelClassName} htmlFor="summary">
            Short introduction
          </label>
          <textarea
            className={inputClassName}
            defaultValue={project?.summary ?? ""}
            id="summary"
            maxLength={500}
            name="summary"
            rows={4}
          />
        </div>
      </fieldset>

      <fieldset className="grid gap-6 border-t border-[#20231F]/15 pt-10 sm:grid-cols-3">
        <legend className="mb-6 font-serif text-2xl text-[#17352B]">
          Project details
        </legend>
        <div>
          <label className={labelClassName} htmlFor="service_type">
            Service
          </label>
          <input
            className={inputClassName}
            defaultValue={project?.service_type ?? ""}
            id="service_type"
            maxLength={80}
            name="service_type"
            placeholder="Exterior painting"
          />
        </div>
        <div>
          <label className={labelClassName} htmlFor="location">
            General location
          </label>
          <input
            className={inputClassName}
            defaultValue={project?.location ?? ""}
            id="location"
            maxLength={120}
            name="location"
            placeholder="Southeast Portland"
          />
        </div>
        <div>
          <label className={labelClassName} htmlFor="project_date">
            Completion date
          </label>
          <input
            className={inputClassName}
            defaultValue={project?.project_date ?? ""}
            id="project_date"
            name="project_date"
            type="date"
          />
        </div>
      </fieldset>

      <fieldset className="space-y-7 border-t border-[#20231F]/15 pt-10">
        <legend className="font-serif text-2xl text-[#17352B]">Story</legend>
        {storyFields.map(([name, label]) => (
          <div key={name}>
            <label className={labelClassName} htmlFor={name}>
              {label}
            </label>
            <textarea
              className={inputClassName}
              defaultValue={project?.[name] ?? ""}
              id={name}
              name={name}
              rows={5}
            />
          </div>
        ))}
      </fieldset>

      <div className="flex flex-col-reverse gap-3 border-t border-[#20231F]/15 pt-8 sm:flex-row sm:justify-end">
        {isNew ? (
          <>
            <input name="status" type="hidden" value="draft" />
            <button
              className="bg-[#17352B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#244B3D] focus:outline-none focus:ring-2 focus:ring-[#17352B] focus:ring-offset-2 focus:ring-offset-[#F2EEE5]"
              type="submit"
            >
              Save and add photos
            </button>
          </>
        ) : (
          <>
            <button
              className="border border-[#17352B] px-5 py-3 text-sm font-semibold text-[#17352B] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#17352B] focus:ring-offset-2 focus:ring-offset-[#F2EEE5]"
              name="status"
              type="submit"
              value="draft"
            >
              Save draft
            </button>
            <button
              className="bg-[#17352B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#244B3D] focus:outline-none focus:ring-2 focus:ring-[#17352B] focus:ring-offset-2 focus:ring-offset-[#F2EEE5]"
              name="status"
              type="submit"
              value="published"
            >
              {project?.status === "published" ? "Save published" : "Publish"}
            </button>
          </>
        )}
      </div>
    </form>
  );
}
