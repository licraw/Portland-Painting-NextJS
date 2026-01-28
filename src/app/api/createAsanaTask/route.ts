// pages/api/yourEndpoint.ts
import { NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import pino from "pino";
import { createPinoBrowserSend, createWriteStream } from "pino-logflare";
const Asana = require("asana");

// Create a pino-logflare stream for server-side logging.
const stream = createWriteStream({
  apiKey: "gqMBh7DUjkAV",
  sourceToken: "a71d5d94-2c92-46f1-9028-e430ba0e149d",
});

// (Optional) Create a pino-logflare browser stream if you need to send logs from the client.
const send = createPinoBrowserSend({
  apiKey: "gqMBh7DUjkAV",
  sourceToken: "a71d5d94-2c92-46f1-9028-e430ba0e149d",
});

// Create the pino logger instance.
const logger = pino(
  {
    browser: {
      transmit: {
        send,
      },
    },
  },
  stream
);

export async function POST(request: NextRequest) {
  try {
    // 1. Read form data
    const data = await request.formData();

    // 2. Pull out form fields
    const photoFiles: File[] = data.getAll("photos") as File[];
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const address = data.get("address") as string;
    const howDidYouFindUs = data.get("howDidYouFindUs") as string;
    const overview = data.get("overview") as string;
    const promoCode = (data.get("promoCode") as string) || "0000";
    const formType = data.get("formType") as string;
    const paintingAndStain = data.get("paintingAndStain") as string;
    const constructionAndRestoration = data.get("constructionAndRestoration") as string;
    const notes = data.get("notes") as string;

    // 3. Build Asana task name/notes and email message
    let asanaTaskName = "";
    let asanaTaskNotes = "";
    let emailMessage = "";

    if (formType === "estimate") {
      asanaTaskName = `New Estimate Request from ${name}`;
      asanaTaskNotes = `**Email**: ${email}\n**Phone**: ${phone}\n**Address**: ${address}\n**Project Overview**: ${overview}\n**Promo Code**: ${promoCode || "None"}`;
      emailMessage = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nProject Overview: ${overview}\nPromo Code: ${promoCode || "None"}`;
    } else if (formType === "contact") {
      asanaTaskName = `New Contact Request from ${name}`;
      asanaTaskNotes = `**Email**: ${email}\n**Phone**: ${phone}\n**Message**: ${overview}`;
      emailMessage = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${overview}`;
    } else if (formType === "homeLead") {
      asanaTaskName = `New Home Lead Request from ${name}`;
      asanaTaskNotes = `
        **Name**: ${name}
        **Email**: ${email}
        **Phone**: ${phone}
        **Address**: ${address}
        **Painting & Stain**: ${paintingAndStain}
        **Construction & Restoration Interests**: ${constructionAndRestoration}
        **Notes**: ${notes || "N/A"}
      `;
      emailMessage = `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Address: ${address}
        Painting & Stain Interests: ${paintingAndStain}
        Construction & Restoration Interests: ${constructionAndRestoration}
        Notes: ${notes || "N/A"}
      `;
    }

    // 4. Initialize Asana
    const client = Asana.ApiClient.instance;
    const token = client.authentications["token"];
    token.accessToken = process.env.ASANA_TOKEN;

    if (!token.accessToken) {
      logger.error("ASANA_TOKEN is missing or not set correctly.");
      return new Response(JSON.stringify({ error: "ASANA_TOKEN not configured." }), { status: 500 });
    }

    // 5. Create the API instances
    const tasksApiInstance = new Asana.TasksApi();
    const attachmentsApiInstance = new Asana.AttachmentsApi();
    const projectsApiInstance = new Asana.ProjectsApi();

    // Attempt to fetch project details for custom fields
    const projectId = "9865446660987"; // Project ID
    try {
      await projectsApiInstance.getProject(projectId, {
        opt_fields: "workspace,custom_field_settings.custom_field,custom_field_settings.display_value",
      });
    } catch (projectFetchError) {
      logger.error("Unable to fetch project details", { error: projectFetchError });
    }

    const dueDate = new Date().toISOString().split("T")[0];

    // 6. Construct the request body for Asana task creation
    let body;
    if (formType === "homeLead") {
      body = {
        data: {
          workspace: "9802913355207", // Workspace ID for task creation
          name: asanaTaskName,
          notes: asanaTaskNotes,
          due_on: dueDate,
          projects: [projectId],
          tags: ["1209503778924319"],
        },
      };
    } else {
      body = {
        data: {
          workspace: "9802913355207",
          name: asanaTaskName,
          notes: asanaTaskNotes,
          due_on: dueDate,
          projects: [projectId],
          custom_fields: {
            "1208441371887522": "1208441371887523",
            "1208441371887529": "1208441371887530",
            "1209143077541096": promoCode,
            "1212483327157301": howDidYouFindUs,
          },
        },
      };
    }

    // 7. Create the Asana task
    let result = await tasksApiInstance.createTask(body, {});

    // 8. Upload attachments
    let photosFailed = false;
    if (photoFiles && photoFiles.length > 0) {
      const tempDir = path.resolve("/tmp");

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }

      try {
        await Promise.all(
          photoFiles.map(async (photoFile) => {
            const tempFilePath = path.join(tempDir, photoFile.name);
            await writeFile(tempFilePath, Buffer.from(await photoFile.arrayBuffer()));

            // Attempt to upload the attachment.
            await attachmentsApiInstance.createAttachmentForObject({
              parent: result.data.gid,
              file: fs.createReadStream(tempFilePath),
            });
            fs.unlinkSync(tempFilePath);
          })
        );
      } catch (attachmentError) {
        logger.error("Attachment upload failed", { error: attachmentError });
        try {
          await tasksApiInstance.deleteTask(result.data.gid, {});
        } catch (deleteError) {
          logger.error("Failed to delete task after attachment failure", { error: deleteError });
        }
        result = await tasksApiInstance.createTask(body, {});
        photosFailed = true;
      }
    }

    // 9. Send the email
    const origin = request.nextUrl.origin;
    const emailResponse = await fetch(`${origin}/api/sendEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        formType,
        emailMessage,
        photoFiles: photosFailed
          ? []
          : await Promise.all(
              photoFiles.map(async (photo) => ({
                name: photo.name,
                content: Buffer.from(await photo.arrayBuffer()).toString("base64"),
              }))
            ),
      }),
    });

    if (!emailResponse.ok) {
      logger.error("Email API responded with status", { status: emailResponse.status });
      const errorText = await emailResponse.text();
      logger.error("Email API response text", { errorText });
    }

    // 10. Return success response
    const finalMessage = photosFailed
      ? "Task created successfully, but photos could not be attached. Estimate request sent without photos."
      : "Task created and email request sent.";
    return new Response(JSON.stringify({ success: true, message: finalMessage }), { status: 200 });
  } catch (error) {
    logger.error("An error occurred", { error });
    return new Response(JSON.stringify({ error: "Failed to process request" }), { status: 500 });
  }
}
