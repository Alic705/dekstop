import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

let pool;
if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL must be set. Did you forget to provision a database? Using dummy pool for static data mode.",
  );
  // Create a dummy pool that won't connect but won't crash immediately on import
  pool = new Pool({
    max: 1,
    connectionTimeoutMillis: 1000,
    idleTimeoutMillis: 1000,
  });
} else {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}

export const db = drizzle(pool, { schema });
