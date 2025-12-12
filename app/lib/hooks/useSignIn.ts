"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getSupabaseBrowserClient } from "../../../supabase/browser-client";

export function useSignIn() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error && error.message !== "Auth session missing!") {
          console.error("Erreur vérification utilisateur :", error.message);
        }

        if (data.user) {
          router.replace("/home");
        } else {
          setCheckingAuth(false);
        }
      } catch {
        setCheckingAuth(false);
      }
    };

    checkUser();
  }, [supabase, router]);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Connexion réussie !");
      router.replace("/home");
    }
  };

  return {
    email,
    password,
    checkingAuth,
    setEmail,
    setPassword,
    handleSignIn,
  };
}
