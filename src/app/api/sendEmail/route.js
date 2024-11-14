export async function POST(request) {
    const { name, email, phone, address, overview, promoCode } = await request.json();
  
    const message = `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Address: ${address}
      Project Overview: ${overview}
      Promo Code: ${promoCode || 'None'}
    `;
  
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
  
      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.RECIPIENT_EMAIL,
        subject: `New Estimate Request from ${name}`,
        text: message,
      };
  
      await transporter.sendMail(mailOptions);
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      console.error("Error details:", error); // Log detailed error
      return new Response(JSON.stringify({ error: 'Error sending email' }), { status: 500 });
    }
  }
  