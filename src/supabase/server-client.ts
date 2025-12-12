import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getEnvironmentVariables(useServiceRole = false) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = useServiceRole
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase URL or Key");
  }

  return { supabaseUrl, supabaseKey };
}

export async function createSupabaseServerClient(useServiceRole = false) {
  const { supabaseUrl, supabaseKey } = getEnvironmentVariables(useServiceRole);
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        );
      },
    },
  });
}