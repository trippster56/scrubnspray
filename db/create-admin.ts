/**
 * Create an admin user for Better Auth.
 *
 * Usage:
 *   npm run admin:create -- --email you@example.com --password 'strong-password' --name 'Tripp'
 *
 * Bypasses the public `disableSignUp` flag by writing directly through the
 * Better Auth adapter context.
 */

import { parseArgs } from "node:util";
import { config } from "dotenv";

config({ path: ".env.local" });

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Configure your Neon URL first.");
    process.exit(1);
  }

  const { values } = parseArgs({
    options: {
      email: { type: "string" },
      password: { type: "string" },
      name: { type: "string" },
    },
  });

  const { email, password, name = "Admin" } = values;
  if (!email || !password) {
    console.error("Required: --email <email> --password <password> [--name <name>]");
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  // Dynamic import AFTER dotenv has run, so @/lib/auth picks up DATABASE_URL.
  const { auth } = await import("@/lib/auth");

  try {
    const ctx = await auth.$context;

    const existing = await ctx.adapter.findOne<{ id: string }>({
      model: "user",
      where: [{ field: "email", value: email }],
    });

    if (existing) {
      console.error(`User ${email} already exists.`);
      process.exit(1);
    }

    const hashedPassword = await ctx.password.hash(password);

    const newUser = await ctx.adapter.create<{
      id: string;
      email: string;
      name: string;
      emailVerified: boolean;
      createdAt: Date;
      updatedAt: Date;
    }>({
      model: "user",
      data: {
        email,
        name,
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await ctx.adapter.create({
      model: "account",
      data: {
        userId: newUser.id,
        providerId: "credential",
        accountId: newUser.id,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(`✓ Created admin: ${newUser.email}`);
    process.exit(0);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`✗ Failed to create admin: ${msg}`);
    process.exit(1);
  }
}

main();
