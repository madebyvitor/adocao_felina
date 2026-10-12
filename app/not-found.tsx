import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-24">
      <h1 className="font-serif text-4xl tracking-tight">Esse perfil não está aqui</h1>
      <p className="mt-3 max-w-md text-muted">
        O link pode ter mudado. Volte ao catálogo para ver quem está disponível.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm text-card"
      >
        Ver o catálogo
      </Link>
    </main>
  );
}
