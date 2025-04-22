// pages/api/createRequest.ts
import { NextRequest } from "next/server";
const Asana = require("asana");

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      address,
      formType,
      overview,
      promoCode = "0000",
      paintingAndStain,
      constructionAndRestoration,
      howDidYouFindUs,
    } = await req.json();

    const client = Asana.ApiClient.instance;
    client.authentications["token"].accessToken = process.env.ASANA_TOKEN as string;

    const tasks = new Asana.TasksApi();
    const projectId = "9865446660987";
    const due_on = new Date().toISOString().split("T")[0];

    const data =
      formType === "homeLead"
        ? {
            workspace: "9802913355207",
            name: `New Home Lead Request from ${name}`,
            notes: `**Email**: ${email}\n**Phone**: ${phone}\n**Address**: ${address}\n**Painting & Stain**: ${paintingAndStain}\n**Construction & Restoration**: ${constructionAndRestoration}`,
            due_on,
            projects: [projectId],
            tags: ["1209503778924319"],
          }
        : {
            workspace: "9802913355207",
            name: `New ${formType === "estimate" ? "Estimate" : "Contact"} Request from ${name}`,
            notes: `**Email**: ${email}\n**Phone**: ${phone}\n**Address**: ${address}\n**Overview**: ${overview}\n**Promo Code**: ${promoCode}`,
            due_on,
            projects: [projectId],
            custom_fields: {
              "1208441371887522": "1208441371887523",
              "1208441371887529": "1208441371887530",
              "1209143077541096": promoCode,
              "1209743111880010": howDidYouFindUs,
            },
          };

    const { data: task } = await tasks.createTask({ data }, {});

    return new Response(JSON.stringify({ taskId: task.gid }), { status: 200 });
  } catch (err) {
    console.error("createRequest error", err);
    return new Response(JSON.stringify({ error: "task‑create failed" }), { status: 500 });
  }
}
