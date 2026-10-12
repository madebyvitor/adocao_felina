import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CatGallery } from "@/components/cat-gallery";
import { Reveal } from "@/components/reveal";
import { ShareProfile } from "@/components/share-profile";
import { StatusBadge } from "@/components/status-badge";
import { WhatsAppButtons } from "@/components/whatsapp-buttons";
import { getCatBySlug, getCats } from "@/lib/cats";

type CatPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const cats = await getCats();
  return cats.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: CatPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCatBySlug(slug);
  if (!cat) {
    return { title: "Gato não encontrado" };
  }

  const title = `Adote o ${cat.name}!`;

  return {
    title,
    description: cat.personality,
    alternates: { canonical: `/gatos/${cat.slug}` },
    openGraph: {
      title,
      description: cat.personality,
      url: `/gatos/${cat.slug}`,
      type: "website",
      images: [{ url: cat.photos[0], alt: `Foto de ${cat.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cat.personality,
      images: [cat.photos[0]],
    },
  };
}

export default function CatPage({ params }: CatPageProps) {
  return (
    <Suspense fallback={<CatProfileFallback />}>
      <CatProfile params={params} />
    </Suspense>
  );
}

function CatProfileFallback() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:py-12">
      <div className="h-4 w-36 rounded-full bg-line" />
      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
        <div className="aspect-[4/5] animate-pulse rounded-[1.75rem] bg-line sm:aspect-[5/4]" />
        <div className="space-y-4">
          <div className="h-6 w-28 animate-pulse rounded-full bg-line" />
          <div className="h-12 w-48 animate-pulse rounded-2xl bg-line" />
          <div className="h-14 animate-pulse rounded-2xl bg-line" />
          <div className="h-14 animate-pulse rounded-2xl bg-line" />
        </div>
      </div>
    </main>
  );
}

async function CatProfile({ params }: CatPageProps) {
  const { slug } = await params;
  const cat = await getCatBySlug(slug);
  if (!cat) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:py-12">
      <Link href="/" className="text-sm text-muted hover:text-foreground">
        Voltar ao catálogo
      </Link>

      <article className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
        <CatGallery slug={cat.slug} name={cat.name} photos={cat.photos} />

        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={cat.status} />
            <p className="text-sm text-muted">
              {cat.age_description} · {cat.sex}
            </p>
          </div>
          <h1 className="mt-3 font-serif text-5xl tracking-tight">{cat.name}</h1>

          <section className="mt-6">
            <h2 className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
              Temperamento
            </h2>
            <p className="mt-2 font-serif text-2xl leading-snug text-balance">{cat.personality}</p>
          </section>

          {cat.status === "em_processo" ? (
            <p className="mt-6 rounded-2xl bg-progress-bg px-4 py-3 text-sm leading-relaxed text-progress">
              A adoção já está em andamento. O contato continua aberto para quem quiser
              saber como está o processo.
            </p>
          ) : null}

          {cat.status === "adotado" ? (
            <p className="mt-6 rounded-2xl bg-adopted-bg px-4 py-4 text-sm leading-relaxed text-adopted">
              {cat.name} já encontrou um lar. O perfil fica no site como um final feliz, sem
              novo contato de adoção.
            </p>
          ) : (
            <div className="mt-6">
              <WhatsAppButtons catName={cat.name} />
            </div>
          )}

          <section className="mt-8">
            <h2 className="text-xs font-medium tracking-[0.18em] text-accent uppercase">História</h2>
            <p className="mt-2 text-base leading-relaxed text-foreground/90">{cat.description}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-xs font-medium tracking-[0.18em] text-accent uppercase">Saúde</h2>
            <p className="mt-2 text-base leading-relaxed text-foreground/90">{cat.health_info}</p>
          </section>

          <div className="mt-8">
            <ShareProfile name={cat.name} />
          </div>
        </Reveal>
      </article>
    </main>
  );
}
