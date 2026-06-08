import { eq, desc, count, and } from "drizzle-orm";
import { db } from "@/db";
import { contactMessages, refundClaims } from "./schema";

function isDatabaseConfigured() {
  return !!process.env.DATABASE_URL;
}

function assertDb() {
  if (!isDatabaseConfigured() || !db) {
    throw new Error(
      "DATABASE_URL is not set. This action requires a configured database."
    );
  }
  return db;
}

// ─── Contact Messages ──────────────────────────────

export async function saveContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  if (!isDatabaseConfigured() || !db) {
    console.log("[db] DATABASE_URL not set — skipping contact message save");
    return null;
  }
  const [msg] = await db.insert(contactMessages).values(data).returning();
  return msg;
}

export async function getContactMessages() {
  if (!isDatabaseConfigured() || !db) return [];
  return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function markMessageRead(id: number, read: boolean) {
  const d = assertDb();
  await d.update(contactMessages).set({ read }).where(eq(contactMessages.id, id));
}

export async function deleteContactMessage(id: number) {
  const d = assertDb();
  await d.delete(contactMessages).where(eq(contactMessages.id, id));
}

// ─── Refund / Lost-Money Claims ────────────────────

export async function saveRefundClaim(data: {
  location: string;
  amountCents: number;
  description: string;
  name: string;
  address?: string;
  phone?: string;
  email: string;
}) {
  if (!isDatabaseConfigured() || !db) {
    console.log("[db] DATABASE_URL not set — skipping refund claim save");
    return null;
  }
  const [claim] = await db.insert(refundClaims).values(data).returning();
  return claim;
}

export async function getRefundClaims() {
  if (!isDatabaseConfigured() || !db) return [];
  return db.select().from(refundClaims).orderBy(desc(refundClaims.createdAt));
}

export async function setRefundClaimStatus(
  id: number,
  status: "new" | "in_review" | "resolved"
) {
  const d = assertDb();
  await d
    .update(refundClaims)
    .set({ status, resolvedAt: status === "resolved" ? new Date() : null })
    .where(eq(refundClaims.id, id));
}

export async function deleteRefundClaim(id: number) {
  const d = assertDb();
  await d.delete(refundClaims).where(eq(refundClaims.id, id));
}

// ─── Admin Stats ───────────────────────────────────

export async function getAdminStats() {
  if (!isDatabaseConfigured() || !db) {
    return { messages: 0, unreadMessages: 0, claims: 0, openClaims: 0 };
  }

  const [[messageCount], [unreadCount], [claimCount], [openClaimCount]] =
    await Promise.all([
      db.select({ value: count() }).from(contactMessages),
      db
        .select({ value: count() })
        .from(contactMessages)
        .where(eq(contactMessages.read, false)),
      db.select({ value: count() }).from(refundClaims),
      db
        .select({ value: count() })
        .from(refundClaims)
        .where(and(eq(refundClaims.status, "new"))),
    ]);

  return {
    messages: messageCount.value,
    unreadMessages: unreadCount.value,
    claims: claimCount.value,
    openClaims: openClaimCount.value,
  };
}
