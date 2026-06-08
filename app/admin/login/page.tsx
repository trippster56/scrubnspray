"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signIn.email({ email: email.trim(), password });
    setLoading(false);
    if (err) {
      setError(err.message ?? "Sign in failed. Check your credentials.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="admin-login">
      <div className="form-card" style={{ width: "100%", maxWidth: 420 }}>
        <h1 style={{ fontSize: 28 }}>Admin login</h1>
        <p style={{ color: "var(--muted)", margin: "6px 0 22px" }}>Sign in to manage messages and claims.</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@scrubnspray.com"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="err" style={{ display: "block", marginBottom: 12 }} role="alert">
              {error}
            </p>
          )}
          <button className="btn btn-primary btn-lg" type="submit" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p style={{ color: "var(--muted)", fontSize: 13, textAlign: "center", marginTop: 16 }}>
          No public sign-up. Create an admin with <code>npm run admin:create</code>.
        </p>
      </div>
    </div>
  );
}
