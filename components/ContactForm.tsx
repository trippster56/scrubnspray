"use client";

import { useState } from "react";
import { CheckIcon } from "./icons";

type Errors = { name: boolean; email: boolean; message: boolean };

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({ name: false, email: false, message: false });

  const clearError = (key: keyof Errors) => setErrors((e) => ({ ...e, [key]: false }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const topic = (form.elements.namedItem("topic") as HTMLSelectElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();
    const company = (form.elements.namedItem("company") as HTMLInputElement).value;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const next: Errors = { name: !name, email: !emailOk, message: !message };
    setErrors(next);
    if (next.name || next.email || next.message) {
      form.querySelector<HTMLElement>(".invalid input, .invalid textarea")?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, topic, message, company }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setSubmitError("Something went wrong sending your message. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-card" data-reveal>
      {!sent ? (
        <form id="contactForm" noValidate onSubmit={handleSubmit}>
          <div className="row2">
            <div className={`field${errors.name ? " invalid" : ""}`}>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name" onInput={() => clearError("name")} />
              <span className="err">Please enter your name.</span>
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" placeholder="(843) 000-0000" />
              <span className="err">Enter a valid phone.</span>
            </div>
          </div>
          <div className={`field${errors.email ? " invalid" : ""}`}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@email.com" onInput={() => clearError("email")} />
            <span className="err">Please enter a valid email.</span>
          </div>
          <div className="field">
            <label htmlFor="topic">Topic</label>
            <select id="topic" name="topic" defaultValue="General question">
              <option>General question</option>
              <option>Unlimited Club</option>
              <option>Pricing</option>
              <option>Feedback</option>
              <option>Something else</option>
            </select>
          </div>
          <div className={`field${errors.message ? " invalid" : ""}`}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} placeholder="How can we help?" onInput={() => clearError("message")} />
            <span className="err">Please add a short message.</span>
          </div>

          {/* Honeypot — hidden from real users. */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
          />

          {submitError && (
            <p className="err" style={{ display: "block", marginBottom: 12 }} role="alert">
              {submitError}
            </p>
          )}

          <button className="btn btn-primary btn-lg" type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Send message"}
          </button>
        </form>
      ) : (
        <div className="form-success show">
          <div className="check">
            <CheckIcon strokeWidth={2.6} />
          </div>
          <h3>Message sent!</h3>
          <p>Thanks for reaching out — we&rsquo;ll get back to you within one business day.</p>
        </div>
      )}
    </div>
  );
}
