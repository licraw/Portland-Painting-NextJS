import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, formType, bodyText, photos = [] } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const attachments = photos
      .filter((p: { content: string }) => Buffer.byteLength(p.content, "base64") < 20 * 1024 * 1024) // stay under Gmail cap
      .map((p: { name: string; content: string }) => ({
        filename: p.name,
        content: Buffer.from(p.content, "base64"),
      }));

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New ${formType === "estimate" ? "Estimate" : "Contact"} Request from ${name}`,
      text: bodyText,
      attachments,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("email error", err);
    return new Response(JSON.stringify({ error: "email failed" }), { status: 500 });
  }
}
