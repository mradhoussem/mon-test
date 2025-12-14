import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../../supabase/server-client";
import SignUp from "./signUp";

export default async function SignUpPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/home");
  }

  return <SignUp />;
}