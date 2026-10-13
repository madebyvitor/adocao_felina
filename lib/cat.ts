export type CatStatus = "disponivel" | "em_processo" | "adotado";

export type Cat = {
  id: string;
  slug: string;
  name: string;
  age_description: string;
  sex: string;
  description: string;
  personality: string;
  health_info: string;
  photos: string[];
  whatsapp_contact: string;
  status: CatStatus;
  created_at: string;
};

export type AgeGroup = "filhote" | "adulto" | "idoso";

export function ageGroup(ageDescription: string): AgeGroup {
  const text = ageDescription.toLocaleLowerCase("pt-BR");
  if (text.includes("filhote") || text.includes("mês") || text.includes("mes")) {
    return "filhote";
  }
  const years = text.match(/(\d+)\s*anos?/);
  if (text.includes("idos") || (years !== null && Number(years[1]) >= 8)) {
    return "idoso";
  }
  return "adulto";
}

export const statusLabel: Record<CatStatus, string> = {
  disponivel: "Disponível",
  em_processo: "Em andamento",
  adotado: "Adotado",
};
