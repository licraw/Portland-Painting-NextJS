import Asana from 'asana';
import { NextRequest } from 'next/server';
import { writeFile } from 'fs/promises';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const photoFile : File | null = data.get('photo') as File | null;
  const name = data.get('name') as string;
  const email = data.get('email') as string;
  const phone = data.get('phone') as string;
  const address = data.get('address') as string;
  const overview = data.get('overview') as string;
  const promoCode = data.get('promoCode') as string;
  const formType = data.get('formType') as string;

  // Validate the file exists and is of the correct type
  if (!photoFile || !(photoFile instanceof File)) {
    throw new Error("Invalid file upload.");
  }

  // // Specify the directory where the file will be saved
  // const uploadDir = path.resolve("uploads");
  // const filePath = path.join(uploadDir, photoFile.name);

  // // Ensure the uploads directory exists
  // await fs.mkdir(uploadDir, { recursive: true });

  // Save the file
  const buffer = Buffer.from(await photoFile.arrayBuffer());

  // const filePath = `/tmp/${photoFile.name}`;
  // await writeFile(filePath, buffer);



  let asanaTaskName = '';
  let asanaTaskNotes = '';

  if (formType === 'estimate') {
    asanaTaskName = `New Estimate Request from ${name}`;
    asanaTaskNotes = `**Email**: ${email}
**Phone**: ${phone}
**Address**: ${address}
**Project Overview**: ${overview}
**Promo Code**: ${promoCode || 'None'}`;
  } else if (formType === 'contact') {
    asanaTaskName = `New Contact Request from ${name}`;
    asanaTaskNotes = `**Email**: ${email}
**Phone**: ${phone}
**Message**: ${overview}`;
  }

  try {
    let client = Asana.ApiClient.instance;
    let token = client.authentications['token'];
    token.accessToken = process.env.ASANA_TOKEN;

    let tasksApiInstance = new Asana.TasksApi();
    let body = {
      data: {
        workspace: "9802913355207",
        name: asanaTaskName,
        notes: asanaTaskNotes,
        assignee: "me",
        projects: ["9865446660987"],
      },
    };
    const taskOpts = {};

    let result;
    try {
      result = await tasksApiInstance.createTask(body, taskOpts);
      console.log("Task created successfully:", result);
      
      const attachmentsApiInstance = new Asana.AttachmentsApi();
      
      // Define a temporary file path
      const tempDir = path.resolve('/tmp'); // Use `/tmp` for temporary files
      const tempFilePath = path.join(tempDir, photoFile.name);
      
      // Log the file details
      console.log('photoFile:', {
          name: photoFile.name,
          size: photoFile.size,
          type: photoFile.type,
      });
      
      try {
          // Write the file to the temporary directory
          await writeFile(tempFilePath, Buffer.from(await photoFile.arrayBuffer()));
      
          // Use fs.createReadStream to pass the file to the Asana API
          const attachmentResult = await attachmentsApiInstance.createAttachmentForObject(
              { parent: result.data.gid,
                file: fs.createReadStream(tempFilePath),

               }

          );
      
          console.log('Attachment uploaded successfully:', JSON.stringify(attachmentResult.data, null, 2));
      
          // Clean up the temporary file after uploading
          fs.unlink(tempFilePath, (err) => {
              if (err) {
                  console.error('Failed to delete temporary file:', err.message);
              } else {
                  console.log('Temporary file deleted successfully.');
              }
          });
      } catch (error) {
          console.error('Error uploading attachment:', error.message, error.response?.body);
      
          // Ensure the temporary file is deleted even if an error occurs
          fs.unlink(tempFilePath, (err) => {
              if (err) {
                  console.error('Failed to delete temporary file after error:', err.message);
              }
          });
      }
      
      


    } catch (taskError) {
      console.error("Error during task creation:", taskError);
      throw new Error("Task creation failed");
    }

    if (!result || !result.data) {
      throw new Error("Unexpected response from Asana API");
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
    console.error("Error creating Asana task:", error.message);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to create Asana task" }),
      { status: 500 }
    );
  }
}
