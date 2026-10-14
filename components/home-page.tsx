import Image from "next/image";
import Link from "next/link";
import { Catalog } from "@/components/catalog";
import type { Cat } from "@/lib/cat";
import { whatsappHelpHref, whatsappNumbers } from "@/lib/site";

function pickNext(cats: Cat[], used: Set<string>, prefer?: (cat: Cat) => boolean) {
  if (prefer) {
    const match = cats.find((cat) => prefer(cat) && !used.has(cat.id));
    if (match) return match;
  }
  return cats.find((cat) => !used.has(cat.id));
}

function article(sex: string) {
  return sex.toLocaleLowerCase("pt-BR").startsWith("f") ? "a" : "o";
}

function PhotoFrame({
  cat,
  priority = false,
  className = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: {
  cat: Cat;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const src = cat.photos[0];

  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] bg-line ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={`Foto de ${cat.name}`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : null}
    </div>
  );
}

const steps = [
  {
    number: "01",
    title: "Conheça o perfil",
    text: "Leia a história, o temperamento e a saúde. O link do gato pode ser compartilhado com quem mora junto.",
  },
  {
    number: "02",
    title: "Chame no WhatsApp",
    text: "No perfil, o botão abre o WhatsApp de quem cuida desse gato, já com o nome na mensagem.",
  },
] as const;

const preparations = [
  { number: "01", title: "Janela com tela", text: "A casa precisa ser segura antes da chegada." },
  { number: "02", title: "Areia, ração e um canto", text: "Um lugar só dele ajuda nos primeiros dias." },
  { number: "03", title: "Tempo de adaptação", text: "O ritmo de cada gato está escrito no perfil." },
  { number: "04", title: "Quem mora junto", text: "A decisão é de todo mundo que divide a casa." },
] as const;

export function HomePageContent({ cats }: { cats: Cat[] }) {
  const used = new Set<string>();
  const hero = cats.find((cat) => cat.status === "disponivel") ?? cats[0];
  if (hero) used.add(hero.id);
  const about = pickNext(cats, used) ?? hero;
  if (about) used.add(about.id);
  const later = pickNext(cats, used, (cat) => cat.status === "adotado") ?? about;
  if (later) used.add(later.id);
  const closing = pickNext(cats, used) ?? later;
  const available = cats.filter((cat) => cat.status === "disponivel").length;
  const inProgress = cats.filter((cat) => cat.status === "em_processo").length;
  const adopted = cats.filter((cat) => cat.status === "adotado").length;

  const stats = [
    {
      value: available,
      label: available === 1 ? "disponível agora" : "disponíveis agora",
    },
    {
      value: inProgress,
      label: "em processo de adoção",
    },
    {
      value: adopted,
      label: adopted === 1 ? "já encontrou um lar" : "já encontraram um lar",
    },
  ];

  return (
    <>
      <section
        className={`mx-auto w-full max-w-6xl items-center gap-10 px-5 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:gap-16 lg:pt-20 ${hero ? "grid lg:grid-cols-2" : ""}`}
      >
        <div>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Um encontro.
            <br />
            Um novo lar.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Cada gato daqui tem nome, história e um jeito próprio de ocupar a casa. Escolha um
            perfil, leia com calma e, se fizer sentido, chame no WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/#gatos"
              className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent-dark"
            >
              Quero adotar
            </Link>
            <Link href="/#como-adotar" className="text-sm font-medium text-foreground">
              Ver como funciona →
            </Link>
          </div>
        </div>
        {hero ? (
          <div className="relative">
            <PhotoFrame cat={hero} priority className="aspect-[4/5] sm:aspect-[5/4]" />
            <Link
              href={`/gatos/${hero.slug}`}
              className="absolute bottom-4 left-4 rounded-full bg-background/90 px-4 py-2 text-sm font-medium backdrop-blur"
            >
              Conheça {article(hero.sex)} {hero.name} →
            </Link>
          </div>
        ) : null}
      </section>

      <section className="border-y border-line" aria-label="Números do catálogo">
        <div className="mx-auto grid max-w-6xl sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-5 py-8 sm:px-8 ${index > 0 ? "border-t border-line sm:border-t-0 sm:border-l" : ""}`}
            >
              <p className="font-serif text-4xl tracking-tight sm:text-5xl">{stat.value}</p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="gatos" className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
        <Catalog cats={cats}>
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
              Ainda procuram um lar
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight text-balance sm:text-5xl">
              Pequenas personalidades.
              <br />
              Grandes encontros.
            </h2>
          </div>
        </Catalog>
      </section>

      <section
        id="sobre"
        className={`mx-auto w-full max-w-6xl items-center gap-10 px-5 py-8 sm:py-12 lg:gap-16 ${about ? "grid lg:grid-cols-2" : ""}`}
      >
        {about ? <PhotoFrame cat={about} className="aspect-[4/5] sm:aspect-[5/4]" /> : null}
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Sobre</p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight text-balance sm:text-5xl">
            O afeto mora nos pequenos gestos.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            Um gato não pede muito: uma janela com tela, a tigela no mesmo horário e alguém que
            volte para casa. A adoção começa quando a rotina cabe nos dois.
          </p>
          <Link href="/#gatos" className="mt-6 inline-flex text-sm font-medium text-foreground">
            Conhecer os gatos →
          </Link>
        </div>
      </section>

      <section id="como-adotar" className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
        <div className="max-w-xl">
          <h2 className="font-serif text-4xl tracking-tight text-balance sm:text-5xl">
            Um caminho simples.
            <br />
            Uma decisão para a vida.
          </h2>
        </div>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2">
          {steps.map((step) => (
            <li key={step.number}>
              <p className="flex items-center gap-3 font-serif text-3xl tracking-tight">
                <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
                {step.number}
              </p>
              <h3 className="mt-4 font-serif text-2xl tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="antes" className="mx-auto w-full max-w-6xl px-5 pb-16 sm:pb-24">
        <div className="rounded-[1.75rem] bg-card px-6 py-10 sm:px-10 sm:py-14">
          <h2 className="max-w-md font-serif text-4xl tracking-tight text-balance sm:text-5xl">
            Antes de abrir a porta, prepare o cuidado.
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2">
            {preparations.map((item) => (
              <li key={item.number} className="border-t border-line pt-5">
                <p className="text-xs tracking-[0.16em] text-muted uppercase">{item.number}</p>
                <h3 className="mt-2 font-serif text-2xl tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 max-w-md border-t border-line pt-8">
            <h3 className="font-serif text-xl">Outros animais</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              A apresentação é devagar. O perfil diz como cada gato convive.
            </p>
          </div>
        </div>
      </section>

      <section
        className={`mx-auto w-full max-w-6xl items-center gap-10 px-5 py-16 sm:py-24 lg:gap-16 ${later ? "grid lg:grid-cols-2" : ""}`}
      >
        <div>
          <h2 className="font-serif text-4xl tracking-tight text-balance sm:text-5xl">
            O amor não tem idade.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            Filhote, adulto ou já com alguns anos: cada um chega com um ritmo. O que muda é o
            tempo de adaptação, não a capacidade de fazer parte da casa.
          </p>
          <Link
            href="/#gatos"
            className="mt-8 inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent-dark"
          >
            Quero conhecer
          </Link>
        </div>
        {later ? <PhotoFrame cat={later} className="aspect-[4/5] sm:aspect-[5/4]" /> : null}
      </section>

      <section id="ajuda" className="mx-auto w-full max-w-6xl px-5 pb-16 sm:pb-24">
        <div className="max-w-xl">
          <h2 className="font-serif text-4xl tracking-tight text-balance sm:text-5xl">
            Quer ajudar de outro jeito?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Divulgação de um perfil e ração fazem diferença. Chame em um dos
            contatos e diga como pode participar.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {whatsappNumbers.map((contact, index) => (
              <a
                key={contact.id}
                href={whatsappHelpHref(contact.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/20 px-5 text-sm font-medium transition-colors hover:border-foreground/50"
              >
                WhatsApp {index + 1}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground text-white">
        <div
          className={`mx-auto max-w-6xl items-center gap-10 px-5 py-16 sm:py-20 lg:gap-16 ${closing ? "grid lg:grid-cols-2" : ""}`}
        >
          {closing ? (
            <PhotoFrame
              cat={closing}
              className="aspect-[4/3]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          ) : null}
          <div>
            <h2 className="font-serif text-4xl tracking-tight text-balance text-white sm:text-5xl">
              Talvez o que falte na sua casa seja uma companhia.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">
              Veja quem está disponível e abra o perfil de quem parecer o seu.
            </p>
            <Link
              href="/#gatos"
              className="mt-8 inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent-dark"
            >
              Quero adotar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
