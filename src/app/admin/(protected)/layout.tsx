import { hasValidAdminSession } from "@/lib/admin-session";
import { redirect } from "next/navigation";
import { logout } from "./actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!(await hasValidAdminSession())) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#F2EEE5] text-[#20231F]">
      <header className="border-b border-[#20231F]/15 bg-[#FAF8F3]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#687760]">
              Portland Painting &amp; Restoration
            </p>
            <nav className="mt-2 flex gap-4 text-sm font-medium text-[#17352B]">
              <Link className="underline-offset-4 hover:underline" href="/admin/projects">Projects</Link>
              <Link className="underline-offset-4 hover:underline" href="/admin/resources">Resources</Link>
            </nav>
          </div>
          <form action={logout}>
            <button
              className="border border-[#20231F]/35 px-4 py-2 text-sm font-medium transition hover:border-[#20231F] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#17352B] focus:ring-offset-2 focus:ring-offset-[#FAF8F3]"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
