import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, phone, service, message } = await request.json();

    await resend.emails.send({
      from: "Clarivex Solution <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      subject: `New Enquiry from ${name} — ${service}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a2e; border-bottom: 2px solid #6aa595; padding-bottom: 10px;">New Contact Form Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 12px 8px; border-bottom: 1px solid #e2e4e9; width: 30%; color: #5a6478;"><strong>Name:</strong></td>
              <td style="padding: 12px 8px; border-bottom: 1px solid #e2e4e9; color: #1a1a2e;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 8px; border-bottom: 1px solid #e2e4e9; color: #5a6478;"><strong>Email:</strong></td>
              <td style="padding: 12px 8px; border-bottom: 1px solid #e2e4e9; color: #1a1a2e;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 8px; border-bottom: 1px solid #e2e4e9; color: #5a6478;"><strong>Phone:</strong></td>
              <td style="padding: 12px 8px; border-bottom: 1px solid #e2e4e9; color: #1a1a2e;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px 8px; border-bottom: 1px solid #e2e4e9; color: #5a6478;"><strong>Service:</strong></td>
              <td style="padding: 12px 8px; border-bottom: 1px solid #e2e4e9; color: #1a1a2e;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 12px 8px; border-bottom: 1px solid #e2e4e9; color: #5a6478; vertical-align: top;"><strong>Message:</strong></td>
              <td style="padding: 12px 8px; border-bottom: 1px solid #e2e4e9; color: #1a1a2e; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
