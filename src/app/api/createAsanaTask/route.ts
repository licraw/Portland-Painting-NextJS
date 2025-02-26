const Asana = require("asana");
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
  const paintingAndStain = data.get("paintingAndStain") as string;
  const constructionAndRestoration = data.get("constructionAndRestoration") as string;
  const notes = data.get("notes") as string;



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
    **Painting & Stain c**: ${paintingAndStain}
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

  try {
    // ASANA Integration
    const client = Asana.ApiClient.instance;
    const token = client.authentications["token"];
    token.accessToken = process.env.ASANA_TOKEN;
    const tasksApiInstance = new Asana.TasksApi();
    const dueDate = new Date().toISOString().split("T")[0];

    let body;


    if (formType === "homeLead") {
     body = {
      data: {
        workspace: "9802913355207",
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
      },
    };


  }

    const result = await tasksApiInstance.createTask(body, {});
    console.log("Task created successfully:", result);

    // Upload attachments in parallel
    const attachmentsApiInstance = new Asana.AttachmentsApi();
    const tempDir = path.resolve("/tmp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    await Promise.all(
      photoFiles.map(async (photoFile) => {
        const tempFilePath = path.join(tempDir, photoFile.name);
        await writeFile(tempFilePath, Buffer.from(await photoFile.arrayBuffer()));

        try {
          await attachmentsApiInstance.createAttachmentForObject({
            parent: result.data.gid,
            file: fs.createReadStream(tempFilePath),
          });
          console.log(`Attachment uploaded: ${photoFile.name}`);
        } catch (error) {
          console.error(`Error uploading attachment: ${photoFile.name}`, error);
        } finally {
          fs.unlink(tempFilePath, (err) => {
            if (err) console.error("Failed to delete temp file:", err.message);
          });
        }
      })
    );

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sendEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        formType,
        emailMessage,
        photoFiles: await Promise.all(photoFiles.map(async (photo) => ({
                  name: photo.name,
                  content: Buffer.from(await photo.arrayBuffer()).toString("base64"),
                }))),
      }),
    });

    return new Response(
      JSON.stringify({ success: true, message: "Task created and email request sent." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process request" }), { status: 500 });
  }
}
