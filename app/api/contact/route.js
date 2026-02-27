import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const rateLimitMap = new Map();

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();
  let timestamps = rateLimitMap.get(ip) || [];
  timestamps = timestamps.filter(t => now - t < 60 * 60 * 1000);

  if (timestamps.length >= 3) {
    return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);

  try {
    const { name, email, phone, service, message, website } = await request.json();

    if (website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    await resend.emails.send({
      from: "Clarivex Solution <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      reply_to: email,
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
