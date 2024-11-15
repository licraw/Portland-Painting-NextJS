import fetch from "node-fetch";

export async function POST(req) {
  const { email, firstName, lastName } = await req.json();

  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
    },
  };

  const response = await fetch(
    `https://us14.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (response.ok) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    const errorData = await response.json();
    console.error("Mailchimp Error:", JSON.stringify(errorData, null, 2));
    return new Response(
      JSON.stringify({ error: errorData.detail || "Error subscribing to Mailchimp" }),
      { status: 500 }
    );
  }
}
