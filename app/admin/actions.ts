"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import {
  markMessageRead,
  deleteContactMessage,
  setRefundClaimStatus,
  deleteRefundClaim,
} from "@/db/queries";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");
}

export async function toggleMessageReadAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const read = formData.get("read") === "true";
  await markMessageRead(id, read);
  revalidatePath("/admin");
}

export async function deleteMessageAction(formData: FormData) {
  await requireAdmin();
  await deleteContactMessage(Number(formData.get("id")));
  revalidatePath("/admin");
}

export async function setClaimStatusAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status")) as "new" | "in_review" | "resolved";
  await setRefundClaimStatus(id, status);
  revalidatePath("/admin");
}

export async function deleteClaimAction(formData: FormData) {
  await requireAdmin();
  await deleteRefundClaim(Number(formData.get("id")));
  revalidatePath("/admin");
}
