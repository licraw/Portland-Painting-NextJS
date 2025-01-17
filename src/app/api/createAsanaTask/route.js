import Asana from 'asana';

export async function POST(request) {
  const { name, email, phone, address, overview, promoCode, formType } = await request.json();

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
        assignee: "1120216186554330",
        projects: ["9865446660987"],
      },
    };
    let opts = {};

    let result;
    try {
      result = await tasksApiInstance.createTask(body, opts);
      console.log("Task created successfully:", result);
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
