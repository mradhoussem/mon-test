export enum enumStatut {
  A_Faire = "a_faire",
  En_Cours = "en_cours",
  Termine = "termine",
}

// Mapping enum value to display text
export const enumStatutText: Record<enumStatut, string> = {
  [enumStatut.A_Faire]: "À faire",
  [enumStatut.En_Cours]: "En cours",
  [enumStatut.Termine]: "Terminé",
};