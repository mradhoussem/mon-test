"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getSupabaseBrowserClient } from "../../../supabase/browser-client";

export function useSignUp() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // ⬇️ Check user auth on load
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.replace("/home");
      } else {
        setCheckingAuth(false);
      }
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) router.replace("/home");
      }
    );

    return () => listener?.subscription.unsubscribe();
  }, [router, supabase]);

  // ⬇️ Sign up handler
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    const res = await fetch("/api/checkEmail", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    const { exists } = await res.json();

    if (exists) {
      toast.error("Cet email existe déjà !");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { displayName: fullname } },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Vérifiez votre boîte mail pour confirmer votre compte !");
      setEmail("");
      setFullName("");
      setPassword("");
      setConfirmPassword("");
    }
  }

  return {
    email,
    fullname,
    password,
    confirmPassword,
    showPass,
    checkingAuth,

    setEmail,
    setFullName,
    setPassword,
    setConfirmPassword,
    setShowPass,

    handleSubmit,
  };
}
