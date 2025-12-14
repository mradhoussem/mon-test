import { useMemo, useState } from "react";
import { enumPriorite } from "../../../supabase/enums/enum_Priorite";
import { enumStatut } from "../../../supabase/enums/enum_Statut";

const prioriteOrder = [
  enumPriorite.Haute,
  enumPriorite.Moyenne,
  enumPriorite.Basse,
];
const statutOrder = [
  enumStatut.A_Faire,
  enumStatut.En_Cours,
  enumStatut.Termine,
];

export function useTaskFilter<
  T extends {
    titre: string;
    description?: string | null;
    priorite?: string | null;
    date_echeance?: string | null;
    statut?: string | null;
  }
>(tasks: T[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFields] = useState<("titre" | "description" | "statut")[]>([
    "titre",
    "description",
    "statut",
  ]);

  const [sortField, setSortField] = useState<
    "titre" | "priorite" | "date_echeance" | "statut"
  >("titre");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // SEARCH
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((t) =>
        searchFields.some((field) =>
          (t[field] ?? "").toLowerCase().includes(term)
        )
      );
    }

    result.sort((a, b) => {
      let valA: string | number = "";
      let valB: string | number = "";

      switch (sortField) {
        case "priorite":
          valA = prioriteOrder.findIndex(
            (p) => p.toLowerCase() === (a.priorite ?? "Moyenne").toLowerCase()
          );
          valB = prioriteOrder.findIndex(
            (p) => p.toLowerCase() === (b.priorite ?? "Moyenne").toLowerCase()
          );
          break;

        case "statut":
          valA = statutOrder.findIndex(
            (s) => s.toLowerCase() === (a.statut ?? "À faire").toLowerCase()
          );
          valB = statutOrder.findIndex(
            (s) => s.toLowerCase() === (b.statut ?? "À faire").toLowerCase()
          );
          break;

        case "date_echeance":
          valA = a.date_echeance ?? "";
          valB = b.date_echeance ?? "";
          break;

        case "titre":
        default:
          valA = a.titre.toLowerCase();
          valB = b.titre.toLowerCase();
          break;
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [tasks, searchTerm, searchFields, sortField, sortOrder]);

  const toggleSort = (
    field: "titre" | "priorite" | "date_echeance" | "statut"
  ) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredTasks,
    sortField,
    sortOrder,
    toggleSort,
  };
}
