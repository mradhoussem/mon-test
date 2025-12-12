"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TablesInsert } from "../../../supabase/supabase-types";
import { getSupabaseBrowserClient } from "../../../supabase/browser-client";

type TacheInsert = TablesInsert<"taches">;

export function useCreateTask() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [tache, setTache] = useState<TacheInsert>({
    titre: "",
    description: null,
    statut: "a_faire",
    priorite: "moyenne",
    date_echeance: null,
    user_id: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        if (!data.user) {
          router.push("../../authentification/signin");
          return;
        }
        setUserId(data.user.id);
        setTache((prev) => ({ ...prev, user_id: data.user.id }));
      }
    };
    fetchUser();
  }, [router, supabase]);

  const resetTache = () => {
    if (!userId) return;
    setTache({
      titre: "",
      description: null,
      statut: "a_faire",
      priorite: "moyenne",
      date_echeance: null,
      user_id: userId,
    });
  };

  return {
    supabase,
    tache,
    setTache,
    userId,
    resetTache,
  };
}
