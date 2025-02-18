import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const { name, email, formType, emailMessage, photoFiles } = await request.json();

  try {
    // GMAIL Integration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New ${formType === "estimate" ? "Estimate" : "Contact"} Request from ${name}`,
      text: emailMessage,
      attachments: photoFiles.map((photo: { name: string; content: string }) => ({
        filename: photo.name,
        content: Buffer.from(photo.content, "base64"), // Decode Base64 back to buffer
      })),
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }
}
