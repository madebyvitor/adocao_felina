export const siteName = "Doação Felina";

export const siteDescription =
  "Catálogo de gatos para adoção. Veja o perfil, compartilhe o link e chame no WhatsApp.";

/** Troque pelo domínio público no deploy para os cards de Open Graph. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Números placeholder. Substituir pelos dois WhatsApps reais antes de publicar. */
export const whatsappNumbers = [
  { id: "whatsapp-1", phone: "5500000000001" },
  { id: "whatsapp-2", phone: "5500000000002" },
] as const;

export function adoptionMessage(catName: string) {
  return `Olá! Vi o ${catName} no site Doação Felina e gostaria de saber mais sobre a adoção.`;
}

export function whatsappHref(phone: string, catName: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(adoptionMessage(catName))}`;
}
