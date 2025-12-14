import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../../supabase/server-client"; // adjust path
import TachesPageClient from "./TasksPageClient";

export default async function TasksPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/authentification/signin");
  }

  return <TachesPageClient />;
}