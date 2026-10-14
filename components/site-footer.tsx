import Link from "next/link";
import { Logo } from "@/components/site-logo";
import { siteName, whatsappHelpHref, whatsappNumbers } from "@/lib/site";

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
