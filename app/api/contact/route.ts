import { NextResponse } from "next/server";
import { Resend } from "resend";
import { saveContactMessage } from "@/db/queries";

/**
 * Contact form endpoint.
 * Saves the message to the database (if DATABASE_URL is set) and emails it
 * via Resend (if RESEND_API_KEY is set). Without either, it logs and returns
 * success so the form works in local dev before anything is provisioned.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, topic, message, company } = body;

    // Honeypot — real users never fill the hidden "company" field.
    if (company) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await saveContactMessage({ name, email, phone, subject: topic, message });

    if (!process.env.RESEND_API_KEY) {
      console.log("📧 Contact submission (no RESEND_API_KEY set):", {
        name,
        email,
        phone,
        topic,
        message,
      });
      return NextResponse.json({ success: true, dev: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL || "hello@example.com",
      replyTo: email,
      subject: `[Contact] ${topic || "New message"} from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color:#002D6B;">New contact form submission</h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:6px 0; color:#6c7a83; width:90px;"><strong>Name</strong></td><td style="padding:6px 0; color:#1f2a33;">${name}</td></tr>
            <tr><td style="padding:6px 0; color:#6c7a83;"><strong>Email</strong></td><td style="padding:6px 0; color:#1f2a33;">${email}</td></tr>
            <tr><td style="padding:6px 0; color:#6c7a83;"><strong>Phone</strong></td><td style="padding:6px 0; color:#1f2a33;">${phone || "—"}</td></tr>
            <tr><td style="padding:6px 0; color:#6c7a83;"><strong>Topic</strong></td><td style="padding:6px 0; color:#1f2a33;">${topic || "—"}</td></tr>
          </table>
          <div style="margin-top:16px; padding:16px; background:#EBF7FF; border-radius:8px;">
            <p style="color:#6c7a83; margin:0 0 8px;"><strong>Message</strong></p>
            <p style="color:#1f2a33; margin:0; white-space:pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    // Customer auto-reply (best-effort — never fail the request on this).
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: email,
        replyTo: process.env.RESEND_TO_EMAIL || undefined,
        subject: "We got your message — Scrub N Spray",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color:#1f2a33;">
            <h2 style="color:#002D6B;">Thanks, ${name} — we got your message.</h2>
            <p>We'll get back to you within one business day. Here's a copy of what you sent:</p>
            <div style="margin-top:12px; padding:16px; background:#EBF7FF; border-radius:8px;">
              <p style="margin:0; white-space:pre-wrap;">${message}</p>
            </div>
            <p style="margin-top:20px; color:#6c7a83;">— Scrub N Spray · A faster, cleaner wash.</p>
          </div>
        `,
      });
    } catch (replyErr) {
      console.error("Auto-reply failed (non-fatal):", replyErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
