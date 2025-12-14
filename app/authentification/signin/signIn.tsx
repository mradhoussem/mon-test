"use client";

import { motion } from "framer-motion";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useSignIn } from "../../lib/hooks/useSignIn";

export default function SignIn() {
  const router = useRouter();
  const { email, setEmail, password, setPassword, handleSignIn, loading } =
    useSignIn();

  return (
    <>
      <Toaster richColors position="top-right" />

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
            Content de vous revoir 👋
          </h1>

          <p className="text-gray-600 mb-6 text-base">
            Veuillez vous connecter pour accéder à votre compte.
          </p>

          {/* ✅ use client-side hook for submit */}
          <form className="flex flex-col space-y-5" onSubmit={handleSignIn}>
            <div className="text-left">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Adresse e-mail
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@mail.com"
                required
                className="input-custom"
                value={email} // controlled
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="text-left">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="input-custom"
                value={password} // controlled
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 shadow-lg transition active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p className="mt-6 text-gray-700 text-sm">
            Vous n’avez pas de compte?{" "}
            <span
              onClick={() => router.push("./signup")}
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            >
              Créez-en un
            </span>
          </p>
        </motion.div>
      </div>
    </>
  );
}
