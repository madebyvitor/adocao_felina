"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { CatCard } from "@/components/cat-card";
import { statusLabel, type Cat } from "@/lib/cats";

const filters = ["todos", "disponivel", "em_processo", "adotado"] as const;
type Filter = (typeof filters)[number];

const filterLabel: Record<Filter, string> = {
  todos: "Todos",
  disponivel: statusLabel.disponivel,
  em_processo: statusLabel.em_processo,
  adotado: statusLabel.adotado,
};

export function Catalog({ cats }: { cats: Cat[] }) {
  const [filter, setFilter] = useState<Filter>("todos");
  const visible =
    filter === "todos" ? cats : cats.filter((cat) => cat.status === filter);

  const counts = {
    todos: cats.length,
    disponivel: cats.filter((cat) => cat.status === "disponivel").length,
    em_processo: cats.filter((cat) => cat.status === "em_processo").length,
    adotado: cats.filter((cat) => cat.status === "adotado").length,
  };

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filtrar por status">
        {filters.map((item) => {
          const selected = filter === item;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(item)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                selected
                  ? "border-foreground bg-foreground text-card"
                  : "border-line bg-card text-foreground hover:border-foreground/30"
              }`}
            >
              {filterLabel[item]}
              <span className={selected ? "text-card/70" : "text-muted"}> · {counts[item]}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-muted">Nenhum gato neste status agora.</p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((cat, index) => (
              <CatCard key={cat.slug} cat={cat} index={index} priority={index < 2} />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
