import { Catalog } from "@/components/catalog";
import { getCats } from "@/lib/cats";

export default async function HomePage() {
  const cats = await getCats();
  const available = cats.filter((cat) => cat.status === "disponivel").length;

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">Adoção</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-balance sm:text-5xl">
          Gatos à procura de um lar
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Escolha um perfil, compartilhe o link e chame no WhatsApp. Quem já foi adotado
          continua aqui, como final feliz.
        </p>
        <p className="mt-4 text-sm text-foreground">
          {available} {available === 1 ? "disponível" : "disponíveis"} agora
        </p>
      </div>
      <div className="mt-8">
        <Catalog cats={cats} />
      </div>
    </main>
  );
}
