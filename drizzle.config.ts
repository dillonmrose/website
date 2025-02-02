import { type Config } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

export default {
  schema: "./server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
    password: process.env.DATABASE_PASSWORD,
  },
  tablesFilter: ["website_*"],
} satisfies Config;
