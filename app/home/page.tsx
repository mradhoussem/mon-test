import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../supabase/server-client"; // adjust path

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/authentification/signin");
  }

  redirect("/home/taches");
}
