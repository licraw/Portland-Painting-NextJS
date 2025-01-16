import fetch from 'node-fetch';

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
    const ASANA_PROJECT_ID = '9865446660987'; // Ensure this is a string
    const ASANA_API_URL = 'https://app.asana.com/api/1.0/tasks';
    const ASANA_TOKEN = process.env.ASANA_TOKEN;

    const asanaResponse = await fetch(ASANA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ASANA_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          name: asanaTaskName,
          notes: asanaTaskNotes,
          projects: [String(ASANA_PROJECT_ID)], // Convert project ID to a string
        },
      }),
    });

    const asanaResult = await asanaResponse.json();

    // Log response for debugging
    console.log("Asana Response:", asanaResult);

    if (!asanaResponse.ok) {
      throw new Error(`Asana API Error: ${asanaResult.errors[0].message}`);
    }

    return new Response(
      JSON.stringify({ success: true, asanaTask: asanaResult.data }),
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
