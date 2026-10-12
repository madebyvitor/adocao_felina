"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { CatPhoto } from "@/components/cat-photo";
import { StatusBadge } from "@/components/status-badge";
import type { Cat } from "@/lib/cats";

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
    <motion.li
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
        className="group block overflow-hidden rounded-[1.75rem] border border-line bg-card shadow-[0_1px_0_rgba(36,28,21,0.04)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(36,28,21,0.08)]"
      >
        <div className="relative">
          <CatPhoto
            slug={cat.slug}
            src={cat.photos[0]}
            alt={`Foto de ${cat.name}`}
            priority={priority}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="relative aspect-[4/5] overflow-hidden bg-line"
          />
          <div className="absolute bottom-3 left-3">
            <StatusBadge status={cat.status} />
          </div>
        </div>
        <div className="space-y-1.5 px-4 py-4">
          <h2 className="font-serif text-2xl tracking-tight text-foreground">{cat.name}</h2>
          <p className="text-sm text-muted">{cat.age_description}</p>
          <p className="line-clamp-2 text-[15px] leading-snug text-foreground/80">
            {cat.personality}
          </p>
        </div>
      </Link>
    </motion.li>
  );
}
