"use client";

import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { CatPhoto } from "@/components/cat-photo";

export function CatGallery({
  slug,
  name,
  photos,
}: {
  slug: string;
  name: string;
  photos: string[];
}) {
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    setActive(0);
  }, []);

  return (
    <div>
      <CatPhoto
        slug={slug}
        src={photos[active] ?? photos[0]}
        alt={`Foto de ${name}`}
        priority
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="relative aspect-[4/5] overflow-hidden bg-line sm:aspect-[5/4]"
      />
      {photos.length > 1 ? (
        <div className="mt-3 flex gap-2">
          {photos.map((photo, index) => {
            const selected = index === active;
            return (
              <button
                key={photo}
                type="button"
                aria-label={`Ver foto ${index + 1} de ${name}`}
                aria-pressed={selected}
                onClick={() => setActive(index)}
                className={`relative h-16 w-16 overflow-hidden rounded-2xl border ${
                  selected ? "border-foreground" : "border-transparent opacity-80"
                }`}
              >
                <Image
                  src={photo}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
