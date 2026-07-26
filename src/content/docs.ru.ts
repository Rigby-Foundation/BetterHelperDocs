import type { DocPage } from './docs-types.js';

export const ruDocs: DocPage[] = [
  {
    slug: 'introduction',
    title: 'Введение',
    summary: 'Что такое Karui, где он применяется и какие задачи решает.',
    category: 'fundamentals',
    order: 10,
    sections: [
      {
        id: 'what-is',
        heading: 'Что такое Karui',
        paragraphs: [
          'Karui — full-stack TypeScript-фреймворк со своим JSX runtime, файловым роутером и SSR-примитивами. Рантайм-зависимостей у него нет.',
          'Он работает на Node, Bun и Deno, а для браузерной разработки интегрируется с Vite.',
        ],
      },
      {
        id: 'key-features',
        heading: 'Ключевые возможности',
        paragraphs: [
          'Karui закрывает серверный рендер, гидрацию, типизированные loader и action, метаданные страниц и статический экспорт — без сборки стека из отдельных пакетов.',
        ],
        bullets: [
          'JSX runtime с хуками в стиле React, без React и Preact',
          'Keyed-реконсилятор: обновления диффятся по живому DOM',
          'Гидрация переиспользует серверную разметку, а не строит её заново',
          'Файловый роутинг с вложенными layout',
          'loader для чтения, action для записи',
          'Режимы гидрации: full, islands, none',
          'Статический экспорт в обычный HTML',
          'CLI для создания проектов и пререндера',
        ],
      },
      {
        id: 'cost',
        heading: 'Сколько это весит',
        paragraphs: [
          'Типичное клиентское приложение тянет JSX runtime и роутер. Цифры ниже измеряются на каждой сборке, а бюджеты проверяются в CI.',
        ],
        bullets: [
          '@rigbyhost/karui/jsx — 16.8 kB minified, 5.1 kB gzip',
          '@rigbyhost/karui/router — 7.9 kB minified, 2.9 kB gzip',
          'jsx + router вместе — 24.8 kB minified, 7.6 kB gzip',
          '@rigbyhost/karui (jsx + router + ssr) — 42.5 kB minified, 12.6 kB gzip',
        ],
      },
    ],
  },
  {
    slug: 'installation',
    title: 'Установка',
    summary: 'Создание нового проекта и локальный запуск.',
    category: 'fundamentals',
    order: 20,
    sections: [
      {
        id: 'create-project',
        heading: 'Создание проекта',
        paragraphs: [
          'Быстрее всего стартовать через CLI. Он создаёт рабочее SSR-приложение, где уже подключены роутинг, layout, loader и action.',
        ],
        code: {
          language: 'bash',
          code: 'npx @rigbyhost/karui create my-app\ncd my-app\nnpm run dev',
        },
      },
      {
        id: 'add-to-existing',
        heading: 'Добавление в существующий проект',
        paragraphs: [
          'Karui — один пакет без рантайм-зависимостей. Vite указан как optional peer и нужен только для dev-сервера и сборки.',
        ],
        code: {
          language: 'bash',
          code: 'npm install @rigbyhost/karui\nnpm install -D vite',
        },
      },
      {
        id: 'requirements',
        heading: 'Требования',
        paragraphs: [
          'Node 20 или новее, Bun или Deno. В TypeScript-проектах задайте jsxImportSource = @rigbyhost/karui и в tsconfig, и в esbuild-конфиге Vite.',
        ],
      },
    ],
  },
  {
    slug: 'project-structure',
    title: 'Структура проекта',
    summary: 'Где живут bootstrap, роуты и layout.',
    category: 'fundamentals',
    order: 30,
    sections: [
      {
        id: 'layout',
        heading: 'Типовая структура',
        paragraphs: [
          'Приложение на Karui держит тонкий bootstrap, а всё остальное размещает в файловых страницах.',
        ],
        code: {
          language: 'text',
          code: 'src/\n  app.tsx          bootstrap сайта\n  layout.tsx       общий shell\n  pages/\n    index.tsx      -> /\n    about.tsx      -> /about\n    404.tsx        сущность not-found\n    error.tsx      сущность error\n    docs/\n      layout.tsx   вложенный layout для /docs/*\n      [slug].tsx   -> /docs/:slug\nserver.ts          точка входа для node\nindex.html         шаблон со слотами <!--app-*-->',
        },
      },
      {
        id: 'bootstrap',
        heading: 'Файл bootstrap',
        paragraphs: [
          'defineSite собирает страницы, подключает layout как shell и сам гидрирует приложение в браузере. Это единственная клиентская точка входа, которая нужна приложению.',
        ],
        code: {
          language: 'tsx',
          filename: 'src/app.tsx',
          code: "import { defineSite, type FileSystemModule, type RenderState } from '@rigbyhost/karui/ssr';\nimport Layout from './layout.js';\n\nconst pages = import.meta.glob('./pages/**/*.tsx', { eager: true }) as Record<string, FileSystemModule<RenderState>>;\n\nexport const site = defineSite({\n  pages,\n  layout: Layout,\n  titlePrefix: 'My App',\n  pagesRoot: './pages',\n  hydrateMode: 'full',\n});",
        },
      },
      {
        id: 'state',
        heading: 'Состояние сайта',
        paragraphs: [
          'Каждый рендер стартует с RenderState: url, runtime и generatedAt. Передайте createState, чтобы носить рядом свои данные — например, сессию.',
        ],
        code: {
          language: 'tsx',
          code: "import { createRenderState, type RenderState } from '@rigbyhost/karui';\n\ninterface AppState extends RenderState {\n  user: string | null;\n}\n\ndefineSite<AppState>({\n  pages,\n  layout: Layout,\n  createState: (url, runtime) => ({\n    ...createRenderState(url, runtime),\n    user: null,\n  }),\n});",
        },
      },
    ],
  },
  {
    slug: 'routing',
    title: 'Роутинг',
    summary: 'Статические, динамические и catch-all маршруты, вложенные layout.',
    category: 'guides',
    order: 110,
    sections: [
      {
        id: 'patterns',
        heading: 'Паттерны маршрутов',
        paragraphs: [
          'Файл в pages/ становится маршрутом. Синтаксис в скобках добавляет параметры. Более специфичные маршруты выигрывают у менее специфичных независимо от порядка файлов.',
        ],
        bullets: [
          'index.tsx -> /',
          'about.tsx -> /about',
          '[slug].tsx -> /:slug',
          '[...all].tsx -> /* (catch-all, params.wild)',
          'layout.tsx -> граница вложенного layout для директории',
          '404.tsx -> сущность not-found',
          'error.tsx -> сущность error',
        ],
      },
      {
        id: 'params',
        heading: 'Параметры маршрута',
        paragraphs: [
          'Параметры приходят в ctx.params уже декодированными. Query-строка доступна как обычный URLSearchParams в ctx.searchParams.',
        ],
        code: {
          language: 'tsx',
          filename: 'src/pages/docs/[slug].tsx',
          code: "import type { SiteRouteContext } from '@rigbyhost/karui/ssr';\n\nexport default function Doc(ctx: SiteRouteContext) {\n  const tab = ctx.searchParams.get('tab') ?? 'overview';\n  return <h1>{ctx.params.slug} — {tab}</h1>;\n}",
        },
      },
      {
        id: 'navigation',
        heading: 'Навигация',
        paragraphs: [
          'Link рендерит обычный якорь, клики по которому перехватывает роутер, поэтому переход происходит без перезагрузки страницы. Клики с модификаторами, внешние origin, download-ссылки и target отдаются браузеру.',
        ],
        code: {
          language: 'tsx',
          code: "import { Link } from '@rigbyhost/karui/router';\n\n<Link href=\"/docs/routing\">Документация по роутингу</Link>\n<Link href=\"/login\" replace>Войти</Link>",
        },
      },
      {
        id: 'redirects',
        heading: 'Редиректы',
        paragraphs: [
          'Вызовите redirect() из loader или action. На сервере это превращается в заголовок Location, на клиенте — в навигацию.',
        ],
        code: {
          language: 'tsx',
          code: "import { redirect } from '@rigbyhost/karui/router';\n\nexport function loader(ctx) {\n  if (!ctx.state.user) redirect('/login');\n  return getDashboard();\n}",
        },
      },
    ],
  },
  {
    slug: 'data-loading',
    title: 'Загрузка данных',
    summary: 'Серверная загрузка данных маршрута через типизированные loader.',
    category: 'guides',
    order: 120,
    sections: [
      {
        id: 'loader',
        heading: 'Route loader',
        paragraphs: [
          'Экспортируйте loader(ctx) из модуля страницы. Он выполняется до рендера компонента: на сервере при первом запросе и на клиенте при навигации. Результат приходит в ctx.data.',
        ],
        code: {
          language: 'tsx',
          filename: 'src/pages/docs/[slug].tsx',
          code: "import type { SiteRouteContext } from '@rigbyhost/karui/ssr';\n\nexport async function loader(ctx: SiteRouteContext) {\n  const post = await db.posts.find(ctx.params.slug);\n  return { post };\n}\n\nexport default function Page(ctx: SiteRouteContext) {\n  const { post } = ctx.data as Awaited<ReturnType<typeof loader>>;\n  return <article>{post.title}</article>;\n}",
        },
      },
      {
        id: 'not-found',
        heading: 'Not found',
        paragraphs: [
          'Вызовите notFound() из loader или компонента, чтобы передать рендер сущности 404 со статусом 404.',
        ],
        code: {
          language: 'tsx',
          code: "import { notFound } from '@rigbyhost/karui/router';\n\nexport async function loader(ctx) {\n  const post = await getPost(ctx.params.slug);\n  if (!post) notFound();\n  return post;\n}",
        },
      },
      {
        id: 'hydration-handoff',
        heading: 'Передача данных на клиент',
        paragraphs: [
          'Сервер сериализует результат loader в страницу, поэтому первый клиентский рендер переиспользует эти данные, а не запрашивает их заново. Без этого гидрируемое дерево могло бы разойтись с разметкой, которую оно подхватывает.',
          'Ключ payload по умолчанию — __KARUI_DATA__, его можно поменять опцией dataKey.',
        ],
      },
    ],
  },
  {
    slug: 'mutations',
    title: 'Мутации',
    summary: 'Обработка форм и записи данных через route action.',
    category: 'guides',
    order: 130,
    sections: [
      {
        id: 'action',
        heading: 'Route action',
        paragraphs: [
          'Экспортируйте action(ctx) рядом с loader. Он выполняется на POST, PUT, PATCH и DELETE до повторного рендера страницы. Затем снова отрабатывают loader, поэтому страница показывает свежие данные.',
          'Весь поток серверный, поэтому обычная HTML-форма работает вообще без клиентского JavaScript.',
        ],
        code: {
          language: 'tsx',
          filename: 'src/pages/contact.tsx',
          code: "import { redirect } from '@rigbyhost/karui/router';\nimport type { SiteActionContext, SiteRouteContext } from '@rigbyhost/karui/ssr';\n\nexport async function action(ctx: SiteActionContext) {\n  const message = String(ctx.request.formData.message ?? '').trim();\n  if (!message) return { error: 'Сообщение не может быть пустым' };\n\n  await saveMessage(message);\n  redirect('/contact?sent=1', 303);\n}\n\nexport default function Contact(ctx: SiteRouteContext) {\n  const result = ctx.actionData as { error?: string } | undefined;\n\n  return (\n    <form method=\"post\">\n      {result?.error ? <p>{result.error}</p> : null}\n      <input name=\"message\" />\n      <button type=\"submit\">Отправить</button>\n    </form>\n  );\n}",
        },
      },
      {
        id: 'request',
        heading: 'Чтение запроса',
        paragraphs: [
          'ctx.request содержит ровно то, что нужно action, и ничего лишнего. Он не привязан к транспорту, поэтому такой объект может собрать и обработчик на Bun, Deno или в воркере.',
        ],
        bullets: [
          'method — HTTP-метод в верхнем регистре',
          'headers — объект с ключами в нижнем регистре',
          'body — сырое тело запроса',
          'formData — разобранные поля; повторяющееся поле становится массивом',
          'json — разобранное тело, когда Content-Type это JSON',
        ],
      },
      {
        id: 'post-redirect-get',
        heading: 'POST, redirect, GET',
        paragraphs: [
          'После успешной мутации делайте redirect со статусом 303. Тогда перезагрузка страницы в браузере запросит адрес назначения, а не отправит форму повторно.',
          'Если валидация не прошла, верните значение вместо редиректа: оно придёт в ctx.actionData, и страница отрендерится с ошибкой прямо в форме.',
        ],
      },
      {
        id: 'limits',
        heading: 'Ограничения',
        paragraphs: [
          'POST на маршрут без action отвечает 405. Тело больше 1 МБ отклоняется с кодом 413. multipart/form-data не разбирается — для загрузки файлов читайте ctx.request.body самостоятельно.',
        ],
      },
    ],
  },
  {
    slug: 'rendering',
    title: 'Рендер и гидрация',
    summary: 'Как обновления доходят до DOM и как подхватывается серверная разметка.',
    category: 'guides',
    order: 140,
    sections: [
      {
        id: 'reconciler',
        heading: 'Реконсилятор',
        paragraphs: [
          'Обновления диффятся по DOM, который уже есть на странице, а не заменяют его. Идентичность элементов сохраняется, а вместе с ней фокус, выделение текста, позиция скролла во вложенных контейнерах, CSS-переходы и значение неуправляемого поля ввода.',
          'Обработчики событий вешаются один раз на элемент и тип события, а текущий обработчик хранится в отдельной таблице, поэтому inline-стрелка не вызывает перевешивание слушателей.',
        ],
      },
      {
        id: 'keys',
        heading: 'Ключи',
        paragraphs: [
          'key управляет и реконсиляцией детей, и идентичностью хуков. При перестановке элемент списка переносит свой DOM-узел вместо пересоздания и сохраняет собственный useState. Без key дети сопоставляются по позиции.',
        ],
        code: {
          language: 'tsx',
          code: '{items.map((item) => (\n  <Row key={item.id} item={item} />\n))}',
        },
      },
      {
        id: 'modes',
        heading: 'Режимы гидрации',
        paragraphs: [
          'full гидрирует страницу целиком и подходит интерактивным приложениям. islands гидрирует только помеченные компоненты, оставляя остальное статическим HTML. none не отправляет клиентский JavaScript вообще.',
        ],
        code: {
          language: 'tsx',
          filename: 'src/app.tsx',
          code: "defineSite({\n  pages,\n  layout: Layout,\n  hydrateMode: 'islands',\n});",
        },
      },
      {
        id: 'islands',
        heading: 'Islands',
        paragraphs: [
          'Пометьте компонент через defineIsland — и он вместе со своими props будет собран во время серверного рендера. На клиенте гидрируются только такие компоненты, подхватывая свою серверную разметку; всё вокруг остаётся нетронутым.',
        ],
        code: {
          language: 'tsx',
          code: "import { defineIsland } from '@rigbyhost/karui/ssr';\nimport { useState } from '@rigbyhost/karui/jsx';\n\nexport const Counter = defineIsland(() => {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n});",
        },
      },
      {
        id: 'manual',
        heading: 'Ручной рендер',
        paragraphs: [
          'Если вы не используете соглашения сайта, примитивы доступны напрямую из пакета jsx.',
        ],
        bullets: [
          'mount(root, node) — отрендерить в root; последующие вызовы диффятся',
          'hydrate(root, node) — подхватить серверную разметку, дальше как mount',
          'unmount(root) — выполнить cleanup эффектов, отпустить ref, очистить root',
          'renderToString(node) — HTML для SSR',
          'renderToDom(node, doc) — отдельные DOM-узлы',
        ],
      },
      {
        id: 'chunked',
        heading: 'Ответ по частям',
        paragraphs: [
          'streamToNodeResponse отдаёт ответ чанками. Учтите: страница рендерится целиком до отправки первого чанка, поэтому это не прогрессивный стриминг и TTFB он не улучшает. Настоящий прогрессивный flush пока не реализован.',
        ],
      },
    ],
  },
  {
    slug: 'jsx-runtime',
    title: 'JSX Runtime',
    summary: 'Нативные JSX и хуки фреймворка, без зависимости от React.',
    category: 'guides',
    order: 150,
    sections: [
      {
        id: 'config',
        heading: 'Конфигурация',
        paragraphs: [
          'Укажите jsxImportSource = @rigbyhost/karui в tsconfig и в esbuild-конфиге Vite для сборщика.',
        ],
        code: {
          language: 'json',
          filename: 'tsconfig.json',
          code: '{\n  "compilerOptions": {\n    "jsx": "react-jsx",\n    "jsxImportSource": "@rigbyhost/karui"\n  }\n}',
        },
      },
      {
        id: 'hooks',
        heading: 'Хуки',
        paragraphs: [
          'Runtime предоставляет useState, useEffect, useMemo, useCallback, useReducer, useRef, createContext и useContext с семантикой React.',
        ],
        code: {
          language: 'tsx',
          code: "import { useState } from '@rigbyhost/karui/jsx';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;\n}",
        },
      },
      {
        id: 'refs',
        heading: 'Ref',
        paragraphs: [
          'Передайте useRef в проп ref host-элемента. Он выставляется при монтировании и сбрасывается в null, когда элемент уходит из дерева. Callback-ref тоже поддерживается.',
        ],
        code: {
          language: 'tsx',
          code: "import { useEffect, useRef } from '@rigbyhost/karui/jsx';\n\nexport function SearchBox() {\n  const input = useRef<HTMLInputElement | null>(null);\n  useEffect(() => input.current?.focus(), []);\n  return <input ref={input} />;\n}",
        },
      },
      {
        id: 'attributes',
        heading: 'Атрибуты',
        paragraphs: [
          'className и htmlFor превращаются в class и for. style принимает строку или объект, причём объект диффится по отдельным свойствам. Дети svg автоматически рендерятся в SVG-неймспейсе, а camelCase презентационные атрибуты переводятся в kebab-case.',
          'У элементов формы value, checked и selected пишутся как DOM-свойства и пересинхронизируются на каждом рендере, поэтому управляемое поле остаётся согласованным с пропом даже после ввода пользователя.',
        ],
      },
    ],
  },
  {
    slug: 'metadata',
    title: 'Метаданные страницы',
    summary: 'Управление head из модулей страниц.',
    category: 'guides',
    order: 160,
    sections: [
      {
        id: 'meta-export',
        heading: 'Экспорт meta',
        paragraphs: [
          'Экспортируйте meta из страницы, и Karui отрендерит его в head. Все поля необязательны; если не задать title, он будет выведен из пути маршрута.',
        ],
        code: {
          language: 'tsx',
          filename: 'src/pages/docs/[slug].tsx',
          code: "export const meta = {\n  title: 'Docs',\n  description: 'Как устроен роутинг в Karui',\n  canonical: 'https://example.com/docs',\n  robots: 'index,follow',\n  lang: 'ru',\n  og: { type: 'article', image: 'https://example.com/card.png' },\n  twitter: { card: 'summary_large_image' },\n  meta: [{ name: 'author', content: 'Rigby Foundation' }],\n  link: [{ rel: 'alternate', hreflang: 'en', href: '/en/docs' }],\n};",
        },
      },
      {
        id: 'defaults',
        heading: 'Значения Open Graph по умолчанию',
        paragraphs: [
          'og:title, og:description и og:url по умолчанию берутся из title, description и canonical, поэтому большинство страниц задаёт только три поля, которые им важны. Всё, что вы положите в og, переопределяет выведенное значение.',
        ],
      },
      {
        id: 'dynamic',
        heading: 'Метаданные из loader',
        paragraphs: [
          'Экспортируйте функцию вместо объекта, чтобы собрать метаданные из контекста маршрута. loader отрабатывает раньше, поэтому ctx.data уже доступен.',
        ],
        code: {
          language: 'tsx',
          code: "export const meta = (ctx) => ({\n  title: `Пост: ${ctx.data.title}`,\n  description: ctx.data.excerpt,\n  og: { image: ctx.data.coverUrl },\n});",
        },
      },
      {
        id: 'lang',
        heading: 'Язык документа',
        paragraphs: [
          'meta.lang переписывает атрибут lang у тега html в вашем шаблоне. Это важно для мультиязычных сайтов, где язык является частью маршрута.',
        ],
      },
    ],
  },
  {
    slug: 'error-handling',
    title: 'Обработка ошибок',
    summary: 'Ошибки маршрутов, boundary и коды статусов.',
    category: 'guides',
    order: 170,
    sections: [
      {
        id: 'entities',
        heading: 'Error-сущности',
        paragraphs: [
          'pages/error.tsx обрабатывает ошибки маршрутов глобально и рендерится со статусом 500. pages/404.tsx отвечает за not-found и рендерится с 404. Обе автоматически помечаются noindex.',
          'Модуль страницы может также экспортировать errorBoundary — boundary уровня маршрута, который имеет приоритет над глобальным.',
        ],
        code: {
          language: 'tsx',
          filename: 'src/pages/error.tsx',
          code: "import type { SiteErrorContext } from '@rigbyhost/karui/ssr';\n\nexport default function ErrorPage(ctx: SiteErrorContext) {\n  const message = ctx.error instanceof Error ? ctx.error.message : String(ctx.error);\n  return <pre>{message}</pre>;\n}",
        },
      },
      {
        id: 'control-flow',
        heading: 'Ошибки и управление потоком',
        paragraphs: [
          'notFound() и redirect() бросают исключение, но это управление потоком, а не сбой. Error boundary их никогда не ловит: notFound() уводит в сущность 404, а redirect() доходит до транспорта заголовком Location.',
        ],
      },
    ],
  },
  {
    slug: 'static-export',
    title: 'Статический экспорт',
    summary: 'Рендер сайта в обычные HTML-файлы.',
    category: 'guides',
    order: 180,
    sections: [
      {
        id: 'prerender',
        heading: 'Пререндер',
        paragraphs: [
          'karui prerender рендерит собранный сайт в .html-файлы, которые отдаст любой статический хостинг без Node-процесса. Хорошо сочетается с hydrateMode none для страниц, которые не отправляют ни байта JavaScript.',
        ],
        code: {
          language: 'bash',
          code: 'npm run build          # клиентская и серверная сборки\nkarui prerender        # -> dist/static/',
        },
      },
      {
        id: 'static-paths',
        heading: 'Динамические маршруты',
        paragraphs: [
          'Статические маршруты находятся автоматически. Динамический маршрут пререндерится, только если его страница экспортирует staticPaths — отсутствие экспорта означает «рендерить по запросу», а не молча пропущенную страницу.',
        ],
        code: {
          language: 'tsx',
          filename: 'src/pages/docs/[slug].tsx',
          code: "export function staticPaths() {\n  return [{ slug: 'introduction' }, { slug: 'routing' }];\n}",
        },
      },
      {
        id: 'cli-options',
        heading: 'Опции',
        paragraphs: [
          'Можно поменять каталог вывода, добавить пути, о которых роутер не знает, или отрендерить страницу not-found в 404.html для обработки на уровне хостинга.',
        ],
        code: {
          language: 'bash',
          code: 'karui prerender --out public --not-found /404 --path /extra-page',
        },
      },
      {
        id: 'programmatic',
        heading: 'Из скрипта',
        paragraphs: [
          'Та же процедура доступна как функция. Она импортирует встроенные модули Node, поэтому живёт на отдельном subpath и никогда не попадает в клиентский бандл.',
        ],
        code: {
          language: 'ts',
          code: "import { prerenderSite } from '@rigbyhost/karui/ssr/prerender';\n\nconst pages = await prerenderSite({\n  outDir: 'dist/static',\n  notFoundPath: '/404',\n});\n\nconsole.log(`Записано страниц: ${pages.length}`);",
        },
      },
    ],
  },
  {
    slug: 'cli',
    title: 'Справочник CLI',
    summary: 'Создание проектов и статический экспорт из терминала.',
    category: 'reference',
    order: 210,
    sections: [
      {
        id: 'create',
        heading: 'karui create',
        paragraphs: [
          'Создаёт новый проект. Пакет устанавливает бинарник karui, поэтому внутри проекта доступна команда npx karui, а откуда угодно — npx @rigbyhost/karui.',
        ],
        code: {
          language: 'bash',
          code: 'karui create <project-name> [options]\n\n  --pm <npm|pnpm|yarn|bun>   пакетный менеджер для установки\n  --no-install               пропустить установку зависимостей\n  --force                    разрешить непустой каталог',
        },
      },
      {
        id: 'prerender-cmd',
        heading: 'karui prerender',
        paragraphs: [
          'Рендерит собранный сайт в статический HTML. Запускайте после npm run build.',
        ],
        code: {
          language: 'bash',
          code: 'karui prerender [options]\n\n  --out <dir>          каталог вывода (по умолчанию dist/static)\n  --root <dir>         корень проекта (по умолчанию cwd)\n  --path <url>         дополнительный путь (можно повторять)\n  --not-found <url>    отрендерить этот путь в 404.html\n  --only-paths         рендерить только пути из --path\n  --template <file>    html-шаблон (по умолчанию index.html)\n  --app <module>       точка входа (по умолчанию /src/app.tsx)\n  --client-dist <dir>  каталог клиентской сборки (dist/client)\n  --server-dist <dir>  каталог серверной сборки (dist/server)',
        },
      },
    ],
  },
  {
    slug: 'api',
    title: 'Справочник API',
    summary: 'Точки входа и что экспортирует каждая из них.',
    category: 'reference',
    order: 220,
    sections: [
      {
        id: 'entries',
        heading: 'Точки входа',
        paragraphs: [
          'У главной точки входа нет побочных эффектов, поэтому сборщик оставит только то, что вы импортируете.',
        ],
        bullets: [
          '@rigbyhost/karui — jsx, router и ssr вместе',
          '@rigbyhost/karui/jsx — runtime, хуки, mount, hydrate, unmount',
          '@rigbyhost/karui/router — createRouter, Link, notFound, redirect',
          '@rigbyhost/karui/router/file-based — createFileRouter и типы модулей страниц',
          '@rigbyhost/karui/ssr — defineSite, renderToString, islands, head',
          '@rigbyhost/karui/ssr/site-server — dev- и production-сервер для Node',
          '@rigbyhost/karui/ssr/prerender — статический экспорт',
          '@rigbyhost/karui/core — определение рантайма и render state',
          '@rigbyhost/karui/legacy — унаследованный набор из newHelper-js',
        ],
      },
      {
        id: 'page-exports',
        heading: 'Экспорты модуля страницы',
        paragraphs: [
          'Все экспорты страницы необязательны, кроме компонента по умолчанию.',
        ],
        bullets: [
          'default — компонент маршрута, получает route context',
          'loader(ctx) — данные для чтения, приходят в ctx.data',
          'action(ctx) — обрабатывает POST/PUT/PATCH/DELETE, результат в ctx.actionData',
          'meta — метаданные документа, объект или функция от контекста',
          'staticPaths() — наборы параметров для пререндера динамического маршрута',
          'errorBoundary(ctx) — error boundary уровня маршрута',
        ],
      },
      {
        id: 'route-context',
        heading: 'Route context',
        paragraphs: [
          'loader, action и компоненты получают одну и ту же структуру.',
        ],
        bullets: [
          'url — разобранный URL',
          'pathname — путь',
          'searchParams — URLSearchParams',
          'params — параметры маршрута, декодированные',
          'state — состояние сайта: RenderState или ваше расширение',
          'data — результат loader',
          'actionData — результат action, если он только что отработал',
          'request — входящий запрос, на серверных рендерах',
        ],
      },
      {
        id: 'legacy',
        heading: 'Legacy-набор',
        paragraphs: [
          'Karui унаследовал от newHelper-js императивный до-JSX набор: DOM-хелперы, перетаскиваемые окна, хоткеи, ленивую загрузку скриптов, роутер по query-строке, i18n через data-trans и HTTP-клиент, возвращающий строку.',
          'Он по-прежнему работает, но живёт на отдельной точке входа, потому что его импорт создаёт helper и вешает слушатель popstate. В новом коде лучше использовать JSX runtime, роутер и fetch.',
        ],
        code: {
          language: 'ts',
          code: "import { helper, WindowManager, Hotkeys } from '@rigbyhost/karui/legacy';",
        },
      },
    ],
  },
  {
    slug: 'migration-5',
    title: 'Переход на 5.0',
    summary: 'Что изменилось по сравнению с 4.x и что нужно переименовать.',
    category: 'reference',
    order: 230,
    sections: [
      {
        id: 'renames',
        heading: 'Переименованные экспорты сайта',
        paragraphs: [
          'Старый API был назван по демо со счётчиком, из которого его выделили. Прежние имена продолжают работать как deprecated-алиасы и будут удалены в 6.0.',
        ],
        bullets: [
          'defineCounterSite -> defineSite',
          'createCounterSite -> createSite',
          'createCounterLayoutSite -> createLayoutSite',
          'CounterSiteConfig -> SiteConfig',
          'CounterSite -> Site',
          'CounterSiteHydrationMode -> HydrationMode',
          'CounterSiteRouteContext -> SiteRouteContext',
          'CounterSiteErrorContext -> SiteErrorContext',
          'CounterSiteLayoutProps -> SiteLayoutProps',
          'CounterRenderState -> RenderState',
          'createCounterRenderState -> createRenderState',
        ],
      },
      {
        id: 'state',
        heading: 'В состоянии сайта больше нет count',
        paragraphs: [
          'RenderState — это url, runtime и generatedAt. Поле count осталось от демо со счётчиком. Держите счётчик в состоянии компонента через useState или добавьте своё поле через createState.',
        ],
      },
      {
        id: 'legacy-move',
        heading: 'Legacy-набор переехал',
        paragraphs: [
          'helper, _, createHelper, mountGlobal, WindowManager, Hotkeys, LazyLoader, LinkManager, LanguageService, HttpClient, NamespaceStorage и ErrorCenter больше не лежат в главной точке входа. Импортируйте их из @rigbyhost/karui/legacy.',
          'Благодаря этому у главной точки входа не осталось побочных эффектов, а её вес упал с 18.1 kB до 12.6 kB gzip.',
        ],
        code: {
          language: 'diff',
          code: "-import { helper, WindowManager } from '@rigbyhost/karui'\n+import { helper, WindowManager } from '@rigbyhost/karui/legacy'",
        },
      },
      {
        id: 'wire-format',
        heading: 'Переименованные внутренние идентификаторы',
        paragraphs: [
          'Пересобирайте сервер и клиент вместе — при частично выкаченной паре islands не гидрируются. islandsKey по-прежнему настраивается, если во время выкатки нужно старое значение.',
        ],
        bullets: [
          'data-bh-island -> data-karui-island',
          'data-bh-island-key -> data-karui-island-key',
          '__BH_ISLANDS__ -> __KARUI_ISLANDS__',
          "Symbol.for('betterhelper.fragment') -> Symbol.for('karui.fragment')",
        ],
      },
      {
        id: 'behaviour',
        heading: 'Изменения поведения',
        paragraphs: [
          'Эти изменения не требуют правок в коде, но меняют то, как приложение ведёт себя в рантайме.',
        ],
        bullets: [
          'Обновления диффят DOM, а не заменяют его, поэтому фокус и введённые значения сохраняются',
          'Гидрация подхватывает серверную разметку вместо пересборки',
          'key теперь влияет на идентичность хуков, а не только на рендер',
          'Данные loader сериализуются в страницу и переиспользуются при первом клиентском рендере',
          'Сервер сайта принимает POST/PUT/PATCH/DELETE вместо ответа 405',
        ],
      },
    ],
  },
];
