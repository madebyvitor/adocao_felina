"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { CatPhoto } from "@/components/cat-photo";
import { StatusBadge } from "@/components/status-badge";
import type { Cat } from "@/lib/cat";

export function CatCard({
  cat,
  index,
  priority,
}: {
  cat: Cat;
  index: number;
  priority: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <m.li
      layout
      initial={reduce ? false : { y: 10 }}
      animate={{
        y: 0,
        transition: { duration: 0.4, delay: reduce ? 0 : index * 0.04, ease: [0.22, 1, 0.36, 1] },
      }}
      exit={{ opacity: 0, transition: { duration: 0.18 } }}
      whileHover={reduce ? undefined : { y: -4 }}
      className="min-w-0"
    >
      <Link
        href={`/gatos/${cat.slug}`}
        className="group block overflow-hidden rounded-[1.75rem] bg-card shadow-[0_10px_30px_rgba(65,87,91,0.06)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(65,87,91,0.1)]"
      >
        <div className="relative">
          <CatPhoto
            slug={cat.slug}
            src={cat.photos[0]}
            alt={`Foto de ${cat.name}`}
            priority={priority}
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
            className="relative aspect-[4/5] overflow-hidden bg-line"
          />
          <div className="absolute bottom-3 left-3">
            <StatusBadge status={cat.status} />
          </div>
        </div>
        <div className="space-y-1.5 px-4 py-4">
          <h3 className="font-serif text-2xl tracking-tight text-foreground">{cat.name}</h3>
          <p className="text-xs tracking-[0.14em] text-muted uppercase">{cat.age_description}</p>
          <p className="line-clamp-2 text-sm leading-snug text-foreground/80">{cat.personality}</p>
          <p className="pt-2 text-sm font-medium text-foreground">
            Ver perfil{" "}
            <span className="inline-block transition-transform group-hover:translate-x-0.5" aria-hidden="true">
              →
            </span>
          </p>
        </div>
      </Link>
    </m.li>
  );
}
