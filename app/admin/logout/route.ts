import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

async function handle(req: Request) {
  await auth.api.signOut({ headers: await headers() });
  const url = new URL("/admin/login", req.url);
  return NextResponse.redirect(url, { status: 303 });
}

export const GET = handle;
export const POST = handle;
