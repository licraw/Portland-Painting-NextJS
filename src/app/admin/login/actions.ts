"use server";

import { verifyAdminPassword } from "@/lib/admin-auth";
import {
  createAdminSession,
  isAdminAuthConfigured,
} from "@/lib/admin-session";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  if (!isAdminAuthConfigured()) {
    redirect("/admin/login?error=configuration");
  }

  const password = formData.get("password");

  if (
    typeof password !== "string" ||
    !(await verifyAdminPassword(password, process.env.ADMIN_PASSWORD_HASH!))
  ) {
    redirect("/admin/login?error=invalid");
  }

  await createAdminSession();
  redirect("/admin/projects");
}
