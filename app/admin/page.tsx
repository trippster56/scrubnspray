import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getAdminStats, getContactMessages, getRefundClaims } from "@/db/queries";
import {
  toggleMessageReadAction,
  deleteMessageAction,
  setClaimStatusAction,
  deleteClaimAction,
} from "./actions";

export const dynamic = "force-dynamic";

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function AdminPage() {
  // Admin needs a database. Surface a clear notice rather than crashing in
  // local dev before Neon is wired up.
  if (!process.env.DATABASE_URL) {
    return (
      <div className="admin-empty">
        <h1>Admin needs a database</h1>
        <p>
          Set <code>DATABASE_URL</code> (Neon) and <code>BETTER_AUTH_SECRET</code> in{" "}
          <code>.env.local</code>, run <code>npm run db:push</code>, then create an admin with{" "}
          <code>npm run admin:create</code>.
        </p>
      </div>
    );
  }

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/admin/login");

  const [stats, messages, claims] = await Promise.all([
    getAdminStats(),
    getContactMessages(),
    getRefundClaims(),
  ]);

  return (
    <>
      <header className="admin-topbar">
        <div>
          <strong>Scrub N Spray</strong> <span className="admin-muted">Admin</span>
        </div>
        <form action="/admin/logout" method="post">
          <button className="admin-link-btn" type="submit">
            Log out
          </button>
        </form>
      </header>

      <main className="admin-main">
        <div className="admin-stats">
          <div className="admin-stat">
            <span className="num">{stats.messages}</span>
            <span className="lbl">Messages</span>
          </div>
          <div className="admin-stat">
            <span className="num">{stats.unreadMessages}</span>
            <span className="lbl">Unread</span>
          </div>
          <div className="admin-stat">
            <span className="num">{stats.claims}</span>
            <span className="lbl">Claims</span>
          </div>
          <div className="admin-stat">
            <span className="num">{stats.openClaims}</span>
            <span className="lbl">Open claims</span>
          </div>
        </div>

        {/* REFUND CLAIMS */}
        <section className="admin-section">
          <h2>Refund claims</h2>
          {claims.length === 0 ? (
            <p className="admin-muted">No claims yet.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Location</th>
                    <th>Amount</th>
                    <th>From</th>
                    <th>What happened</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {claims.map((c) => (
                    <tr key={c.id} data-status={c.status}>
                      <td className="admin-nowrap">{fmtDate(c.createdAt)}</td>
                      <td>{c.location}</td>
                      <td className="admin-nowrap">
                        <strong>{money(c.amountCents)}</strong>
                      </td>
                      <td>
                        <div>{c.name}</div>
                        <a className="admin-muted" href={`mailto:${c.email}`}>
                          {c.email}
                        </a>
                        {c.phone && <div className="admin-muted">{c.phone}</div>}
                        {c.address && <div className="admin-muted">{c.address}</div>}
                      </td>
                      <td className="admin-desc">{c.description}</td>
                      <td>
                        <span className={`admin-pill admin-pill-${c.status}`}>
                          {c.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="admin-actions">
                        {(["new", "in_review", "resolved"] as const)
                          .filter((s) => s !== c.status)
                          .map((s) => (
                            <form action={setClaimStatusAction} key={s}>
                              <input type="hidden" name="id" value={c.id} />
                              <input type="hidden" name="status" value={s} />
                              <button className="admin-link-btn" type="submit">
                                {s === "in_review" ? "In review" : s === "resolved" ? "Resolve" : "Reopen"}
                              </button>
                            </form>
                          ))}
                        <form action={deleteClaimAction}>
                          <input type="hidden" name="id" value={c.id} />
                          <button className="admin-link-btn admin-danger" type="submit">
                            Delete
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* CONTACT MESSAGES */}
        <section className="admin-section">
          <h2>Messages</h2>
          {messages.length === 0 ? (
            <p className="admin-muted">No messages yet.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>When</th>
                    <th>From</th>
                    <th>Topic</th>
                    <th>Message</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m) => (
                    <tr key={m.id} className={m.read ? "" : "admin-unread"}>
                      <td className="admin-nowrap">{fmtDate(m.createdAt)}</td>
                      <td>
                        <div>{m.name}</div>
                        <a className="admin-muted" href={`mailto:${m.email}`}>
                          {m.email}
                        </a>
                        {m.phone && <div className="admin-muted">{m.phone}</div>}
                      </td>
                      <td>{m.subject || "—"}</td>
                      <td className="admin-desc">{m.message}</td>
                      <td className="admin-actions">
                        <form action={toggleMessageReadAction}>
                          <input type="hidden" name="id" value={m.id} />
                          <input type="hidden" name="read" value={(!m.read).toString()} />
                          <button className="admin-link-btn" type="submit">
                            Mark {m.read ? "unread" : "read"}
                          </button>
                        </form>
                        <form action={deleteMessageAction}>
                          <input type="hidden" name="id" value={m.id} />
                          <button className="admin-link-btn admin-danger" type="submit">
                            Delete
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
