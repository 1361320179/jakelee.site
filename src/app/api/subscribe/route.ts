import { NextResponse } from "next/server";
import { subscribeSchema } from "@/modules/newsletter/schemas/subscribe";
import { sendSubscribeConfirmation, sendSubscribeNotification } from "@/lib/email";
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

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    // #region agent log
    console.error("[api/subscribe] inserting subscriber via supabase");
    // #endregion agent log

    const { error } = await supabase
      .from("subscribers")
      .upsert({ email: parsed.data.email }, { onConflict: "email", ignoreDuplicates: true });

    if (error) {
      // #region agent log
      console.error("[api/subscribe] supabase insert error", {
        code: error.code,
        message: error.message,
      });
      // #endregion agent log
      return NextResponse.json({ error: "Database insert failed" }, { status: 500 });
    }
  } catch (err) {
    // #region agent log
    console.error("[api/subscribe] insert failed", {
      name: err instanceof Error ? err.name : typeof err,
      message: err instanceof Error ? err.message : String(err),
    });
    // #endregion agent log
    return NextResponse.json(
      { error: "Database insert failed" },
      { status: 500 },
    );
  }

  try {
    await sendSubscribeNotification(parsed.data);
  } catch (err) {
    console.error("[api/subscribe] notification email failed", {
      name: err instanceof Error ? err.name : typeof err,
      message: err instanceof Error ? err.message : String(err),
    });
  }

  try {
    await sendSubscribeConfirmation(parsed.data);
  } catch (err) {
    console.error("[api/subscribe] confirmation email failed", {
      name: err instanceof Error ? err.name : typeof err,
      message: err instanceof Error ? err.message : String(err),
    });
  }

  return NextResponse.json({ ok: true });
}
