"use client";

import { useState } from "react";
import { useTasks } from "../../lib/hooks/useTasks";
import { useTaskFilter } from "../../lib/hooks/useSearchTasks";
import {
  enumPriorite,
  enumPrioriteText,
} from "../../../supabase/enums/enum_Priorite";
import {
  enumStatut,
  enumStatutText,
} from "../../../supabase/enums/enum_Statut";
import CptDropDown from "../../components/cpt_dropdown";
import CptTextField from "../../components/cpt_textfield";

export default function TaskManagement() {
  const {
    taches,
    loading,
    editingTache,
    setEditingTache,
    deleteTask,
    updateTask,
  } = useTasks();
  const {
    searchTerm,
    setSearchTerm,
    filteredTasks,
    toggleSort,
    sortField,
    sortOrder,
  } = useTaskFilter(taches);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-[#5a1ded] border-dashed rounded-full animate-spin"></div>
      </div>
    );

  const statutColors = {
    [enumStatut.A_Faire]: "bg-gray-100 text-gray-800",
    [enumStatut.En_Cours]: "bg-orange-100 text-orange-800",
    [enumStatut.Termine]: "bg-green-200 text-black",
  };

  const prioriteColors = {
    [enumPriorite.Basse]: "bg-gray-100 text-gray-800",
    [enumPriorite.Moyenne]: "bg-orange-100 text-orange-800",
    [enumPriorite.Haute]: "bg-red-100 text-red-800",
  };

  return (
    <div className="w-full">
      {/* Search bar */}
      <div className="mt-6 mb-4 relative max-w-md">
        <input
          type="text"
          placeholder="Rechercher par titre, description ou statut..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto mt-2">
        <table className="w-full border-collapse bg-white rounded-xl shadow-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => toggleSort("titre")}
              >
                Titre{" "}
                {sortField === "titre" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="px-6 py-3">Description</th>
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => toggleSort("statut")}
              >
                Statut{" "}
                {sortField === "statut"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => toggleSort("priorite")}
              >
                Priorité{" "}
                {sortField === "priorite"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => toggleSort("date_echeance")}
              >
                Échéance{" "}
                {sortField === "date_echeance"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-start py-4 text-gray-500 pl-5">
                  Aucun tâche correspondante
                </td>
              </tr>
            ) : (
              filteredTasks.map((t) => (
                <tr
                  key={t.id}
                  className="border-b text-center hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{t.titre}</td>
                  <td className="px-6 py-4">{t.description ?? "-"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        statutColors[
                          (t.statut ?? enumStatut.A_Faire) as enumStatut
                        ]
                      }`}
                    >
                      {" "}
                      {
                        enumStatutText[
                          (t.statut ?? enumStatut.A_Faire) as enumStatut
                        ]
                      }{" "}
                    </span>{" "}
                  </td>{" "}
                  <td className="px-6 py-4">
                    {" "}
                    <span
                      className={`px-3 py-1 rounded-full ${
                        prioriteColors[
                          (t.priorite ?? enumPriorite.Moyenne) as enumPriorite
                        ]
                      }`}
                    >
                      {" "}
                      {
                        enumPrioriteText[
                          (t.priorite ?? enumPriorite.Moyenne) as enumPriorite
                        ]
                      }{" "}
                    </span>{" "}
                  </td>
                  <td className="px-6 py-4">{t.date_echeance ?? "-"}</td>
                  <td className="px-6 py-4 flex gap-2 justify-center">
                    {t.statut !== enumStatut.Termine && (
                      <button
                        onClick={() => setEditingTache(t)}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Modifier
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(t.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Supprimer
                    </button>
                    {t.statut !== enumStatut.Termine && (
                      <button
                        onClick={() =>
                          updateTask({ ...t, statut: enumStatut.Termine })
                        }
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Terminer
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editingTache && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Modifier la tâche</h2>
            <CptTextField
              label="Titre"
              value={editingTache.titre}
              onChange={(v) => setEditingTache({ ...editingTache, titre: v })}
            />
            <CptTextField
              label="Description"
              value={editingTache.description ?? ""}
              onChange={(v) =>
                setEditingTache({ ...editingTache, description: v })
              }
            />
            <CptDropDown
              labelText="Statut"
              closeOptions
              value={editingTache.statut ?? ""}
              onChange={(v) =>
                setEditingTache({
                  ...editingTache,
                  statut: v ?? enumStatut.A_Faire,
                })
              }
              options={[
                { value: enumStatut.A_Faire, label: "À faire" },
                { value: enumStatut.En_Cours, label: "En cours" },
              ]}
            />
            <div className="mt-3" />
            <CptDropDown
              labelText="Priorité"
              closeOptions
              value={editingTache.priorite ?? ""}
              onChange={(v) =>
                setEditingTache({
                  ...editingTache,
                  priorite: v ?? enumPriorite.Moyenne,
                })
              }
              options={Object.values(enumPriorite).map((p) => ({
                value: p,
                label: p,
              }))}
            />
            <div className="mt-3" />
            <CptTextField
              label="Date d'échéance"
              type="date"
              value={editingTache.date_echeance ?? ""}
              onChange={(v) =>
                setEditingTache({ ...editingTache, date_echeance: v })
              }
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditingTache(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Annuler
              </button>
              <button
                onClick={() => updateTask(editingTache)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
