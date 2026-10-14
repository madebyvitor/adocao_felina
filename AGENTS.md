# Doação Felina

Catálogo digital para conectar gatos a lares. Os gatos vêm da tabela `cats` no Supabase. O site só lê; o cadastro é feito no Supabase Studio.

## Produto

- Página inicial com a vitrine: foto, nome, idade em texto e uma frase de personalidade.
- Perfil em `/gatos/[slug]` com galeria, história, temperamento, saúde e link compartilhável.
- No perfil, um botão **Entrar em contato** por número em `whatsapp_contacts`. Com vários números, os botões são **WhatsApp 1**, **WhatsApp 2**, na ordem do array. A seção de ajuda e o rodapé usam os números gerais em `lib/site.ts`.
- Status: `disponivel`, `em_processo`, `adotado`. Gato adotado permanece no site e não mostra o WhatsApp.
- Open Graph do perfil: título `Adote o {nome}!`, descrição curta e a primeira foto.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, Motion para transição de página e microinterações. Deploy previsto na Vercel. Banco e fotos no Supabase (Postgres + Storage). Inserção, atualização e exclusão acontecem no Supabase Studio. A Data API é só leitura.

## Dados

Tabela `cats`: `id`, `slug`, `name`, `age_description`, `sex`, `description`, `personality`, `health_info`, `photos`, `whatsapp_contacts`, `status`, `created_at`.

O `slug` é gerado no banco a partir do nome. `photos` guarda URLs absolutas. A leitura passa por `getCats()` e `getCatBySlug()`, com `SUPABASE_URL` e `SUPABASE_PUBLISHABLE_KEY` no ambiente. O esquema está em `supabase/schema.sql`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
