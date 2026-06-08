"use client";

import { useState } from "react";
import { CheckIcon } from "./icons";

const LOCATIONS = ["Location One", "Location Two", "Location Three", "Location Four"];

type Errors = {
  location: boolean;
  amount: boolean;
  description: boolean;
  name: boolean;
  email: boolean;
};

export default function RefundForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({
    location: false,
    amount: false,
    description: false,
    name: false,
    email: false,
  });

  const clearError = (key: keyof Errors) => setErrors((e) => ({ ...e, [key]: false }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    const form = e.currentTarget;
    const get = (n: string) =>
      (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value.trim();

    const location = get("location");
    const amount = get("amount");
    const description = get("description");
    const name = get("name");
    const address = get("address");
    const phone = get("phone");
    const email = get("email");
    const company = get("company");
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const amountOk = Number(amount.replace(/[^0-9.]/g, "")) > 0;

    const next: Errors = {
      location: !location,
      amount: !amountOk,
      description: !description,
      name: !name,
      email: !emailOk,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      form.querySelector<HTMLElement>(".invalid input, .invalid textarea, .invalid select")?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, amount, description, name, address, phone, email, company }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setSubmitError("Something went wrong submitting your claim. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="form-card">
        <div className="form-success show">
          <div className="check">
            <CheckIcon strokeWidth={2.6} />
          </div>
          <h3>Claim submitted!</h3>
          <p>Thanks — we&rsquo;ve got your claim and our team will reach out within one business day.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h3 style={{ fontSize: 26, marginBottom: 18 }}>File your claim</h3>
      <form noValidate onSubmit={handleSubmit}>
        <div className={`field${errors.location ? " invalid" : ""}`}>
          <label htmlFor="location">Which location?</label>
          <select id="location" name="location" defaultValue="" onInput={() => clearError("location")}>
            <option value="" disabled>
              Select a location
            </option>
            {LOCATIONS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <span className="err">Please choose a location.</span>
        </div>

        <div className="row2">
          <div className={`field${errors.amount ? " invalid" : ""}`}>
            <label htmlFor="amount">Amount lost</label>
            <input id="amount" name="amount" type="text" inputMode="decimal" placeholder="$5.00" onInput={() => clearError("amount")} />
            <span className="err">Enter the amount lost.</span>
          </div>
          <div className={`field${errors.name ? " invalid" : ""}`}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" onInput={() => clearError("name")} />
            <span className="err">Please enter your name.</span>
          </div>
        </div>

        <div className={`field${errors.description ? " invalid" : ""}`}>
          <label htmlFor="description">What happened?</label>
          <textarea id="description" name="description" rows={4} placeholder="Tell us what happened at the machine." onInput={() => clearError("description")} />
          <span className="err">Please describe what happened.</span>
        </div>

        <div className="row2">
          <div className={`field${errors.email ? " invalid" : ""}`}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@email.com" onInput={() => clearError("email")} />
            <span className="err">Please enter a valid email.</span>
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" placeholder="(843) 000-0000" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="address">Mailing address</label>
          <input id="address" name="address" type="text" placeholder="So we can mail a refund if needed" />
        </div>

        {/* Honeypot */}
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
          {submitting ? "Submitting…" : "Submit claim"}
        </button>
      </form>
    </div>
  );
}
