import { defineConfig } from "drizzle-kit";

import "dotenv/config";

export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_ybY8rPtZBUV1@ep-long-glade-aw7oqnvm-pooler.c-12.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require',
  },
});
