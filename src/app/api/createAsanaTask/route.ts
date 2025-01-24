const Asana = require('asana');
import { NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

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

  if (!photoFiles || photoFiles.length === 0) {
    throw new Error("No photos uploaded.");
  }

  let asanaTaskName = "";
  let asanaTaskNotes = "";

  if (formType === "estimate") {
    asanaTaskName = `New Estimate Request from ${name}`;
    asanaTaskNotes = `**Email**: ${email}
**Phone**: ${phone}
**Address**: ${address}
**Project Overview**: ${overview}
**Promo Code**: ${promoCode || "None"}`;
  } else if (formType === "contact") {
    asanaTaskName = `New Contact Request from ${name}`;
    asanaTaskNotes = `**Email**: ${email}
**Phone**: ${phone}
**Message**: ${overview}`;
  }



  try {
    const client = Asana.ApiClient.instance;
    const token = client.authentications["token"];
    token.accessToken = process.env.ASANA_TOKEN;
    const tasksApiInstance = new Asana.TasksApi();
    console.log("promo code", promoCode);
    const dueDate = new Date().toISOString().split('T')[0];
    const body = {
      data: {
        workspace: "9802913355207",
        name: asanaTaskName,
        notes: asanaTaskNotes,
        due_on: dueDate,
        assignee: "me",
        projects: ["9865446660987"],
        custom_fields: {
          "1208441371887522" : "1208441371887523",
          "1208441371887529" : "1208441371887530",
          "1208441371887534" : name,
          "1209143077541096" : promoCode

        }
      },
    };

    const result = await tasksApiInstance.createTask(body, {});

    console.log("Task created successfully:");
    console.log("Result:", JSON.stringify(result, null, 2)); // Logs the entire result in a readable JSON format
    
    if (result.data && result.data.custom_fields) {
      console.log("Custom Fields:");
      result.data.custom_fields.forEach((field: any, index: number) => {
        console.log(`Field ${index + 1}:`, field);
      });
    }
    
    const attachmentsApiInstance = new Asana.AttachmentsApi();

    if(!photoFiles || photoFiles.length === 0) {
    for (const photoFile of photoFiles) {
      const tempDir = path.resolve("/tmp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

      const tempFilePath = path.join(tempDir, photoFile.name);

      try {
        await writeFile(
          tempFilePath,
          Buffer.from(await photoFile.arrayBuffer())
        );

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
        const err = error as Error & {
          response?: { body?: { errors: { message: string }[] } };
        };
        console.error(
          `Error uploading attachment: ${photoFile.name}`,
          err.message,
          err.response?.body
        );
      }
    }
  }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Task created successfully",
        task: result.data,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating Asana task:", error.message);
      return new Response(
        JSON.stringify({
          error: error.message || "Failed to create Asana task",
        }),
        { status: 500 }
      );
    } else {
      console.error("Unknown error creating Asana task");
      return new Response(
        JSON.stringify({ error: "Failed to create Asana task" }),
        { status: 500 }
      );
    }
  }
}
