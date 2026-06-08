import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

if (!db) {
  // Auth requires a database. The rest of the app falls back gracefully,
  // but admin login does not work without DATABASE_URL set.
  console.warn("[auth] DATABASE_URL is not set — admin login will not work.");
}

export const auth = betterAuth({
  database: drizzleAdapter(db!, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    // No public sign-up UI exists. Use `npm run admin:create` to add admins.
    disableSignUp: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh once per day
  },
});
