import { hasValidAdminSession } from "@/lib/admin-session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  redirect(
    (await hasValidAdminSession()) ? "/admin/projects" : "/admin/login"
  );
}
