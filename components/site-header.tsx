"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/site-logo";

const navLinks = [
  { href: "/#gatos", label: "Os gatos" },
  { href: "/#como-adotar", label: "Como adotar" },
  { href: "/#antes", label: "Antes de adotar" },
  { href: "/#sobre", label: "Sobre" },
] as const;

function GoldLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center justify-center rounded-full bg-accent px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent-dark"
    >
      {children}
    </Link>
  );
}

function OutlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center justify-center rounded-full border border-foreground/20 px-4 text-sm font-medium text-foreground transition-colors hover:border-foreground/50"
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Logo className="h-24" />
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Seções">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <GoldLink href="/#gatos">Quero adotar</GoldLink>
          <OutlineLink href="/#ajuda">Quero ajudar</OutlineLink>
        </div>
        <button
          type="button"
          className="inline-flex h-10 items-center rounded-full border border-foreground/20 px-4 text-sm xl:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Fechar" : "Menu"}
        </button>
      </div>
      {open ? (
        <div id="menu-mobile" className="border-t border-line xl:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4" aria-label="Seções">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="rounded-xl px-2 py-2.5 text-base hover:bg-card"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/#gatos"
                onClick={close}
                className="inline-flex h-11 items-center justify-center rounded-full bg-accent text-sm font-medium text-foreground"
              >
                Quero adotar
              </Link>
              <Link
                href="/#ajuda"
                onClick={close}
                className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/20 text-sm font-medium"
              >
                Quero ajudar
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
