"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpAction } from "../../../app/authentification/signup/signUpAction";

export function useSignUp() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const res = await signUpAction({ email, fullname, password });

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Vérifiez votre boîte mail pour confirmer votre compte !");
      router.push("/authentification/signin");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    fullname,
    password,
    confirmPassword,
    showPass,

    setEmail,
    setFullName,
    setPassword,
    setConfirmPassword,
    setShowPass,

    handleSubmit,
    loading,
  };
}
