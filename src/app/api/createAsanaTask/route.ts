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
    console.log("==> [STEP] Form data received:", JSON.stringify(Array.from(data.entries())));

    // 2. Pull out form fields
    const photoFiles: File[] = data.getAll("photos") as File[];
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const address = data.get("address") as string;
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

    // 3. Build Asana task name/notes
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
      return new Response(JSON.stringify({ error: "ASANA_TOKEN not configured." }), { status: 500 });
    }

    // 5. Create the API instances
    const tasksApiInstance = new Asana.TasksApi();
    const attachmentsApiInstance = new Asana.AttachmentsApi();

    // -------------------------------------------------------------------------
    // ***** ADDITIONAL REQUEST to log custom fields before task creation *****
    // -------------------------------------------------------------------------
    const customFieldsApiInstance = new Asana.CustomFieldsApi();
    const workspaceId = "9802913355207"; // Your Workspace GID

    console.log("==> [STEP] Fetching all custom fields from workspace:", workspaceId);
    try {
      const customFieldsResponse = await customFieldsApiInstance.getCustomFieldsForWorkspace(
        workspaceId,
        { opt_fields: "name,resource_subtype,enum_options" }
      );
      console.log("==> [STEP] Fetched custom fields:", JSON.stringify(customFieldsResponse.data, null, 2));
    } catch (fetchError) {
      console.error("==> [ERROR] Unable to fetch custom fields:", fetchError);
    }
    // -------------------------------------------------------------------------

    const dueDate = new Date().toISOString().split("T")[0];

    // 6. Construct the request body for Asana
    let body;
    if (formType === "homeLead") {
      body = {
        data: {
          workspace: "9802913355207", // same workspace GID
          name: asanaTaskName,
          notes: asanaTaskNotes,
          due_on: dueDate,
          projects: ["9865446660987"],
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
          projects: ["9865446660987"],
          custom_fields: {
            "1208441371887522": "1208441371887523",
            "1208441371887529": "1208441371887530",
            "1209143077541096": promoCode,
          },
        },
      };
    }

    // add name to description

    console.log("==> [STEP] Asana createTask body:", JSON.stringify(body, null, 2));

    // 7. Create the Asana task
    const result = await tasksApiInstance.createTask(body, {});
    console.log("==> [STEP] Task created successfully in Asana:", result.data?.gid);

    // 8. Upload attachments in parallel
    const tempDir = path.resolve("/tmp");

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
      console.log(`==> [STEP] Created temp directory at: ${tempDir}`);
    }

    if (photoFiles && photoFiles.length > 0) {
      console.log("==> [STEP] Uploading attachments, total files:", photoFiles.length);
    } else {
      console.log("==> [STEP] No photo files to upload.");
    }

    await Promise.all(
      photoFiles.map(async (photoFile) => {
        const tempFilePath = path.join(tempDir, photoFile.name);
        console.log(`==> [INFO] Writing file to temp path: ${tempFilePath}`);

        await writeFile(tempFilePath, Buffer.from(await photoFile.arrayBuffer()));
        try {
          const attachResult = await attachmentsApiInstance.createAttachmentForObject({
            parent: result.data.gid,
            file: fs.createReadStream(tempFilePath),
          });
          console.log(`==> [STEP] Attachment uploaded: ${photoFile.name}, attachResult:`, attachResult);
        } catch (error) {
          console.error(`==> [ERROR] Error uploading attachment: ${photoFile.name}`, error);
        } finally {
          fs.unlink(tempFilePath, (err) => {
            if (err) {
              console.error("==> [ERROR] Failed to delete temp file:", tempFilePath, err.message);
            } else {
              console.log("==> [STEP] Temp file deleted:", tempFilePath);
            }
          });
        }
      })
    );

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
        photoFiles: await Promise.all(
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
      // Optionally return 500 if email must succeed
    } else {
      console.log("==> [STEP] Email API call succeeded.");
    }

    // 10. Return success response
    console.log("==> [SUCCESS] Task created and email request sent.");
    return new Response(
      JSON.stringify({ success: true, message: "Task created and email request sent." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("==> [CATCH] An error occurred:", error);
    return new Response(JSON.stringify({ error: "Failed to process request" }), { status: 500 });
  }
}
