"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useLayoutEffect, useState } from "react";

type CatPhotoProps = {
  slug: string;
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
};

export function CatPhoto({
  slug,
  src,
  alt,
  priority = false,
  sizes,
  className,
}: CatPhotoProps) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    setVisible(true);
    return () => setVisible(false);
  }, []);

  return (
    <motion.div
      layoutId={reduce || !visible ? undefined : `cat-photo-${slug}`}
      className={className}
      style={{ borderRadius: 28 }}
      transition={{ type: "spring", stiffness: 320, damping: 34, mass: 0.8 }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : null}
    </motion.div>
  );
}
