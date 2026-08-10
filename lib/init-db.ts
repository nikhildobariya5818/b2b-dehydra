import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

let initialized = false;

export async function initializeDatabase() {
  if (initialized) return;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  try {
    const client = postgres(connectionString);
    const db = drizzle(client, { schema });

    console.log("[DB] Running migrations...");
    await migrate(db, { migrationsFolder: "./migrations" });
    console.log("[DB] Migrations completed successfully");

    initialized = true;
  } catch (error) {
    console.error("[DB] Initialization error:", error);
    throw error;
  }
}
