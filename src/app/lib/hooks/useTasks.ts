"use client";

import { useState, useEffect } from "react";
import { getSupabaseBrowserClient } from "@/supabase/browser-client";
import { useRouter } from "next/navigation";
import type { Tables, TablesUpdate } from "@/supabase/supabase-types";

type TableTache = Tables<"taches">;
type TacheUpdate = TablesUpdate<"taches">;

export function useTasks() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [taches, setTaches] = useState<TableTache[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setUserId] = useState<string | null>(null);
  const [editingTache, setEditingTache] = useState<TableTache | null>(null);

  // Fetch tasks
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("../../authentification/signin");
        return;
      }

      setUserId(data.user.id);

      const { data: tasks, error } = await supabase
        .from("taches")
        .select("*")
        .eq("user_id", data.user.id)
        .order("created_at", { ascending: false });

      if (!error && tasks) setTaches(tasks);

      setLoading(false);
    };

    fetchData();
  }, [router, supabase]);

  // DELETE
  const deleteTask = async (id: string) => {
    if (!confirm("Supprimer cette tâche ?")) return;

    await supabase.from("taches").delete().eq("id", id);

    setTaches((prev) => prev.filter((t) => t.id !== id));
  };

  // UPDATE
  const updateTask = async (tache: TacheUpdate & { id: string }) => {
    await supabase
      .from("taches")
      .update({
        titre: tache.titre,
        description: tache.description,
        statut: tache.statut,
        priorite: tache.priorite,
        date_echeance: tache.date_echeance,
      })
      .eq("id", tache.id);

    setTaches((prev) =>
      prev.map((t) => (t.id === tache.id ? { ...t, ...tache } : t))
    );

    setEditingTache(null);
  };

  return {
    loading,
    taches,
    editingTache,
    setEditingTache,
    deleteTask,
    updateTask,
  };
}
