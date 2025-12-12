
import { createSupabaseServerClient } from "../../../supabase/server-client";
import SignUp from "./signUp";


export default async function signUpPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log( { user });
  return <SignUp/>;
}
