import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../../supabase/server-client";
import SignIn from "./signIn";

export default async function SignInPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/home");
  }

  return <SignIn />;
}