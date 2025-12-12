export enum enumPriorite {
  Basse = "basse",
  Moyenne = "moyenne",
  Haute = "haute",
}

// Mapping enum value to display text
export const enumPrioriteText: Record<enumPriorite, string> = {
  [enumPriorite.Basse]: "Basse",
  [enumPriorite.Moyenne]: "Moyenne",
  [enumPriorite.Haute]: "Haute",
};