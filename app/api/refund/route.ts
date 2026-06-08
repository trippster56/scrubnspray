import { NextResponse } from "next/server";
import { Resend } from "resend";
import { saveRefundClaim } from "@/db/queries";

/**
 * Refund / lost-money claim endpoint.
 * Saves the claim to the database (if DATABASE_URL is set) and emails it via
 * Resend (if RESEND_API_KEY is set). Money matters, so the DB row is the
 * source of truth — the email is just a notification.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { location, amount, description, name, address, phone, email, company } = body;

    // Honeypot.
    if (company) {
      return NextResponse.json({ success: true });
    }

    if (!location || !amount || !description || !name || !email) {
      return NextResponse.json(
        { error: "Location, amount, description, name, and email are required." },
        { status: 400 }
      );
    }

    // Accept "$12.50", "12.5", etc. → integer cents.
    const dollars = Number(String(amount).replace(/[^0-9.]/g, ""));
    if (!Number.isFinite(dollars) || dollars <= 0) {
      return NextResponse.json({ error: "Enter a valid amount." }, { status: 400 });
    }
    const amountCents = Math.round(dollars * 100);

    await saveRefundClaim({ location, amountCents, description, name, address, phone, email });

    const amountStr = `$${(amountCents / 100).toFixed(2)}`;

    if (!process.env.RESEND_API_KEY) {
      console.log("💸 Refund claim (no RESEND_API_KEY set):", {
        location,
        amount: amountStr,
        description,
        name,
        address,
        phone,
        email,
      });
      return NextResponse.json({ success: true, dev: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.RESEND_CLAIMS_EMAIL || process.env.RESEND_TO_EMAIL || "hello@example.com",
      replyTo: email,
      subject: `[Refund Claim] ${amountStr} at ${location} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color:#002D6B;">New lost-money / refund claim</h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:6px 0; color:#6c7a83; width:110px;"><strong>Location</strong></td><td style="padding:6px 0; color:#1f2a33;">${location}</td></tr>
            <tr><td style="padding:6px 0; color:#6c7a83;"><strong>Amount</strong></td><td style="padding:6px 0; color:#1f2a33;">${amountStr}</td></tr>
            <tr><td style="padding:6px 0; color:#6c7a83;"><strong>Name</strong></td><td style="padding:6px 0; color:#1f2a33;">${name}</td></tr>
            <tr><td style="padding:6px 0; color:#6c7a83;"><strong>Email</strong></td><td style="padding:6px 0; color:#1f2a33;">${email}</td></tr>
            <tr><td style="padding:6px 0; color:#6c7a83;"><strong>Phone</strong></td><td style="padding:6px 0; color:#1f2a33;">${phone || "—"}</td></tr>
            <tr><td style="padding:6px 0; color:#6c7a83;"><strong>Address</strong></td><td style="padding:6px 0; color:#1f2a33;">${address || "—"}</td></tr>
          </table>
          <div style="margin-top:16px; padding:16px; background:#EBF7FF; border-radius:8px;">
            <p style="color:#6c7a83; margin:0 0 8px;"><strong>What happened</strong></p>
            <p style="color:#1f2a33; margin:0; white-space:pre-wrap;">${description}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      // Claim is already saved; report partial success so the customer isn't blocked.
      return NextResponse.json({ success: true, emailFailed: true });
    }

    // Customer auto-reply (best-effort — never fail the request on this).
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: email,
        replyTo: process.env.RESEND_CLAIMS_EMAIL || process.env.RESEND_TO_EMAIL || undefined,
        subject: "We got your claim — Scrub N Spray",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color:#1f2a33;">
            <h2 style="color:#002D6B;">Thanks, ${name} — we got your claim.</h2>
            <p>We've received your claim for <strong>${amountStr}</strong> at <strong>${location}</strong>, and our team will reach out within one business day.</p>
            <div style="margin-top:12px; padding:16px; background:#EBF7FF; border-radius:8px;">
              <p style="color:#6c7a83; margin:0 0 8px;"><strong>What you told us</strong></p>
              <p style="margin:0; white-space:pre-wrap;">${description}</p>
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
    console.error("Refund API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
