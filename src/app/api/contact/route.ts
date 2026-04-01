import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { contactMessages } from "@/db/schema";
import { contactFormSchema } from "@/modules/contact/schemas/contact";

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

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  await db.insert(contactMessages).values(parsed.data);

  return NextResponse.json({ ok: true });
}
