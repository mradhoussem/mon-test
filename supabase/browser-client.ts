"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./supabase-types";

type SupabaseSchema = Database; // <--- Changed from Record<string, never>

let client: SupabaseClient<SupabaseSchema> | null = null;

export function getSupabaseBrowserClient(): SupabaseClient<SupabaseSchema> {
  if (client) {
    return client;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  // Now the client is correctly typed and knows about the "taches" table
  client = createBrowserClient<SupabaseSchema>(supabaseUrl, supabaseKey);
  return client;
}
