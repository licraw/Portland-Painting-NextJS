import {
  createHmac,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

export const ADMIN_SESSION_DURATION_SECONDS = 3 * 60 * 60;

type AdminSessionPayload = {
  exp: number;
  iat: number;
  v: 1;
};

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export async function verifyAdminPassword(
  password: string,
  storedHash: string
) {
  if (password.length === 0 || password.length > 256) return false;

  const [algorithm, encodedSalt, encodedHash, ...extraParts] =
    storedHash.split(":");

  if (
    algorithm !== "scrypt" ||
    !encodedSalt ||
    !encodedHash ||
    extraParts.length > 0
  ) {
    return false;
  }

  try {
    const salt = Buffer.from(encodedSalt, "base64url");
    const expectedHash = Buffer.from(encodedHash, "base64url");

    if (salt.length < 16 || expectedHash.length !== 64) return false;

    const actualHash = (await scrypt(password, salt, 64)) as Buffer;

    return timingSafeEqual(actualHash, expectedHash);
  } catch {
    return false;
  }
}

export function createAdminSessionToken(
  secret: string,
  nowInSeconds = Math.floor(Date.now() / 1000)
) {
  if (Buffer.byteLength(secret) < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 bytes long.");
  }

  const payload: AdminSessionPayload = {
    exp: nowInSeconds + ADMIN_SESSION_DURATION_SECONDS,
    iat: nowInSeconds,
    v: 1,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );

  return `${encodedPayload}.${sign(encodedPayload, secret)}`;
}

export function verifyAdminSessionToken(
  token: string,
  secret: string,
  nowInSeconds = Math.floor(Date.now() / 1000)
) {
  if (Buffer.byteLength(secret) < 32) return false;

  const [encodedPayload, encodedSignature, ...extraParts] = token.split(".");

  if (!encodedPayload || !encodedSignature || extraParts.length > 0) {
    return false;
  }

  try {
    const suppliedSignature = Buffer.from(encodedSignature, "base64url");
    const expectedSignature = Buffer.from(
      sign(encodedPayload, secret),
      "base64url"
    );

    if (
      suppliedSignature.length !== expectedSignature.length ||
      !timingSafeEqual(suppliedSignature, expectedSignature)
    ) {
      return false;
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as Partial<AdminSessionPayload>;

    return (
      payload.v === 1 &&
      Number.isInteger(payload.iat) &&
      Number.isInteger(payload.exp) &&
      payload.iat! <= nowInSeconds + 60 &&
      payload.exp! > nowInSeconds &&
      payload.exp! - payload.iat! === ADMIN_SESSION_DURATION_SECONDS
    );
  } catch {
    return false;
  }
}
