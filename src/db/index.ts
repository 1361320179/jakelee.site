import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

const globalForDb = globalThis as unknown as { __jakeleeDb?: Db };

function createDb(url: string): Db {
  // #region agent log
  try {
    const u = new URL(url);
    // NOTE: Vercel runtime cannot reach localhost; log to stdout for Function Logs.
    console.error("[db] createDb connection info (sanitized)", {
      protocol: u.protocol,
      host: u.hostname,
      port: u.port || null,
      user: u.username || null,
      db: u.pathname?.replace(/^\//, "") || null,
      sslmode: u.searchParams.get("sslmode"),
    });
  } catch {
    console.error("[db] DATABASE_URL not parseable by URL()");
  }
  // #endregion agent log
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
