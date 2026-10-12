import Link from "next/link";
import { siteName } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="font-serif text-2xl tracking-tight text-foreground">
          {siteName}
        </Link>
        <p className="hidden text-sm text-muted sm:block">Gatos esperando um lar</p>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-6 text-sm text-muted">
        {siteName} · cada gato tem um link para compartilhar
      </div>
    </footer>
  );
}
