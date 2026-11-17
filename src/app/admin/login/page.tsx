import { hasValidAdminSession } from "@/lib/admin-session";
import { redirect } from "next/navigation";
import { login } from "./actions";

type LoginPageProps = {
  searchParams: Promise<{ error?: string | string[] }>;
};

const errorMessages: Record<string, string> = {
  configuration: "Admin access has not been configured yet.",
  invalid: "That password was not accepted.",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  if (await hasValidAdminSession()) {
    redirect("/admin/projects");
  }

  const errorParam = (await searchParams).error;
  const errorKey = Array.isArray(errorParam) ? errorParam[0] : errorParam;
  const errorMessage = errorKey ? errorMessages[errorKey] : undefined;

  return (
    <div className="min-h-screen bg-[#F2EEE5] px-6 py-16 text-[#20231F]">
      <div className="mx-auto max-w-md border border-[#20231F]/20 bg-[#FAF8F3] p-8 shadow-[0_16px_40px_rgba(32,35,31,0.08)] sm:p-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[#687760]">
          Project Stories
        </p>
        <h1 className="font-serif text-3xl leading-tight text-[#17352B]">
          Admin sign in
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#20231F]/70">
          Enter the shared office password. You will be asked to sign in again
          after three hours.
        </p>

        {errorMessage ? (
          <p
            className="mt-6 border-l-2 border-[#A84F36] bg-[#A84F36]/10 px-4 py-3 text-sm text-[#7A3525]"
            role="alert"
          >
            {errorMessage}
          </p>
        ) : null}

        <form action={login} className="mt-8 space-y-5">
          <div>
            <label
              className="block text-sm font-medium text-[#20231F]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              autoComplete="current-password"
              autoFocus
              className="mt-2 w-full border border-[#20231F]/35 bg-white px-4 py-3 text-base outline-none transition focus:border-[#17352B] focus:ring-2 focus:ring-[#17352B]/20"
              id="password"
              maxLength={256}
              name="password"
              required
              type="password"
            />
          </div>
          <button
            className="w-full bg-[#17352B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#244B3D] focus:outline-none focus:ring-2 focus:ring-[#17352B] focus:ring-offset-2 focus:ring-offset-[#FAF8F3]"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
