"use client";

import Link from "next/link";
import { useState } from "react";
import { siteName, whatsappHelpHref, whatsappNumbers } from "@/lib/site";

const navLinks = [
  { href: "/#gatos", label: "Os gatos" },
  { href: "/#como-adotar", label: "Como adotar" },
  { href: "/#antes", label: "Antes de adotar" },
  { href: "/#sobre", label: "Sobre" },
] as const;

const footerGroups = [
  {
    title: "Adoção",
    links: [
      { href: "/#gatos", label: "Os gatos" },
      { href: "/#como-adotar", label: "Como adotar" },
      { href: "/#antes", label: "Antes de adotar" },
    ],
  },
  {
    title: "O site",
    links: [
      { href: "/#sobre", label: "Sobre" },
      { href: "/#ajuda", label: "Quero ajudar" },
    ],
  },
] as const;

function Logo({ className = "h-16" }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center">
      <img src="/logo.svg" alt={siteName} className={`${className} w-auto`} />
    </Link>
  );
}

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

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Gatos com nome, história e um link para compartilhar.
          </p>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-xs font-medium tracking-[0.16em] text-foreground/70 uppercase">
              {group.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="text-xs font-medium tracking-[0.16em] text-foreground/70 uppercase">
            Contato
          </h2>
          <ul className="mt-4 space-y-2.5">
            {whatsappNumbers.map((contact, index) => (
              <li key={contact.id}>
                <a
                  href={whatsappHelpHref(contact.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-foreground"
                >
                  WhatsApp {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-muted">{siteName}</p>
      </div>
    </footer>
  );
}
