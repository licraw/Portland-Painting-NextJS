/**
 * POST /api/createRequest
 * Creates an Asana task for “estimate” or “contact” forms.
 *
 * Expects JSON in the request body — no photos.
 * Photos should be uploaded separately to /api/uploadPhoto?taskId=...
 */

const Asana = require("asana");
const { NextRequest } = require("next/server");

export const runtime = "nodejs";

export async function POST(req = new NextRequest()) {
  try {
    /* 1️⃣  parse body */
    const payload = await req.json();
    const {
      formType,
      name,
      email,
      phone,
      address,
      overview,
      zipCode,
      promoCode = "0000",
      howDidYouFindUs,
      paintingAndStain,
      constructionAndRestoration,
    } = payload;

    /* 2️⃣  initialise Asana client */
    const client = Asana.ApiClient.instance;
    const token = client.authentications["token"];
    token.accessToken = process.env.ASANA_TOKEN;

    if (!token.accessToken) {
      console.error("ASANA_TOKEN is missing");
      return new Response(
        JSON.stringify({ error: "ASANA_TOKEN not configured" }),
        { status: 500 }
      );
    }

    /* 3️⃣  create API instances */
    const tasksApiInstance = new Asana.TasksApi();
    const projectsApiInstance = new Asana.ProjectsApi();

    /* 4️⃣ (optional) verify project exists / grab custom‑field settings */
    const projectId = "9865446660987";
    try {
      await projectsApiInstance.getProject(projectId, {
        opt_fields: "workspace,custom_field_settings.custom_field",
      });
    } catch (err) {
      console.error("Failed to fetch project metadata", err);
    }

    /* 5️⃣  build task data */
    const due_on = new Date().toISOString().split("T")[0];
    const taskData =
      formType === "homeLead"
        ? {
            workspace: "9802913355207",
            name: `New Home Lead Request from ${name}`,
            notes: `**Email**: ${email}
**Phone**: ${phone}
**Address**: ${address}
**Zip Code**: ${zipCode}
**Painting & Stain**: ${paintingAndStain}
**Construction & Restoration**: ${constructionAndRestoration}`,
            due_on,
            projects: [projectId],
            tags: ["1209503778924319"],
          }
        : {
            workspace: "9802913355207",
            name: `New ${formType === "estimate" ? "Estimate" : "Contact"} Request from ${name}`,
            notes: `**Email**: ${email}
**Phone**: ${phone}
**Address**: ${address}
**Zip Code**: ${zipCode}
**Overview**: ${overview}
**Promo Code**: ${promoCode}`,
            due_on,
            projects: [projectId],
            custom_fields: {
              "1208441371887522": "1208441371887523",
              "1208441371887529": "1208441371887530",
              "1209143077541096": promoCode,
              "1212483327157301": howDidYouFindUs,
            },
          };

    /* 6️⃣  create task */
    const { data: task } = await tasksApiInstance.createTask({ data: taskData }, {});

    /* 7️⃣  respond with taskId so the client can POST photos later */
    return new Response(JSON.stringify({ taskId: task.gid }), { status: 200 });
  } catch (err) {
    const asanaStatus =
      err?.status || err?.response?.status || err?.response?.statusCode || err?.response?.res?.statusCode;
    const asanaBody = err?.response?.body || err?.body;
    const asanaErrors = Array.isArray(asanaBody?.errors) ? asanaBody.errors : undefined;

    console.error("createRequest error", {
      message: err?.message,
      status: asanaStatus,
      asanaErrors,
      asanaBody,
    });

    const status = typeof asanaStatus === "number" && asanaStatus >= 400 ? asanaStatus : 500;
    const details = asanaErrors || asanaBody || err?.message || "Unknown Asana error";
    return new Response(JSON.stringify({ error: "Task creation failed", details }), { status });
  }
}
