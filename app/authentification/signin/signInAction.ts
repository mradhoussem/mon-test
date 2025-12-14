"use server";

import { createSupabaseServerClient } from "../../../supabase/server-client";
import { redirect } from "next/navigation";

export async function signInAction(email: string, password: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Success: redirect
  redirect("/home");
}