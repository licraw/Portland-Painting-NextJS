// pages/api/uploadPhoto.ts
import { NextRequest } from "next/server";
import Asana from "asana";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";

export const runtime = "nodejs";
export const config = { api: { bodyParser: false } }; // keep raw multipart

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("taskId");
    if (!taskId) return new Response("missing taskId", { status: 400 });

    const form = await req.formData();
    const file = form.get("photo") as File | null;
    if (!file) return new Response("no file", { status: 400 });

    if (file.size > 4.5 * 1024 * 1024)
      return new Response("file > 4.5 MB", { status: 413 });

    const tmp = path.join("/tmp", file.name);
    await writeFile(tmp, Buffer.from(await file.arrayBuffer()));

    const client = Asana.ApiClient.instance;
    client.authentications["token"].accessToken = process.env.ASANA_TOKEN as string;
    const attachments = new Asana.AttachmentsApi();

    await attachments.createAttachmentForObject({
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
