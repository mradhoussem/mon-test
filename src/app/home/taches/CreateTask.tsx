"use client";

import { useCreateTask } from "@/app/lib/hooks/useTaskForm";
import CptDropDown from "../../components/cpt_dropdown";
import CptTextField from "@/app/components/cpt_textfield";
import type { TablesInsert } from "@/supabase/supabase-types";

type TacheInsert = TablesInsert<"taches">;

interface Props {
  switchTab: () => void;
}

export default function CreateTask({ switchTab }: Props) {
  const { supabase, tache, setTache, userId, resetTache } = useCreateTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    const { error } = await supabase.from("taches").insert([tache]).select();
    if (error) {
      console.error("Erreur ajout tâche:", error.message);
      return;
    }

    resetTache();
    switchTab();
  };

  const statutOptions = [
    { value: "a_faire", label: "À faire" },
    { value: "en_cours", label: "En cours" },
    { value: "termine", label: "Terminé" },
  ];

  const prioriteOptions = [
    { value: "basse", label: "Basse" },
    { value: "moyenne", label: "Moyenne" },
    { value: "haute", label: "Haute" },
  ];

  return (
    <div className="max-w-4xl p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-5"
      >
        <CptTextField
          label="Titre"
          value={tache.titre}
          placeholder="Entrez un titre"
          onChange={(val) => setTache({ ...tache, titre: val })}
          invalidMessage="Le titre est obligatoire."
          required
        />

        <CptTextField
          label="Description"
          value={tache.description ?? ""}
          placeholder="Entrez la description"
          onChange={(val) => setTache({ ...tache, description: val })}
        />

        <CptDropDown
          labelText="Statut"
          closeOptions
          value={tache.statut ?? "a_faire"}
          onChange={(v) =>
            setTache({
              ...tache,
              statut: (v ?? "a_faire") as TacheInsert["statut"],
            })
          }
          options={statutOptions}
        />

        <CptDropDown
          labelText="Priorité"
          closeOptions
          value={tache.priorite ?? "moyenne"}
          onChange={(v) =>
            setTache({
              ...tache,
              priorite: (v ?? "moyenne") as TacheInsert["priorite"],
            })
          }
          options={prioriteOptions}
        />

        <CptTextField
          type="date"
          label="Date d'échéance"
          value={tache.date_echeance ?? ""}
          onChange={(val) => setTache({ ...tache, date_echeance: val })}
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white py-3 rounded-xl w-full font-semibold hover:bg-indigo-700"
        >
          Ajouter la tâche
        </button>
      </form>
    </div>
  );
}
