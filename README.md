# Karui Docs

Документационный сайт на `@rigbyhost/karui` (без React), с Tailwind CSS v4 и визуальным стилем в духе `shadcn/ui` на zinc-палитре.
Структура документации: categories + guides + reference, как в крупных framework docs.

Сайт работает на самом фреймворке — это одновременно и документация, и живой пример.

## Stack

- `@rigbyhost/karui` 5.x — SSR + file-based routing
- `vite`
- `tailwindcss@4` + `@tailwindcss/vite`
- Двуязычные страницы: English (`/en`) и Русский (`/ru`)
- Автоопределение языка на `/` через `navigator.languages` / `navigator.language`

## Scripts

```bash
npm install
npm run dev          # dev-сервер
npm run check        # tsc --noEmit
npm run build        # клиентская и серверная сборки
npm run build:pages  # экспорт для GitHub Pages (dist/pages)
npm run prerender    # экспорт через karui prerender (dist/static)
npm run start        # production-сервер
```

## Structure

- `src/app.tsx` — bootstrap сайта
- `src/layout.tsx` — общий layout
- `src/content/docs-types.ts` — типы контента
- `src/content/docs.en.ts` / `docs.ru.ts` — сам контент
- `src/content/docs.ts` — выборка и навигация по контенту
- `src/content/i18n.ts` — языки и словари
- `src/content/site.ts` — домен и внешние ссылки
- `src/pages/*` — маршруты
- `src/styles.css` — zinc-тема и UI-слои

## Docs IA

- `Fundamentals`: introduction, installation, project-structure
- `Guides`: routing, data-loading, mutations, rendering, jsx-runtime, metadata, error-handling, static-export
- `Reference`: cli, api, migration-5

Чтобы добавить страницу, допишите объект в `docs.en.ts` и `docs.ru.ts`. Маршрут,
навигация «назад/вперёд», список в сайдбаре и пререндер подхватят её сами —
`staticPaths()` берёт слаги из того же источника.

## Маршруты и пререндер

Все `[lang]`-маршруты экспортируют `staticPaths()`, поэтому и `karui prerender`,
и `scripts/export-pages.mjs` строят список страниц из одного источника, а не из
хардкода или парсинга HTML.

`scripts/export-pages.mjs` остаётся отдельным скриптом, потому что для GitHub
Pages дополнительно нужны base-path переписывание ссылок и языковой редирект на
`/`. Всё остальное он берёт из фреймворка.

## GitHub Pages

Workflow: `.github/workflows/deploy-pages.yml`.

- На `push` в `main` выполняется статический экспорт в `dist/pages`.
- Домен: `karui.rigby-foundation.org` (файл `CNAME`).
- Base path всегда `/` (режим custom domain only).

При смене домена правьте вместе: `CNAME`, `SITE_ORIGIN` в `src/content/site.ts`
и DNS-запись. Иначе canonical-ссылки будут указывать на несуществующий адрес.
