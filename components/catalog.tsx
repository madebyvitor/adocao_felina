"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { CatCard } from "@/components/cat-card";
import { ageGroup, type AgeGroup, type Cat } from "@/lib/cat";

const ageFilters = ["filhote", "adulto", "idoso"] as const;
type Filter = "todos" | AgeGroup;

const filterLabel: Record<Filter, string> = {
  todos: "Todos",
  filhote: "Filhotes",
  adulto: "Adultos",
  idoso: "Idosos",
};

export function Catalog({ cats }: { cats: Cat[] }) {
  const [filter, setFilter] = useState<Filter>("todos");
  const counts: Record<AgeGroup, number> = {
    filhote: cats.filter((cat) => ageGroup(cat.age_description) === "filhote").length,
    adulto: cats.filter((cat) => ageGroup(cat.age_description) === "adulto").length,
    idoso: cats.filter((cat) => ageGroup(cat.age_description) === "idoso").length,
  };
  const visibleFilters = ageFilters.filter((item) => counts[item] > 0);
  const visible =
    filter === "todos" ? cats : cats.filter((cat) => ageGroup(cat.age_description) === filter);

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
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
        <button
          type="button"
          onClick={() => setFilter("todos")}
          className="self-start text-sm font-medium text-foreground sm:self-auto"
        >
          Todos os gatos →
        </button>
      </div>

      <div
        className="mt-8 flex gap-2 overflow-x-auto pb-1"
        role="group"
        aria-label="Filtrar por idade"
      >
        {(["todos", ...visibleFilters] as const).map((item) => {
          const selected = filter === item;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(item)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                selected
                  ? "border-foreground bg-foreground text-background"
                  : "border-line bg-card text-foreground hover:border-foreground/30"
              }`}
            >
              {filterLabel[item]}
            </button>
          );
        })}
      </div>

      {cats.length === 0 ? (
        <p className="mt-10 text-muted">Nenhum gato no catálogo agora.</p>
      ) : visible.length === 0 ? (
        <p className="mt-10 text-muted">Nenhum gato nesta idade agora.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((cat, index) => (
              <CatCard key={cat.slug} cat={cat} index={index} priority={false} />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
