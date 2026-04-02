import { NextResponse } from "next/server";
import { contactFormSchema } from "@/modules/contact/schemas/contact";
import { sendContactAutoReply, sendContactNotification } from "@/lib/email";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Server database client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      },
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

  // #region agent log
  console.error("[api/contact] inserting message via supabase");
  // #endregion agent log

  const { error } = await supabase.from("contact_messages").insert(parsed.data);
  if (error) {
    // #region agent log
    console.error("[api/contact] supabase insert error", {
      code: error.code,
      message: error.message,
    });
    // #endregion agent log
    return NextResponse.json({ error: "Database insert failed" }, { status: 500 });
  }

  try {
    await sendContactNotification(parsed.data);
  } catch (err) {
    console.error("[api/contact] notification email failed", {
      name: err instanceof Error ? err.name : typeof err,
      message: err instanceof Error ? err.message : String(err),
    });
  }

  try {
    await sendContactAutoReply(parsed.data);
  } catch (err) {
    console.error("[api/contact] auto reply email failed", {
      name: err instanceof Error ? err.name : typeof err,
      message: err instanceof Error ? err.message : String(err),
    });
  }

  return NextResponse.json({ ok: true });
}
