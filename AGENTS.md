# Doação Felina

Catálogo digital para conectar gatos a lares. Nesta etapa o site não fala com o Supabase: os gatos vivem em `lib/cats.ts`, no mesmo formato da futura tabela `cats`.

## Produto

- Página inicial com a vitrine: foto, nome, idade em texto e uma frase de personalidade.
- Perfil em `/gatos/[slug]` com galeria, história, temperamento, saúde e link compartilhável.
- Dois botões **Entrar em contato**, um embaixo do outro, abrindo o WhatsApp com a mensagem do gato. Os números são placeholders em `lib/site.ts`.
- Status: `disponivel`, `em_processo`, `adotado`. Gato adotado permanece no site e não mostra o WhatsApp.
- Open Graph do perfil: título `Adote o {nome}!`, descrição curta e a primeira foto.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, Motion para transição de página e microinterações. Deploy previsto na Vercel. Banco e fotos reais entram depois via Supabase (Postgres + Storage), com cadastro pelo Supabase Studio.

## Dados

Tabela futura `cats`: `id`, `slug`, `name`, `age_description`, `sex`, `description`, `personality`, `health_info`, `photos`, `status`, `created_at`.

Trocar a fonte de dados deve ficar restrito a `getCats()` e `getCatBySlug()`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
