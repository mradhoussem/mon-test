
import SignUp from "./signUp";

import { createSupabaseServerClient } from "@/supabase/server-client";

export default async function signUpPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log( { user });
  return <SignUp/>;
}
