const Asana = require("asana");
import { NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const photoFiles: File[] = data.getAll("photos") as File[];
  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const phone = data.get("phone") as string;
  const address = data.get("address") as string;
  const overview = data.get("overview") as string;
  const promoCode = data.get("promoCode") as string;
  const formType = data.get("formType") as string;

  // if (!photoFiles || photoFiles.length === 0) {
  //   throw new Error("No photos uploaded.");
  // }

  let asanaTaskName = "";
  let asanaTaskNotes = "";
  let emailMessage = "";

  if (formType === "estimate") {
    asanaTaskName = `New Estimate Request from ${name}`;
    asanaTaskNotes = `**Email**: ${email}
**Phone**: ${phone}
**Address**: ${address}
**Project Overview**: ${overview}
**Promo Code**: ${promoCode || "None"}`;

    emailMessage = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Address: ${address}
Project Overview: ${overview}
Promo Code: ${promoCode || "None"}
`;
  } else if (formType === "contact") {
    asanaTaskName = `New Contact Request from ${name}`;
    asanaTaskNotes = `**Email**: ${email}
**Phone**: ${phone}
**Message**: ${overview}`;

    emailMessage = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${overview}
`;
  }

  try {
    // ASANA Integration
    const client = Asana.ApiClient.instance;
    const token = client.authentications["token"];
    token.accessToken = process.env.ASANA_TOKEN;
    const tasksApiInstance = new Asana.TasksApi();
    const dueDate = new Date().toISOString().split("T")[0];

    const body = {
      data: {
        workspace: "9802913355207",
        name: asanaTaskName,
        notes: asanaTaskNotes,
        due_on: dueDate,
        assignee: "me",
        projects: ["9865446660987"],
        custom_fields: {
          "1208441371887522": "1208441371887523",
          "1208441371887529": "1208441371887530",
          "1208441371887534": name,
          "1209143077541096": promoCode,
        },
      },
    };

    const result = await tasksApiInstance.createTask(body, {});
    console.log("Task created successfully:", result);

    const attachmentsApiInstance = new Asana.AttachmentsApi();

    for (const photoFile of photoFiles) {
      const tempDir = path.resolve("/tmp");
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }

      const tempFilePath = path.join(tempDir, photoFile.name);

      await writeFile(tempFilePath, Buffer.from(await photoFile.arrayBuffer()));

      try {
        const attachmentResult =
          await attachmentsApiInstance.createAttachmentForObject({
            parent: result.data.gid,
            file: fs.createReadStream(tempFilePath),
          });

        console.log(
          `Attachment uploaded successfully: ${photoFile.name}`,
          JSON.stringify(attachmentResult.data, null, 2)
        );

        fs.unlink(tempFilePath, (err) => {
          if (err) {
            console.error("Failed to delete temporary file:", err.message);
          }
        });
      } catch (error) {
        console.error(`Error uploading attachment: ${photoFile.name}`, error);
      }
    }

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
      attachments: await Promise.all(
        photoFiles.map(async (photoFile) => ({
          filename: photoFile.name,
          content: Buffer.from(await photoFile.arrayBuffer()),
        }))
      ),
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Task created and email sent successfully",
        task: result.data,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing the request",
      }),
      { status: 500 }
    );
  }
}
