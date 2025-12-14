"use client";

import { useState } from "react";
import { toast } from "sonner";
import { signInAction } from "../../../app/authentification/signin/signInAction";

export function useSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signInAction(email, password);

      if (res?.error) {
        toast.error(res.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleSignIn,
  };
}