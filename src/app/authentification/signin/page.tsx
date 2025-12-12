
import SignIn from "./signIn";

import { createSupabaseServerClient } from "@/supabase/server-client";

export default async function signInPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log( { user });
  return <SignIn/>;
}
