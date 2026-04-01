import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

const globalForDb = globalThis as unknown as { __jakeleeDb?: Db };

function createDb(url: string): Db {
  const client = postgres(url, { max: 10, prepare: false });
  return drizzle(client, { schema });
}

/** Postgres + Drizzle; null when `DATABASE_URL` is not set (e.g. local UI-only dev). */
export function getDb(): Db | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;

  if (!globalForDb.__jakeleeDb) {
    globalForDb.__jakeleeDb = createDb(url);
  }
  return globalForDb.__jakeleeDb;
}
