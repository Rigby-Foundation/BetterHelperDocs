# BetterHelper Docs

Документационный сайт на `better-helperjs` (без React), с Tailwind CSS v4 и визуальным стилем в духе `shadcn/ui` на zinc-палитре.
Структура документации: categories + guides + reference, как в крупных framework docs.

## Stack

- `better-helperjs` SSR + file-based routing
- `vite`
- `tailwindcss@4` + `@tailwindcss/vite`
- Двуязычные страницы: English (`/en`) и Русский (`/ru`)
- Автоопределение языка на `/` через `navigator.languages` / `navigator.language`

## Scripts

```bash
npm install
npm run dev
npm run check
npm run build
npm run start
```

## Structure

- `src/app.tsx` — bootstrap сайта
- `src/layout.tsx` — общий layout
- `src/content/docs.ts` — контент и словари RU/EN
- `src/pages/*` — маршруты
- `src/styles.css` — zinc-тема и UI-слои

## Docs IA

- `Fundamentals`: introduction, installation, project structure
- `Guides`: routing, data loading, JSX runtime, SSR/hydration, error handling
- `Reference`: CLI, API reference
