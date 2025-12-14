"use server";

import { createSupabaseServerClient } from "../../../supabase/server-client";

interface SignUpData {
  email: string;
  fullname: string;
  password: string;
}

export async function signUpAction({ email, fullname, password }: SignUpData) {
  const supabase = await createSupabaseServerClient(true);

  // ✅ Check if user already exists
  const { data, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) {
    return { error: listError.message };
  }

  const exists = data.users.some(
    (u) => u.email && u.email.toLowerCase() === email.toLowerCase()
  );

  if (exists) {
    return { error: "Cet email existe déjà !" };
  }

  // ✅ Create new user
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName: fullname },
    },
  });

  if (signUpError) {
    return { error: signUpError.message };
  }

  return { success: true };
}
