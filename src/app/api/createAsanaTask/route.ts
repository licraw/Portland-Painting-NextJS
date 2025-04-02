import { NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
const Asana = require("asana");

export async function POST(request: NextRequest) {
  try {
    console.log("==> [START] Received POST request.");

    // 1. Read and log form data
    const data = await request.formData();
    console.log(
      "==> [STEP] Form data received:",
      JSON.stringify(Array.from(data.entries()))
    );

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

    console.log("==> [STEP] Parsed fields:", {
      name,
      email,
      phone,
      address,
      overview,
      promoCode,
      formType,
      paintingAndStain,
      constructionAndRestoration,
      notes,
      photoFilesCount: photoFiles?.length || 0,
    });

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
    console.log("==> [STEP] Asana task data prepared:", { asanaTaskName, asanaTaskNotes });

    // 4. Initialize Asana
    const client = Asana.ApiClient.instance;
    const token = client.authentications["token"];
    token.accessToken = process.env.ASANA_TOKEN;

    if (!token.accessToken) {
      console.error("==> [ERROR] ASANA_TOKEN is missing or not set correctly.");
      return new Response(
        JSON.stringify({ error: "ASANA_TOKEN not configured." }),
        { status: 500 }
      );
    }

    // 5. Create the API instances
    const tasksApiInstance = new Asana.TasksApi();
    const attachmentsApiInstance = new Asana.AttachmentsApi();
    const projectsApiInstance = new Asana.ProjectsApi();

    // -------------------------------------------------------------------------
    // ***** Fetch and log custom fields from the project in the workspace *****
    // -------------------------------------------------------------------------
    const projectId = "9865446660987"; // Project ID
    console.log("==> [STEP] Fetching project details for project:", projectId);
    try {
      const projectResponse = await projectsApiInstance.getProject(projectId, {
        opt_fields: "workspace,custom_field_settings.custom_field,custom_field_settings.display_value",
      });
      const project = projectResponse.data;
      if (project.workspace.gid !== "9802913355207") {
        console.warn(`==> [WARNING] Project ${projectId} is not in workspace 9802913355207.`);
      }
      console.log(
        "==> [STEP] Fetched project custom fields:",
        JSON.stringify(project.custom_field_settings, null, 2)
      );
    } catch (projectFetchError) {
      console.error("==> [ERROR] Unable to fetch project details:", projectFetchError);
    }
    // -------------------------------------------------------------------------

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
            "1209743111880010": howDidYouFindUs,
          },
        },
      };
    }

    console.log("==> [STEP] Asana createTask body:", JSON.stringify(body, null, 2));

    // 7. Create the Asana task
    let result = await tasksApiInstance.createTask(body, {});
    console.log("==> [STEP] Task created successfully in Asana:", result.data?.gid);

    // 8. Upload attachments in parallel with retry logic
    let photosFailed = false;
    if (photoFiles && photoFiles.length > 0) {
      const tempDir = path.resolve("/tmp");

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
        console.log(`==> [STEP] Created temp directory at: ${tempDir}`);
      }

      try {
        await Promise.all(
          photoFiles.map(async (photoFile) => {
            const tempFilePath = path.join(tempDir, photoFile.name);
            console.log(`==> [INFO] Writing file to temp path: ${tempFilePath}`);
            await writeFile(tempFilePath, Buffer.from(await photoFile.arrayBuffer()));

            // Attempt to upload the attachment.
            const attachResult = await attachmentsApiInstance.createAttachmentForObject({
              parent: result.data.gid,
              file: fs.createReadStream(tempFilePath),
            });
            console.log(`==> [STEP] Attachment uploaded: ${photoFile.name}, attachResult:`, attachResult);
            // Delete temp file synchronously after upload.
            fs.unlinkSync(tempFilePath);
          })
        );
      } catch (attachmentError) {
        console.error("==> [ERROR] Attachment upload failed:", attachmentError);
        // Delete the previously created task.
        try {
          await tasksApiInstance.deleteTask(result.data.gid, {});
          console.log("==> [STEP] Deleted task due to attachment upload failure.");
        } catch (deleteError) {
          console.error("==> [ERROR] Failed to delete task after attachment failure:", deleteError);
        }
        // Retry creating the task without attempting attachments.
        result = await tasksApiInstance.createTask(body, {});
        console.log("==> [STEP] Task re-created without photos:", result.data?.gid);
        photosFailed = true;
      }
    } else {
      console.log("==> [STEP] No photo files to upload.");
    }

    // 9. Send the email
    console.log("==> [STEP] Sending email via /api/sendEmail");
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
        // If photos failed to attach, send an empty array.
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
      console.error("==> [ERROR] Email API responded with status:", emailResponse.status);
      const errorText = await emailResponse.text();
      console.error("==> [ERROR] Email API response text:", errorText);
    } else {
      console.log("==> [STEP] Email API call succeeded.");
    }

    // 10. Return success response with message reflecting photo upload status
    console.log("==> [SUCCESS] Task created and email request sent.");
    const finalMessage = photosFailed
      ? "Task created successfully, but photos could not be attached. Estimate request sent without photos."
      : "Task created and email request sent.";
    return new Response(
      JSON.stringify({ success: true, message: finalMessage }),
      { status: 200 }
    );
  } catch (error) {
    console.error("==> [CATCH] An error occurred:", error);
    return new Response(JSON.stringify({ error: "Failed to process request" }), { status: 500 });
  }
}
