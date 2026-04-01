import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { subscribers } from "@/db/schema";
import { subscribeSchema } from "@/modules/newsletter/schemas/subscribe";

export async function POST(request: Request) {
  const db = getDb();
  if (!db) {
    return NextResponse.json(
      { error: "Database is not configured. Set DATABASE_URL." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  await db
    .insert(subscribers)
    .values({ email: parsed.data.email })
    .onConflictDoNothing({ target: subscribers.email });

  return NextResponse.json({ ok: true });
}
