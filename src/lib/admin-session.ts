import "server-only";

import { cookies } from "next/headers";
import {
  ADMIN_SESSION_DURATION_SECONDS,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

const ADMIN_SESSION_COOKIE = "ppr_admin_session";

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing or shorter than 32 bytes."
    );
  }

  return secret;
}

export function isAdminAuthConfigured() {
  return Boolean(
    process.env.ADMIN_PASSWORD_HASH?.startsWith("scrypt:") &&
      process.env.ADMIN_SESSION_SECRET &&
      Buffer.byteLength(process.env.ADMIN_SESSION_SECRET) >= 32
  );
}

export async function createAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(
    ADMIN_SESSION_COOKIE,
    createAdminSessionToken(getSessionSecret()),
    {
      httpOnly: true,
      maxAge: ADMIN_SESSION_DURATION_SECONDS,
      path: "/admin",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    }
  );
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_SESSION_COOKIE, "", {
    expires: new Date(0),
    httpOnly: true,
    path: "/admin",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function hasValidAdminSession() {
  if (!isAdminAuthConfigured()) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  return token
    ? verifyAdminSessionToken(token, process.env.ADMIN_SESSION_SECRET!)
    : false;
}
