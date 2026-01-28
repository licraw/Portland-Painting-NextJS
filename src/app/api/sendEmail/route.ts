import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_PER_FILE = 2 * 1024 * 1024; // 2 MB each to stay under Vercel request limits
const MAX_TOTAL = 8 * 1024 * 1024; // cap total payload ~8 MB

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const name = (form.get("name") as string) ?? "Unknown";
    const email = (form.get("email") as string) ?? "";
    const formType = (form.get("formType") as string) ?? "contact";
    const bodyText = (form.get("bodyText") as string) ?? "";
    const asanaTaskId = (form.get("asanaTaskId") as string) ?? "";

    const incomingPhotos = form.getAll("photos") as File[];

    // Enforce per-file and aggregate size to avoid 413s
    const attachments = [];
    let total = 0;
    for (const file of incomingPhotos) {
      if (file.size > MAX_PER_FILE) continue;
      if (total + file.size > MAX_TOTAL) break;
      const buf = Buffer.from(await file.arrayBuffer());
      total += file.size;
      attachments.push({ filename: file.name, content: buf });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const lines = [
      bodyText,
      "",
      asanaTaskId ? `Asana Task ID: ${asanaTaskId}` : "",
      attachments.length
        ? `Attached: ${attachments.map((a) => a.filename).join(", ")}`
        : incomingPhotos.length
        ? "Photos were provided but skipped due to size limits."
        : "",
    ].filter(Boolean);

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New ${formType === "estimate" ? "Estimate" : "Contact"} Request from ${name}`,
      text: lines.join("\n"),
      attachments,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("email error", err);
    return new Response(JSON.stringify({ error: "email failed" }), { status: 500 });
  }
}
