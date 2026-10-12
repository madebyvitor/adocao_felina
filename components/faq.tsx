"use client";

import { useState } from "react";

const items = [
  {
    question: "Os gatos já chegam castrados e vacinados?",
    answer:
      "A saúde de cada um está no perfil. A maioria dos adultos já está castrada, vacinada e testada. Filhotes seguem o calendário da idade, e a castração fica combinada para quando atingirem o peso.",
  },
  {
    question: "Posso adotar morando em apartamento?",
    answer:
      "Sim. O que importa é tela nas janelas, caixa de areia e alguém que volte para casa. O perfil indica quando a casa precisa ser mais calma.",
  },
  {
    question: "E se eu já tiver outro animal?",
    answer:
      "Dá para apresentar com calma. Leia o temperamento e conte no WhatsApp quem já mora aí. Alguns gatos preferem ser os únicos no começo.",
  },
  {
    question: "Quanto tempo leva o processo?",
    answer:
      "Depende da conversa e da visita. Não há fila automática: o contato abre o papo e a decisão fica com quem vai dividir a casa.",
  },
] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const expanded = open === index;
        const panelId = `duvida-${index}`;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className="font-serif text-xl tracking-tight sm:text-2xl">{item.question}</span>
              <span
                aria-hidden="true"
                className={`text-xl leading-none text-foreground/70 transition-transform motion-reduce:transition-none ${
                  expanded ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-hidden={!expanded}
              className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-5 text-base leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
