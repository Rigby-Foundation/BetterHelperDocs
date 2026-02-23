export type Language = 'en' | 'ru';
export type DocCategoryId = 'fundamentals' | 'guides' | 'reference';

export interface UiDictionary {
  siteLabel: string;
  docsLabel: string;
  getStartedLabel: string;
  navOverview: string;
  navAbout: string;
  navDocsHome: string;
  switchTo: string;
  routePath: string;
  language: string;
  docsContent: string;
  docsListTitle: string;
  homeTitle: string;
  homeText: string;
  homeCta: string;
  aboutTitle: string;
  aboutText: string;
  docsHomeTitle: string;
  docsHomeText: string;
  docsCategoryTitle: string;
  docsOnThisPage: string;
  docsPrevious: string;
  docsNext: string;
  docsLastUpdated: string;
  notFound: string;
  notFoundText: string;
  errorTitle: string;
  errorText: string;
}

export interface DocCategory {
  id: DocCategoryId;
  title: string;
  description: string;
}

export interface DocCodeBlock {
  language: string;
  code: string;
  filename?: string;
}

export interface DocSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  code?: DocCodeBlock;
}

export interface DocPage {
  slug: string;
  title: string;
  summary: string;
  category: DocCategoryId;
  order: number;
  sections: DocSection[];
}

const uiByLanguage: Record<Language, UiDictionary> = {
  en: {
    siteLabel: 'BetterHelper Docs',
    docsLabel: 'Docs',
    getStartedLabel: 'Get Started',
    navOverview: 'Overview',
    navAbout: 'About',
    navDocsHome: 'Docs Home',
    switchTo: 'Switch to',
    routePath: 'Route',
    language: 'Language',
    docsContent: 'Documentation',
    docsListTitle: 'Pages',
    homeTitle: 'Documentation',
    homeText: 'Comprehensive reference for BetterHelper Framework: routing, SSR, islands, JSX runtime, and CLI.',
    homeCta: 'Open documentation',
    aboutTitle: 'About',
    aboutText: 'This docs site is built on BetterHelper itself, without React.',
    docsHomeTitle: 'Documentation Overview',
    docsHomeText: 'Pick a section to start. Fundamentals are recommended for first-time users.',
    docsCategoryTitle: 'Categories',
    docsOnThisPage: 'On this page',
    docsPrevious: 'Previous',
    docsNext: 'Next',
    docsLastUpdated: 'Updated',
    notFound: '404',
    notFoundText: 'Page not found.',
    errorTitle: 'Error',
    errorText: 'Unhandled route error.',
  },
  ru: {
    siteLabel: 'Документация BetterHelper',
    docsLabel: 'Документация',
    getStartedLabel: 'Быстрый старт',
    navOverview: 'Обзор',
    navAbout: 'О проекте',
    navDocsHome: 'Главная docs',
    switchTo: 'Переключить на',
    routePath: 'Маршрут',
    language: 'Язык',
    docsContent: 'Справка',
    docsListTitle: 'Страницы',
    homeTitle: 'Документация',
    homeText: 'Полная документация BetterHelper Framework: роутинг, SSR, islands, JSX runtime и CLI.',
    homeCta: 'Открыть документацию',
    aboutTitle: 'О проекте',
    aboutText: 'Этот docs-сайт работает на самом BetterHelper, без React.',
    docsHomeTitle: 'Обзор документации',
    docsHomeText: 'Выберите раздел. Для первого знакомства начните с Fundamentals.',
    docsCategoryTitle: 'Категории',
    docsOnThisPage: 'На этой странице',
    docsPrevious: 'Назад',
    docsNext: 'Далее',
    docsLastUpdated: 'Обновлено',
    notFound: '404',
    notFoundText: 'Страница не найдена.',
    errorTitle: 'Ошибка',
    errorText: 'Необработанная ошибка маршрута.',
  },
};

const categoriesByLanguage: Record<Language, DocCategory[]> = {
  en: [
    {
      id: 'fundamentals',
      title: 'Fundamentals',
      description: 'Core concepts, setup, and project structure.',
    },
    {
      id: 'guides',
      title: 'Guides',
      description: 'Practical tutorials for common tasks.',
    },
    {
      id: 'reference',
      title: 'Reference',
      description: 'API details and command reference.',
    },
  ],
  ru: [
    {
      id: 'fundamentals',
      title: 'Fundamentals',
      description: 'Базовые концепции, установка и структура проекта.',
    },
    {
      id: 'guides',
      title: 'Guides',
      description: 'Практические гайды для типовых задач.',
    },
    {
      id: 'reference',
      title: 'Reference',
      description: 'Справочник API и команд.',
    },
  ],
};

const docsByLanguage: Record<Language, DocPage[]> = {
  en: [
    {
      slug: 'introduction',
      title: 'Introduction',
      summary: 'What BetterHelper is, where it fits, and what problems it solves.',
      category: 'fundamentals',
      order: 10,
      sections: [
        {
          id: 'what-is',
          heading: 'What is BetterHelper',
          paragraphs: [
            'BetterHelper is a full-stack TypeScript framework with its own JSX runtime, file-based router, and SSR primitives.',
            'It is designed to run in Node/Bun/Deno environments and can be integrated with Vite for browser development.',
          ],
        },
        {
          id: 'key-features',
          heading: 'Key capabilities',
          paragraphs: [
            'BetterHelper includes server rendering, client hydration modes, typed route loaders, and an internal state model for page rendering.',
          ],
          bullets: [
            'JSX runtime without React/Preact',
            'File-based routing with nested layouts',
            '404 and error entities as first-class routes',
            'Hydration modes: full, islands, none',
            'Framework CLI for project scaffolding',
          ],
        },
      ],
    },
    {
      slug: 'installation',
      title: 'Installation',
      summary: 'Bootstrap a new project and run it locally.',
      category: 'fundamentals',
      order: 20,
      sections: [
        {
          id: 'create-project',
          heading: 'Create project',
          paragraphs: [
            'The fastest way is to scaffold using the CLI.',
          ],
          code: {
            language: 'bash',
            code: 'npx better-helperjs create my-app\ncd my-app\nnpm install\nnpm run dev',
          },
        },
        {
          id: 'requirements',
          heading: 'Requirements',
          paragraphs: [
            'Use a modern runtime (Node 20+, Bun, or Deno where applicable).',
            'For docs and web projects with Vite, ensure TypeScript is enabled and jsxImportSource is configured to better-helperjs.',
          ],
        },
      ],
    },
    {
      slug: 'project-structure',
      title: 'Project Structure',
      summary: 'Understand where app bootstrap, routes, and layouts live.',
      category: 'fundamentals',
      order: 30,
      sections: [
        {
          id: 'layout',
          heading: 'Typical structure',
          paragraphs: [
            'A BetterHelper SSR app keeps a thin bootstrap file and most application concerns in file-based pages.',
          ],
          code: {
            language: 'text',
            code: 'src/\n  app.tsx\n  layout.tsx\n  pages/\n    404.tsx\n    error.tsx\n    [lang]/index.tsx\n    [lang]/docs/[slug].tsx',
          },
        },
        {
          id: 'responsibilities',
          heading: 'Responsibilities',
          paragraphs: [
            'app.tsx configures the site runtime and routing.',
            'layout.tsx defines global shell and nav.',
            'pages/** define route components, loaders, and entities.',
          ],
        },
      ],
    },
    {
      slug: 'routing',
      title: 'Routing',
      summary: 'Work with static, dynamic, and catch-all routes.',
      category: 'guides',
      order: 110,
      sections: [
        {
          id: 'patterns',
          heading: 'Route patterns',
          paragraphs: [
            'Use static files for static routes and bracket syntax for params.',
          ],
          bullets: [
            'index.tsx -> /',
            '[slug].tsx -> /:slug',
            '[...all].tsx -> /*',
            'layout.tsx -> nested layout boundary',
          ],
        },
        {
          id: 'navigation',
          heading: 'Navigation',
          paragraphs: [
            'Use Link from better-helperjs/router to keep client transitions and preserve app state.',
          ],
          code: {
            language: 'tsx',
            code: "import { Link } from 'better-helperjs/router';\n\n<Link href=\"/en/docs/routing\">Routing docs</Link>",
          },
        },
      ],
    },
    {
      slug: 'data-loading',
      title: 'Data Loading',
      summary: 'Load route data on server and client with typed loaders.',
      category: 'guides',
      order: 120,
      sections: [
        {
          id: 'loader',
          heading: 'Route loader',
          paragraphs: [
            'Export loader(ctx) from a page module. Loader output is available as ctx.data in the page component.',
          ],
          code: {
            language: 'tsx',
            filename: 'src/pages/[lang]/docs/[slug].tsx',
            code: 'export function loader(ctx) {\n  return {\n    slug: ctx.params.slug,\n    tab: ctx.searchParams.get("tab") ?? "overview",\n  };\n}',
          },
        },
        {
          id: 'not-found',
          heading: 'Not found flow',
          paragraphs: [
            'Throw notFound() in loader/component to route execution into your not-found entity.',
          ],
        },
      ],
    },
    {
      slug: 'jsx-runtime',
      title: 'JSX Runtime',
      summary: 'Use framework-native JSX and hooks without React dependency.',
      category: 'guides',
      order: 130,
      sections: [
        {
          id: 'config',
          heading: 'Configuration',
          paragraphs: [
            'Set jsxImportSource to better-helperjs in tsconfig and Vite esbuild config.',
          ],
          code: {
            language: 'json',
            filename: 'tsconfig.json',
            code: '{\n  "compilerOptions": {\n    "jsx": "react-jsx",\n    "jsxImportSource": "better-helperjs"\n  }\n}',
          },
        },
        {
          id: 'hooks',
          heading: 'Supported hooks',
          paragraphs: [
            'The runtime provides useState, useEffect, useMemo, useReducer, useCallback, useRef, createContext, and useContext.',
          ],
        },
      ],
    },
    {
      slug: 'ssr-hydration',
      title: 'SSR and Hydration',
      summary: 'Choose rendering mode based on your UX and performance goals.',
      category: 'guides',
      order: 140,
      sections: [
        {
          id: 'modes',
          heading: 'Hydration modes',
          paragraphs: [
            'Use full for interactive apps, islands for partial hydration, none for content-first static-like pages.',
          ],
          code: {
            language: 'tsx',
            filename: 'src/app.tsx',
            code: "defineCounterSite({\n  pages,\n  layout,\n  hydrateMode: 'islands',\n});",
          },
        },
        {
          id: 'streaming',
          heading: 'Streaming',
          paragraphs: [
            'Server helpers can stream HTML chunks to improve time-to-first-byte and progressively flush response.',
          ],
        },
      ],
    },
    {
      slug: 'error-handling',
      title: 'Error Handling',
      summary: 'Handle route errors with dedicated entities and boundaries.',
      category: 'guides',
      order: 150,
      sections: [
        {
          id: 'entities',
          heading: 'Error entities',
          paragraphs: [
            'Create pages/error.tsx for global route errors and pages/404.tsx for not-found.',
            'You can also define route-level errorBoundary in page modules.',
          ],
        },
      ],
    },
    {
      slug: 'cli',
      title: 'CLI Reference',
      summary: 'Scaffold and maintain BetterHelper projects from terminal.',
      category: 'reference',
      order: 210,
      sections: [
        {
          id: 'commands',
          heading: 'Commands',
          paragraphs: [],
          code: {
            language: 'bash',
            code: 'better-helperjs create <project-name> [--pm npm|pnpm|yarn|bun] [--no-install] [--force]',
          },
        },
      ],
    },
    {
      slug: 'api',
      title: 'API Reference',
      summary: 'High-level map of important framework modules.',
      category: 'reference',
      order: 220,
      sections: [
        {
          id: 'modules',
          heading: 'Core modules',
          paragraphs: [],
          bullets: [
            'better-helperjs/router',
            'better-helperjs/router/file-based',
            'better-helperjs/jsx',
            'better-helperjs/ssr',
            'better-helperjs/ssr/site-server',
            'better-helperjs/core',
          ],
        },
      ],
    },
  ],
  ru: [
    {
      slug: 'introduction',
      title: 'Введение',
      summary: 'Что такое BetterHelper, где он применяется и какие задачи решает.',
      category: 'fundamentals',
      order: 10,
      sections: [
        {
          id: 'what-is',
          heading: 'Что такое BetterHelper',
          paragraphs: [
            'BetterHelper — full-stack TypeScript фреймворк со своим JSX runtime, file-based router и SSR-примитивами.',
            'Он рассчитан на Node/Bun/Deno и интеграцию с Vite для браузерной разработки.',
          ],
        },
        {
          id: 'key-features',
          heading: 'Ключевые возможности',
          paragraphs: [
            'В составе фреймворка есть серверный рендер, режимы гидрации, typed loaders и внутренняя state-модель для рендера страниц.',
          ],
          bullets: [
            'JSX runtime без React/Preact',
            'File-based роутинг с nested layouts',
            'Сущности 404 и error как first-class routes',
            'Режимы гидрации: full, islands, none',
            'CLI для быстрого старта проектов',
          ],
        },
      ],
    },
    {
      slug: 'installation',
      title: 'Установка',
      summary: 'Создание нового проекта и запуск локально.',
      category: 'fundamentals',
      order: 20,
      sections: [
        {
          id: 'create-project',
          heading: 'Создание проекта',
          paragraphs: [
            'Быстрее всего стартовать через CLI.',
          ],
          code: {
            language: 'bash',
            code: 'npx better-helperjs create my-app\ncd my-app\nnpm install\nnpm run dev',
          },
        },
        {
          id: 'requirements',
          heading: 'Требования',
          paragraphs: [
            'Используйте современный runtime (Node 20+, Bun или Deno в зависимости от окружения).',
            'Для docs/web-проектов на Vite задайте jsxImportSource = better-helperjs.',
          ],
        },
      ],
    },
    {
      slug: 'project-structure',
      title: 'Структура проекта',
      summary: 'Где хранятся bootstrap, роуты и layout.',
      category: 'fundamentals',
      order: 30,
      sections: [
        {
          id: 'layout',
          heading: 'Типовая структура',
          paragraphs: [
            'SSR-приложение BetterHelper обычно имеет тонкий bootstrap и основной код в file-based pages.',
          ],
          code: {
            language: 'text',
            code: 'src/\n  app.tsx\n  layout.tsx\n  pages/\n    404.tsx\n    error.tsx\n    [lang]/index.tsx\n    [lang]/docs/[slug].tsx',
          },
        },
        {
          id: 'responsibilities',
          heading: 'Ответственность файлов',
          paragraphs: [
            'app.tsx настраивает runtime и роутинг.',
            'layout.tsx задает общий shell и навигацию.',
            'pages/** содержит страницы, loader и route-сущности.',
          ],
        },
      ],
    },
    {
      slug: 'routing',
      title: 'Роутинг',
      summary: 'Статические, динамические и catch-all маршруты.',
      category: 'guides',
      order: 110,
      sections: [
        {
          id: 'patterns',
          heading: 'Паттерны маршрутов',
          paragraphs: [
            'Статический файл задает статический путь, синтаксис в скобках добавляет параметры.',
          ],
          bullets: [
            'index.tsx -> /',
            '[slug].tsx -> /:slug',
            '[...all].tsx -> /*',
            'layout.tsx -> nested layout boundary',
          ],
        },
        {
          id: 'navigation',
          heading: 'Навигация',
          paragraphs: [
            'Используйте Link из better-helperjs/router для клиентских переходов и сохранения state.',
          ],
          code: {
            language: 'tsx',
            code: "import { Link } from 'better-helperjs/router';\n\n<Link href=\"/ru/docs/routing\">Роутинг</Link>",
          },
        },
      ],
    },
    {
      slug: 'data-loading',
      title: 'Загрузка данных',
      summary: 'Server/client data loading через typed loader.',
      category: 'guides',
      order: 120,
      sections: [
        {
          id: 'loader',
          heading: 'Route loader',
          paragraphs: [
            'Экспортируйте loader(ctx) в модуле страницы. Его результат приходит в компонент как ctx.data.',
          ],
          code: {
            language: 'tsx',
            filename: 'src/pages/[lang]/docs/[slug].tsx',
            code: 'export function loader(ctx) {\n  return {\n    slug: ctx.params.slug,\n    tab: ctx.searchParams.get("tab") ?? "overview",\n  };\n}',
          },
        },
        {
          id: 'not-found',
          heading: 'Поток not found',
          paragraphs: [
            'Бросайте notFound() в loader/component, чтобы перейти в not-found сущность.',
          ],
        },
      ],
    },
    {
      slug: 'jsx-runtime',
      title: 'JSX Runtime',
      summary: 'Нативный JSX и хуки фреймворка без зависимости на React.',
      category: 'guides',
      order: 130,
      sections: [
        {
          id: 'config',
          heading: 'Конфиг',
          paragraphs: [
            'В tsconfig и Vite задайте jsxImportSource = better-helperjs.',
          ],
          code: {
            language: 'json',
            filename: 'tsconfig.json',
            code: '{\n  "compilerOptions": {\n    "jsx": "react-jsx",\n    "jsxImportSource": "better-helperjs"\n  }\n}',
          },
        },
        {
          id: 'hooks',
          heading: 'Поддерживаемые хуки',
          paragraphs: [
            'Доступны useState, useEffect, useMemo, useReducer, useCallback, useRef, createContext и useContext.',
          ],
        },
      ],
    },
    {
      slug: 'ssr-hydration',
      title: 'SSR и гидрация',
      summary: 'Выбор режима рендера под UX и производительность.',
      category: 'guides',
      order: 140,
      sections: [
        {
          id: 'modes',
          heading: 'Режимы гидрации',
          paragraphs: [
            'full — для интерактивных приложений, islands — для частичной гидрации, none — для контентных страниц без клиентской гидрации.',
          ],
          code: {
            language: 'tsx',
            filename: 'src/app.tsx',
            code: "defineCounterSite({\n  pages,\n  layout,\n  hydrateMode: 'islands',\n});",
          },
        },
        {
          id: 'streaming',
          heading: 'Стриминг',
          paragraphs: [
            'SSR stream helpers позволяют отправлять HTML по частям и ускорять TTFB.',
          ],
        },
      ],
    },
    {
      slug: 'error-handling',
      title: 'Обработка ошибок',
      summary: 'Route-ошибки через сущности и boundary.',
      category: 'guides',
      order: 150,
      sections: [
        {
          id: 'entities',
          heading: 'Error-сущности',
          paragraphs: [
            'Создайте pages/error.tsx для глобальных route-ошибок и pages/404.tsx для not-found.',
            'Также можно задавать route-level errorBoundary в модуле страницы.',
          ],
        },
      ],
    },
    {
      slug: 'cli',
      title: 'CLI Reference',
      summary: 'Справка по CLI для старта и поддержки проектов.',
      category: 'reference',
      order: 210,
      sections: [
        {
          id: 'commands',
          heading: 'Команды',
          paragraphs: [],
          code: {
            language: 'bash',
            code: 'better-helperjs create <project-name> [--pm npm|pnpm|yarn|bun] [--no-install] [--force]',
          },
        },
      ],
    },
    {
      slug: 'api',
      title: 'API Reference',
      summary: 'Карта ключевых модулей фреймворка.',
      category: 'reference',
      order: 220,
      sections: [
        {
          id: 'modules',
          heading: 'Основные модули',
          paragraphs: [],
          bullets: [
            'better-helperjs/router',
            'better-helperjs/router/file-based',
            'better-helperjs/jsx',
            'better-helperjs/ssr',
            'better-helperjs/ssr/site-server',
            'better-helperjs/core',
          ],
        },
      ],
    },
  ],
};

export function resolveLanguage(value: string | undefined): Language | null {
  if (value === 'en' || value === 'ru') return value;
  return null;
}

export function detectSystemLanguage(value: string | undefined): Language {
  const normalized = (value ?? '').toLowerCase();
  if (normalized.startsWith('ru')) return 'ru';
  return 'en';
}

export function getUiDictionary(language: Language): UiDictionary {
  return uiByLanguage[language];
}

export function getDocCategories(language: Language): DocCategory[] {
  return categoriesByLanguage[language];
}

export function getDocsCatalog(language: Language): DocPage[] {
  return docsByLanguage[language]
    .slice()
    .sort((a, b) => a.order - b.order);
}

export function getDocsByCategory(language: Language): Array<{ category: DocCategory; pages: DocPage[] }> {
  const categories = getDocCategories(language);
  const pages = getDocsCatalog(language);

  return categories.map((category) => ({
    category,
    pages: pages.filter((page) => page.category === category.id),
  }));
}

export function getDocPage(language: Language, slug: string): DocPage | null {
  return getDocsCatalog(language).find((page) => page.slug === slug) ?? null;
}

export function getDefaultDocSlug(language: Language): string {
  return getDocsCatalog(language)[0]?.slug ?? 'introduction';
}

export function getAdjacentDocs(
  language: Language,
  slug: string
): { previous: DocPage | null; next: DocPage | null } {
  const pages = getDocsCatalog(language);
  const index = pages.findIndex((page) => page.slug === slug);
  if (index < 0) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: pages[index - 1] ?? null,
    next: pages[index + 1] ?? null,
  };
}

