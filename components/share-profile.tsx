"use client";

import { useEffect, useState } from "react";

export function ShareProfile({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [copyError, setCopyError] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyError(false);
      setCopied(true);
    } catch {
      setCopyError(true);
    }
  }

  async function share() {
    try {
      await navigator.share({
        title: `Adote o ${name}!`,
        text: `Olha o perfil do ${name} na Adoção Felina.`,
        url: window.location.href,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex h-11 items-center justify-center rounded-full border border-line bg-card px-4 text-sm text-foreground transition-colors hover:border-foreground/30"
      >
        {copied ? "Link copiado" : "Copiar link"}
      </button>
      {canShare ? (
        <button
          type="button"
          onClick={share}
          className="inline-flex h-11 items-center justify-center rounded-full border border-line bg-card px-4 text-sm text-foreground transition-colors hover:border-foreground/30"
        >
          Compartilhar
        </button>
      ) : null}
      {copyError ? (
        <p className="self-center text-sm text-muted">Não foi possível copiar. Selecione o endereço do navegador.</p>
      ) : null}
    </div>
  );
}
