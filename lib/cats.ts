import { cacheLife } from "next/cache";
import type { Cat, CatStatus } from "@/lib/cat";
import { getSupabase } from "@/lib/supabase";

export type { AgeGroup, Cat, CatStatus } from "@/lib/cat";
export { ageGroup, statusLabel } from "@/lib/cat";

const statusOrder: Record<CatStatus, number> = {
  disponivel: 0,
  em_processo: 1,
  adotado: 2,
};

type CatRow = {
  id: string;
  slug: string | null;
  name: string;
  age_description: string | null;
  sex: string | null;
  description: string | null;
  personality: string | null;
  health_info: string | null;
  photos: string[] | null;
  whatsapp_contacts: string[] | null;
  status: CatStatus;
  created_at: string;
};

function toCat(row: CatRow): Cat {
  return {
    id: row.id,
    slug: row.slug ?? "",
    name: row.name,
    age_description: row.age_description ?? "",
    sex: row.sex ?? "",
    description: row.description ?? "",
    personality: row.personality ?? "",
    health_info: row.health_info ?? "",
    photos: (row.photos ?? []).filter((photo) => photo.length > 0),
    whatsapp_contacts: (row.whatsapp_contacts ?? []).filter((phone) => phone.length > 0),
    status: row.status,
    created_at: row.created_at,
  };
}

function sortCats(cats: Cat[]) {
  return [...cats].sort((a, b) => {
    const byStatus = statusOrder[a.status] - statusOrder[b.status];
    if (byStatus !== 0) return byStatus;
    return b.created_at.localeCompare(a.created_at);
  });
}

async function queryCats(): Promise<Cat[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("cats")
    .select(
      "id, slug, name, age_description, sex, description, personality, health_info, photos, whatsapp_contacts, status, created_at",
    );

  if (error) {
    throw new Error(`Não foi possível ler os gatos no Supabase: ${error.message}`);
  }

  return sortCats((data ?? []).map((row) => toCat(row as CatRow)));
}

const catalogCache = {
  stale: 300,
  revalidate: 60,
  expire: 3600,
} as const;

export async function getCats(): Promise<Cat[]> {
  "use cache";
  cacheLife(catalogCache);
  return queryCats();
}

export async function getCatBySlug(slug: string): Promise<Cat | null> {
  "use cache";
  cacheLife(catalogCache);
  const cats = await getCats();
  return cats.find((cat) => cat.slug === slug) ?? null;
}
