import { whatsappHref, whatsappNumbers } from "@/lib/site";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.3-1.1A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5zM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-3.2.8.8-3.1-.2-.3A9 9 0 1 1 12 21zm5-6.7c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7 1c-.1.1-.3.2-.5.1a7.4 7.4 0 0 1-2.2-1.4 8 8 0 0 1-1.5-1.9c-.1-.3 0-.4.1-.5l.4-.5.3-.4c.1-.2 0-.4 0-.5l-.8-1.8c-.2-.4-.4-.4-.5-.4h-.5a1.1 1.1 0 0 0-.8.4 3.2 3.2 0 0 0-1 2.4 5.6 5.6 0 0 0 1.2 3 12 12 0 0 0 4.6 4 4 4 0 0 0 2.2.6 2.5 2.5 0 0 0 1.7-.6 2 2 0 0 0 .5-1.5c.1-.2 0-.3-.2-.4z" />
    </svg>
  );
}

export function WhatsAppButtons({ catName }: { catName: string }) {
  return (
    <div className="flex flex-col gap-3">
      {whatsappNumbers.map((contact, index) => (
        <a
          key={contact.id}
          href={whatsappHref(contact.phone, catName)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Entrar em contato pelo WhatsApp ${index + 1}`}
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 text-base font-medium text-foreground transition-colors hover:bg-accent-dark"
        >
          <WhatsAppIcon />
          Entrar em contato
        </a>
      ))}
    </div>
  );
}
