import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";
import * as schema from "@shared/schema";
import path from "path";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

export async function runMigrations() {
  if (process.env.NODE_ENV === "production") {
    console.log("Running migrations...");
    try {
      const migrationsPath = path.resolve(process.cwd(), "migrations");
      console.log(`Looking for migrations in: ${migrationsPath}`);
      await migrate(db, { migrationsFolder: migrationsPath });
      console.log("Migrations completed.");
    } catch (error) {
      console.error("Migration failed:", error);
      // Don't throw, let the app try to start anyway
    }
  }
}
