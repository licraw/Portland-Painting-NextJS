/**
 * POST /api/uploadPhoto?taskId=123
 * Multipart endpoint: expects a single <input name="photo" />
 * Keeps each request < 4.5 MB to avoid Vercel’s limit.
 */

const Asana = require("asana");
const fs = require("fs");
const path = require("path");
const { writeFile } = require("fs/promises");
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    /* 1️⃣  validate query */
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("taskId");
    if (!taskId) return new Response("missing taskId", { status: 400 });

    /* 2️⃣  parse multipart */
    const form = await req.formData();
    const file = form.get("photo");
    if (!file) return new Response("no file", { status: 400 });
    if ((file as File).size > 4.5 * 1024 * 1024)
      return new Response("file > 4.5 MB", { status: 413 });

    /* 3️⃣  temp‑save */
    const tmp = path.join("/tmp", (file as File).name);
    await writeFile(tmp, Buffer.from(await (file as File).arrayBuffer()));

    /* 4️⃣  init Asana */
    const client = Asana.ApiClient.instance;
    const token = client.authentications["token"];
    token.accessToken = process.env.ASANA_TOKEN;

    if (!token.accessToken) {
      console.error("ASANA_TOKEN not configured");
      return new Response(
        JSON.stringify({ error: "ASANA_TOKEN not configured." }),
        { status: 500 }
      );
    }

    const attachmentsApiInstance = new Asana.AttachmentsApi();

    /* 5️⃣  upload */
    await attachmentsApiInstance.createAttachmentForObject({
      parent: taskId,
      file: fs.createReadStream(tmp),
    });

    fs.unlinkSync(tmp);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("uploadPhoto error", err);
    return new Response(JSON.stringify({ error: "upload failed" }), { status: 500 });
  }
}
