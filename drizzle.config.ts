import { type Config } from "drizzle-kit";

require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL!;

export default {
  schema: "./server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl
  },
  tablesFilter: ["website_*"],
} satisfies Config;
