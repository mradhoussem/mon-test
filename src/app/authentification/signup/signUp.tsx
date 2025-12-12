"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Toaster } from "sonner";
import { useSignUp } from "@/app/lib/hooks/useSignUp";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();

  const {
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
  } = useSignUp();

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-[#5a1ded] via-[#1d8fed] to-[#b3008c] animate-gradientMove"></div>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md text-center"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Rejoignez notre communauté 😃
        </h1>

        <Toaster richColors position="top-right" />

        <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
          {/* Nom complet */}
          <div className="text-left">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Nom complet
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              className="input-custom"
              required
              placeholder="Votre nom"
            />
          </div>

          {/* Email */}
          <div className="text-left">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Adresse e-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-custom"
              required
              placeholder="example@mail.com"
            />
          </div>

          {/* Password */}
          <div className="relative text-left">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Mot de passe
            </label>
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-custom"
              required
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute mt-3 right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPass ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="text-left">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-custom"
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 shadow-lg transition active:scale-[0.98]"
          >
            S&apos;inscrire
          </button>

          <p className="mt-6 text-gray-700 text-sm">
            Vous avez déjà un compte?{" "}
            <span
              onClick={() => router.push("./signin")}
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            >
              Se connecter
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
