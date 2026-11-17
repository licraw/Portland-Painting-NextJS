"use client";

type DeleteProjectButtonProps = {
  action: () => void | Promise<void>;
  projectTitle: string;
};

export default function DeleteProjectButton({
  action,
  projectTitle,
}: DeleteProjectButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Delete “${projectTitle}”? This cannot be undone.`
        );

        if (!confirmed) event.preventDefault();
      }}
    >
      <button
        className="text-sm font-medium text-[#8A3F2B] underline decoration-[#8A3F2B]/35 underline-offset-4 transition hover:decoration-[#8A3F2B] focus:outline-none focus:ring-2 focus:ring-[#8A3F2B] focus:ring-offset-2 focus:ring-offset-[#F2EEE5]"
        type="submit"
      >
        Delete
      </button>
    </form>
  );
}
