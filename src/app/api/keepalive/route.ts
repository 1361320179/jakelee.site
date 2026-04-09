import { NextResponse } from "next/server";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Server database client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      },
    );
  }

  try {
    const { error } = await supabase.from("subscribers").select("id").limit(1);

    if (error) {
      console.error("[api/keepalive] supabase query error", {
        code: error.code,
        message: error.message,
      });

      return NextResponse.json(
        { ok: false, error: "Database query failed" },
        {
          status: 500,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate",
          },
        },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        service: "supabase",
        checkedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      },
    );
  } catch (err) {
    console.error("[api/keepalive] unexpected error", {
      name: err instanceof Error ? err.name : typeof err,
      message: err instanceof Error ? err.message : String(err),
    });

    return NextResponse.json(
      { ok: false, error: "Unexpected keepalive failure" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      },
    );
  }
}
