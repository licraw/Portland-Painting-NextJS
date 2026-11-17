import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

function readHidden(label) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY || typeof process.stdin.setRawMode !== "function") {
      reject(new Error("Run this command in an interactive terminal."));
      return;
    }

    let value = "";

    const cleanup = () => {
      process.stdin.removeListener("data", onData);
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdout.write("\n");
    };

    const onData = (chunk) => {
      for (const character of chunk) {
        if (character === "\u0003") {
          cleanup();
          reject(new Error("Cancelled."));
          return;
        }

        if (character === "\r" || character === "\n") {
          cleanup();
          resolve(value);
          return;
        }

        if (character === "\u007f" || character === "\b") {
          if (value.length > 0) {
            value = value.slice(0, -1);
            process.stdout.write("\b \b");
          }
          continue;
        }

        if (character >= " " && character <= "~" && value.length < 256) {
          value += character;
          process.stdout.write("*");
        }
      }
    };

    process.stdout.write(label);
    process.stdin.setEncoding("utf8");
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", onData);
  });
}

async function main() {
  const password = await readHidden("Shared admin password: ");

  if (password.length < 14) {
    throw new Error("Use a password with at least 14 characters.");
  }

  const confirmation = await readHidden("Confirm password: ");

  if (password !== confirmation) {
    throw new Error("The passwords did not match.");
  }

  const salt = randomBytes(16);
  const derivedKey = await scrypt(password, salt, 64);
  const passwordHash = `scrypt:${salt.toString("base64url")}:${derivedKey.toString("base64url")}`;
  const sessionSecret = randomBytes(48).toString("base64url");

  console.log("\nAdd these values to .env.local or your hosting environment:\n");
  console.log(`ADMIN_PASSWORD_HASH=${passwordHash}`);
  console.log(`ADMIN_SESSION_SECRET=${sessionSecret}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
