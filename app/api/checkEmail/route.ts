import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "../../../supabase/server-client";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const supabase = await createSupabaseServerClient(true);

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    return NextResponse.json({ exists: false, error: error.message });
  }

  const exists = data.users.some(
    (u) => u.email && u.email.toLowerCase() === email.toLowerCase()
  );

  return NextResponse.json({ exists });
}
