import { createSupabaseServerClient } from "../../../supabase/server-client";
import SignIn from "./signIn";


export default async function signInPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log({ user });
  return <SignIn />;
}
