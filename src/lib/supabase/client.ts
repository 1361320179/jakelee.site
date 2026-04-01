"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Browser Supabase client; null when public env is not configured. */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}
