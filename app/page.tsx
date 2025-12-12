"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./lib/hooks/useAuth";

// fade-in hook
function useCssReady<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return { ref, isReady };
}

export default function HomePage() {
  const router = useRouter();
  const { user, checkingAuth } = useAuth(); 
  const { ref: cssReadyRef, isReady } = useCssReady<HTMLDivElement>();

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="w-12 h-12 border-4 border-[#5a1ded] border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#5a1ded] text-white">
      {/* LEFT SIDE */}
      <div className="relative w-full md:flex-1 flex items-center justify-center p-6 md:p-12">
        <div
          ref={cssReadyRef}
          className={`w-full h-64 relative transition-opacity duration-1000 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src="/assets/tasks.gif"
            alt="Tasks Logo"
            fill
            style={{ objectFit: "contain" }}
            unoptimized
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className={`flex-1 flex flex-col items-center md:items-start justify-center p-6 md:p-12 space-y-6 text-center md:text-left transition-opacity duration-1000 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-bold">Bienvenue</h1>
        <p className="text-base md:text-lg">
          Cliquez ci-dessous pour accéder à votre compte
        </p>

        <button
          className="bg-black text-[#09ffba] shadow-md shadow-[#09ffba] px-8 py-4 rounded-2xl font-semibold hover:bg-gray-900 hover:text-[#fa0ecb] transition hover:shadow-[#fa0ecb]"
          onClick={() =>
            router.push(user ? "/home" : "/authentification/signin")
          }
        >
          {user ? "Accéder à la plateforme" : "Se connecter"}
        </button>
      </div>
    </div>
  );
}
