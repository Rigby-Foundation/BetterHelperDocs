import type { DocPage } from './docs-types.js';

export const enDocs: DocPage[] = [
  {
    slug: 'introduction',
    title: 'Introduction',
    summary: 'What Karui is, where it fits, and what problems it solves.',
    category: 'fundamentals',
    order: 10,
    sections: [
      {
        id: 'what-is',
        heading: 'What is Karui',
        paragraphs: [
          'Karui is a full-stack TypeScript framework with its own JSX runtime, file-based router, and SSR primitives. It has no runtime dependencies.',
          'It runs on Node, Bun, and Deno, and integrates with Vite for browser development.',
        ],
      },
      {
        id: 'key-features',
        heading: 'Key capabilities',
        paragraphs: [
          'Karui covers server rendering, hydration, typed route loaders and actions, page metadata, and static export — without assembling a stack from separate packages.',
        ],
        bullets: [
          'JSX runtime with React-shaped hooks, no React or Preact',
          'Keyed reconciler: updates diff against the live DOM',
          'Hydration that adopts server markup instead of rebuilding it',
          'File-based routing with nested layouts',
          'Loaders for reads, actions for writes',
          'Hydration modes: full, islands, none',
          'Static export to plain HTML',
          'CLI for scaffolding and prerendering',
        ],
      },
      {
        id: 'cost',
        heading: 'What it costs',
        paragraphs: [
          'A typical client app pulls in the JSX runtime and the router. Numbers below are measured on every build and enforced as budgets in CI.',
        ],
        bullets: [
          '@rigbyhost/karui/jsx — 16.8 kB minified, 5.1 kB gzipped',
          '@rigbyhost/karui/router — 7.9 kB minified, 2.9 kB gzipped',
          'jsx + router together — 24.8 kB minified, 7.6 kB gzipped',
          '@rigbyhost/karui (jsx + router + ssr) — 42.5 kB minified, 12.6 kB gzipped',
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
        heading: 'Create a project',
        paragraphs: [
          'The fastest way is to scaffold with the CLI. It writes a working SSR app with routing, a layout, a loader, and an action already wired up.',
        ],
        code: {
          language: 'bash',
          code: 'npx @rigbyhost/karui create my-app\ncd my-app\nnpm run dev',
        },
      },
      {
        id: 'add-to-existing',
        heading: 'Add to an existing project',
        paragraphs: [
          'Karui is a single package with no runtime dependencies. Vite is an optional peer, needed only for the dev server and bundling.',
        ],
        code: {
          language: 'bash',
          code: 'npm install @rigbyhost/karui\nnpm install -D vite',
        },
      },
      {
        id: 'requirements',
        heading: 'Requirements',
        paragraphs: [
          'Node 20 or newer, Bun, or Deno. TypeScript projects set jsxImportSource to @rigbyhost/karui in both tsconfig and the Vite esbuild config.',
        ],
      },
    ],
  },
  {
    slug: 'project-structure',
    title: 'Project Structure',
    summary: 'Where the bootstrap, routes, and layouts live.',
    category: 'fundamentals',
    order: 30,
    sections: [
      {
        id: 'layout',
        heading: 'Typical structure',
        paragraphs: [
          'A Karui app keeps a thin bootstrap file and puts everything else in file-based pages.',
        ],
        code: {
          language: 'text',
          code: 'src/\n  app.tsx          site bootstrap\n  layout.tsx       global shell\n  pages/\n    index.tsx      -> /\n    about.tsx      -> /about\n    404.tsx        not-found entity\n    error.tsx      error entity\n    docs/\n      layout.tsx   nested layout for /docs/*\n      [slug].tsx   -> /docs/:slug\nserver.ts          node entry\nindex.html         template with <!--app-*--> slots',
        },
      },
      {
        id: 'bootstrap',
        heading: 'The bootstrap file',
        paragraphs: [
          'defineSite collects your pages, wires the layout as the shell, and hydrates itself in the browser. It is the only client entry point an app needs.',
        ],
        code: {
          language: 'tsx',
          filename: 'src/app.tsx',
          code: "import { defineSite, type FileSystemModule, type RenderState } from '@rigbyhost/karui/ssr';\nimport Layout from './layout.js';\n\nconst pages = import.meta.glob('./pages/**/*.tsx', { eager: true }) as Record<string, FileSystemModule<RenderState>>;\n\nexport const site = defineSite({\n  pages,\n  layout: Layout,\n  titlePrefix: 'My App',\n  pagesRoot: './pages',\n  hydrateMode: 'full',\n});",
        },
      },
      {
        id: 'state',
        heading: 'Site state',
        paragraphs: [
          'Every render starts from a RenderState of url, runtime, and generatedAt. Pass createState to carry your own data, such as a session, alongside it.',
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
    title: 'Routing',
    summary: 'Static, dynamic, and catch-all routes with nested layouts.',
    category: 'guides',
    order: 110,
    sections: [
      {
        id: 'patterns',
        heading: 'Route patterns',
        paragraphs: [
          'A file in pages/ becomes a route. Bracket syntax adds parameters. More specific routes win over less specific ones regardless of file order.',
        ],
        bullets: [
          'index.tsx -> /',
          'about.tsx -> /about',
          '[slug].tsx -> /:slug',
          '[...all].tsx -> /* (catch-all, params.wild)',
          'layout.tsx -> nested layout boundary for the directory',
          '404.tsx -> not-found entity',
          'error.tsx -> error entity',
        ],
      },
      {
        id: 'params',
        heading: 'Route parameters',
        paragraphs: [
          'Parameters arrive on ctx.params, already URL-decoded. Query strings are on ctx.searchParams as a standard URLSearchParams.',
        ],
        code: {
          language: 'tsx',
          filename: 'src/pages/docs/[slug].tsx',
          code: "import type { SiteRouteContext } from '@rigbyhost/karui/ssr';\n\nexport default function Doc(ctx: SiteRouteContext) {\n  const tab = ctx.searchParams.get('tab') ?? 'overview';\n  return <h1>{ctx.params.slug} — {tab}</h1>;\n}",
        },
      },
      {
        id: 'navigation',
        heading: 'Navigation',
        paragraphs: [
          'Link renders a normal anchor that the router intercepts, so client transitions happen without a full page reload. Modified clicks, external origins, download links, and target attributes fall through to the browser.',
        ],
        code: {
          language: 'tsx',
          code: "import { Link } from '@rigbyhost/karui/router';\n\n<Link href=\"/docs/routing\">Routing docs</Link>\n<Link href=\"/login\" replace>Sign in</Link>",
        },
      },
      {
        id: 'redirects',
        heading: 'Redirects',
        paragraphs: [
          'Call redirect() from a loader or an action. On the server it becomes a Location header; on the client it becomes a navigation.',
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
    title: 'Data Loading',
    summary: 'Load route data on the server with typed loaders.',
    category: 'guides',
    order: 120,
    sections: [
      {
        id: 'loader',
        heading: 'Route loader',
        paragraphs: [
          'Export loader(ctx) from a page module. It runs before the component renders, on the server for the initial request and on the client during navigation. Its result arrives as ctx.data.',
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
          'Call notFound() from a loader or component to hand rendering to your 404 entity with a 404 status.',
        ],
        code: {
          language: 'tsx',
          code: "import { notFound } from '@rigbyhost/karui/router';\n\nexport async function loader(ctx) {\n  const post = await getPost(ctx.params.slug);\n  if (!post) notFound();\n  return post;\n}",
        },
      },
      {
        id: 'hydration-handoff',
        heading: 'Handoff to the client',
        paragraphs: [
          'The server serializes its loader result into the page, so the first client render reuses that data instead of refetching. Without it the hydrated tree could differ from the markup it is adopting.',
          'The payload key defaults to __KARUI_DATA__ and is configurable with dataKey.',
        ],
      },
    ],
  },
  {
    slug: 'mutations',
    title: 'Mutations',
    summary: 'Handle form submissions and writes with route actions.',
    category: 'guides',
    order: 130,
    sections: [
      {
        id: 'action',
        heading: 'Route action',
        paragraphs: [
          'Export action(ctx) next to your loader. It runs on POST, PUT, PATCH, and DELETE, before the page re-renders. Loaders then run again, so the page shows fresh data.',
          'Because the whole flow is server-side, a plain HTML form works with no client JavaScript at all.',
        ],
        code: {
          language: 'tsx',
          filename: 'src/pages/contact.tsx',
          code: "import { redirect } from '@rigbyhost/karui/router';\nimport type { SiteActionContext, SiteRouteContext } from '@rigbyhost/karui/ssr';\n\nexport async function action(ctx: SiteActionContext) {\n  const message = String(ctx.request.formData.message ?? '').trim();\n  if (!message) return { error: 'Message cannot be empty' };\n\n  await saveMessage(message);\n  redirect('/contact?sent=1', 303);\n}\n\nexport default function Contact(ctx: SiteRouteContext) {\n  const result = ctx.actionData as { error?: string } | undefined;\n\n  return (\n    <form method=\"post\">\n      {result?.error ? <p>{result.error}</p> : null}\n      <input name=\"message\" />\n      <button type=\"submit\">Send</button>\n    </form>\n  );\n}",
        },
      },
      {
        id: 'request',
        heading: 'Reading the request',
        paragraphs: [
          'ctx.request carries what an action needs, and nothing more. It is transport-agnostic, so a Bun, Deno, or worker handler can build one too.',
        ],
        bullets: [
          'method — the uppercased HTTP method',
          'headers — a record with lowercased keys',
          'body — the raw request body',
          'formData — parsed fields; a repeated field becomes an array',
          'json — the parsed body when Content-Type is JSON',
        ],
      },
      {
        id: 'post-redirect-get',
        heading: 'POST, redirect, GET',
        paragraphs: [
          'Redirect with status 303 after a successful mutation. A browser reload then re-requests the destination instead of resubmitting the form.',
          'Return a value instead of redirecting when the submission failed validation: it arrives as ctx.actionData and the page renders with the error inline.',
        ],
      },
      {
        id: 'limits',
        heading: 'Limits',
        paragraphs: [
          'A POST to a route with no action answers 405. Bodies above 1 MB are rejected with 413. multipart/form-data is not parsed — read ctx.request.body yourself for uploads.',
        ],
      },
    ],
  },
  {
    slug: 'rendering',
    title: 'Rendering and Hydration',
    summary: 'How updates reach the DOM, and how server markup is adopted.',
    category: 'guides',
    order: 140,
    sections: [
      {
        id: 'reconciler',
        heading: 'The reconciler',
        paragraphs: [
          'Updates diff against the DOM that is already on the page rather than replacing it. Element identity survives a re-render, and with it focus, text selection, scroll offsets inside nested containers, CSS transitions, and the value of an uncontrolled input.',
          'Event handlers are attached once per element and event type, with the current handler held in a side table, so an inline arrow function does not cause listener churn.',
        ],
      },
      {
        id: 'keys',
        heading: 'Keys',
        paragraphs: [
          'key drives both child reconciliation and hook identity. A reordered list item moves its DOM node instead of being rebuilt, and keeps its own useState. Without a key, children reconcile by position.',
        ],
        code: {
          language: 'tsx',
          code: '{items.map((item) => (\n  <Row key={item.id} item={item} />\n))}',
        },
      },
      {
        id: 'modes',
        heading: 'Hydration modes',
        paragraphs: [
          'full hydrates the whole page and suits interactive apps. islands hydrates only the components you mark, leaving the rest as static HTML. none ships no client JavaScript at all.',
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
          'Mark a component with defineIsland and it is collected during the server render along with its props. On the client only those components hydrate, adopting their server markup; everything around them is untouched.',
        ],
        code: {
          language: 'tsx',
          code: "import { defineIsland } from '@rigbyhost/karui/ssr';\nimport { useState } from '@rigbyhost/karui/jsx';\n\nexport const Counter = defineIsland(() => {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n});",
        },
      },
      {
        id: 'manual',
        heading: 'Rendering by hand',
        paragraphs: [
          'The JSX package exposes the primitives directly if you are not using the site conventions.',
        ],
        bullets: [
          'mount(root, node) — render into root; later calls diff',
          'hydrate(root, node) — adopt server markup, then behave like mount',
          'unmount(root) — run effect cleanups, release refs, empty root',
          'renderToString(node) — HTML for SSR',
          'renderToDom(node, doc) — detached DOM nodes',
        ],
      },
      {
        id: 'chunked',
        heading: 'Chunked responses',
        paragraphs: [
          'streamToNodeResponse writes the response in chunks. Note that the page is rendered in full before the first chunk is sent, so this is not progressive streaming and does not improve time to first byte. Real progressive flush is not implemented yet.',
        ],
      },
    ],
  },
  {
    slug: 'jsx-runtime',
    title: 'JSX Runtime',
    summary: 'Framework-native JSX and hooks, with no React dependency.',
    category: 'guides',
    order: 150,
    sections: [
      {
        id: 'config',
        heading: 'Configuration',
        paragraphs: [
          'Point jsxImportSource at @rigbyhost/karui in tsconfig, and in the Vite esbuild config for the bundler.',
        ],
        code: {
          language: 'json',
          filename: 'tsconfig.json',
          code: '{\n  "compilerOptions": {\n    "jsx": "react-jsx",\n    "jsxImportSource": "@rigbyhost/karui"\n  }\n}',
        },
      },
      {
        id: 'hooks',
        heading: 'Hooks',
        paragraphs: [
          'The runtime provides useState, useEffect, useMemo, useCallback, useReducer, useRef, createContext, and useContext, with React semantics.',
        ],
        code: {
          language: 'tsx',
          code: "import { useState } from '@rigbyhost/karui/jsx';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;\n}",
        },
      },
      {
        id: 'refs',
        heading: 'Refs',
        paragraphs: [
          'Pass a useRef to the ref prop of a host element. It is set when the element mounts and reset to null when it leaves the tree. A callback ref works too.',
        ],
        code: {
          language: 'tsx',
          code: "import { useEffect, useRef } from '@rigbyhost/karui/jsx';\n\nexport function SearchBox() {\n  const input = useRef<HTMLInputElement | null>(null);\n  useEffect(() => input.current?.focus(), []);\n  return <input ref={input} />;\n}",
        },
      },
      {
        id: 'attributes',
        heading: 'Attributes',
        paragraphs: [
          'className and htmlFor map to class and for. Style accepts a string or an object, and object styles are diffed per property. SVG children render in the SVG namespace automatically, with camelCase presentation attributes converted to kebab-case.',
          'On form elements, value, checked, and selected are written as DOM properties and re-synced on every render, so a controlled field stays in step with its prop even after the user types.',
        ],
      },
    ],
  },
  {
    slug: 'metadata',
    title: 'Page Metadata',
    summary: 'Drive the document head from your page modules.',
    category: 'guides',
    order: 160,
    sections: [
      {
        id: 'meta-export',
        heading: 'The meta export',
        paragraphs: [
          'Export meta from a page and Karui renders it into the head. Every field is optional; omit title and it falls back to one derived from the route path.',
        ],
        code: {
          language: 'tsx',
          filename: 'src/pages/docs/[slug].tsx',
          code: "export const meta = {\n  title: 'Docs',\n  description: 'How Karui routing works',\n  canonical: 'https://example.com/docs',\n  robots: 'index,follow',\n  lang: 'en',\n  og: { type: 'article', image: 'https://example.com/card.png' },\n  twitter: { card: 'summary_large_image' },\n  meta: [{ name: 'author', content: 'Rigby Foundation' }],\n  link: [{ rel: 'alternate', hreflang: 'de', href: '/de/docs' }],\n};",
        },
      },
      {
        id: 'defaults',
        heading: 'Open Graph defaults',
        paragraphs: [
          'og:title, og:description, and og:url default to your title, description, and canonical, so most pages set only the three fields they care about. Anything you put in og overrides the derived value.',
        ],
      },
      {
        id: 'dynamic',
        heading: 'Metadata from loader data',
        paragraphs: [
          'Export a function instead of an object to build metadata from the resolved route context. Loaders run first, so ctx.data is available.',
        ],
        code: {
          language: 'tsx',
          code: "export const meta = (ctx) => ({\n  title: `Post: ${ctx.data.title}`,\n  description: ctx.data.excerpt,\n  og: { image: ctx.data.coverUrl },\n});",
        },
      },
      {
        id: 'lang',
        heading: 'Document language',
        paragraphs: [
          'meta.lang rewrites the lang attribute on the html tag of your template, which matters for multilingual sites where the language is part of the route.',
        ],
      },
    ],
  },
  {
    slug: 'error-handling',
    title: 'Error Handling',
    summary: 'Route errors, boundaries, and status codes.',
    category: 'guides',
    order: 170,
    sections: [
      {
        id: 'entities',
        heading: 'Error entities',
        paragraphs: [
          'pages/error.tsx handles route errors globally and renders with a 500 status. pages/404.tsx handles not-found and renders with 404. Both are marked noindex automatically.',
          'A page module can also export errorBoundary for a route-level boundary that takes precedence over the global one.',
        ],
        code: {
          language: 'tsx',
          filename: 'src/pages/error.tsx',
          code: "import type { SiteErrorContext } from '@rigbyhost/karui/ssr';\n\nexport default function ErrorPage(ctx: SiteErrorContext) {\n  const message = ctx.error instanceof Error ? ctx.error.message : String(ctx.error);\n  return <pre>{message}</pre>;\n}",
        },
      },
      {
        id: 'control-flow',
        heading: 'Errors versus control flow',
        paragraphs: [
          'notFound() and redirect() throw, but they are control flow rather than failures. An error boundary never catches them: notFound() routes into your 404 entity, and redirect() reaches the transport as a Location header.',
        ],
      },
    ],
  },
  {
    slug: 'static-export',
    title: 'Static Export',
    summary: 'Render the site to plain HTML files.',
    category: 'guides',
    order: 180,
    sections: [
      {
        id: 'prerender',
        heading: 'Prerendering',
        paragraphs: [
          'karui prerender renders your built site to .html files that any static host can serve, with no Node process involved. It pairs naturally with hydrateMode none for pages that ship zero JavaScript.',
        ],
        code: {
          language: 'bash',
          code: 'npm run build          # client + server bundles\nkarui prerender        # -> dist/static/',
        },
      },
      {
        id: 'static-paths',
        heading: 'Dynamic routes',
        paragraphs: [
          'Static routes are discovered automatically. A dynamic route is prerendered only if its page exports staticPaths, so a missing export means "render this on demand" rather than a silently missing page.',
        ],
        code: {
          language: 'tsx',
          filename: 'src/pages/docs/[slug].tsx',
          code: "export function staticPaths() {\n  return [{ slug: 'introduction' }, { slug: 'routing' }];\n}",
        },
      },
      {
        id: 'cli-options',
        heading: 'Options',
        paragraphs: [
          'Point the output elsewhere, add paths the router does not know about, or render a not-found page to 404.html for host-level handling.',
        ],
        code: {
          language: 'bash',
          code: 'karui prerender --out public --not-found /404 --path /extra-page',
        },
      },
      {
        id: 'programmatic',
        heading: 'From a script',
        paragraphs: [
          'The same routine is available as a function. It imports Node built-ins, so it lives on its own subpath and never reaches a client bundle.',
        ],
        code: {
          language: 'ts',
          code: "import { prerenderSite } from '@rigbyhost/karui/ssr/prerender';\n\nconst pages = await prerenderSite({\n  outDir: 'dist/static',\n  notFoundPath: '/404',\n});\n\nconsole.log(`${pages.length} pages written`);",
        },
      },
    ],
  },
  {
    slug: 'cli',
    title: 'CLI Reference',
    summary: 'Scaffold projects and export static HTML from the terminal.',
    category: 'reference',
    order: 210,
    sections: [
      {
        id: 'create',
        heading: 'karui create',
        paragraphs: [
          'Scaffolds a new project. The package installs a karui binary, so it is available as npx karui inside a project and npx @rigbyhost/karui from anywhere.',
        ],
        code: {
          language: 'bash',
          code: 'karui create <project-name> [options]\n\n  --pm <npm|pnpm|yarn|bun>   package manager for install\n  --no-install               skip dependency install\n  --force                    allow a non-empty target directory',
        },
      },
      {
        id: 'prerender-cmd',
        heading: 'karui prerender',
        paragraphs: [
          'Renders a built site to static HTML. Run it after npm run build.',
        ],
        code: {
          language: 'bash',
          code: 'karui prerender [options]\n\n  --out <dir>          output directory (default dist/static)\n  --root <dir>         project root (default cwd)\n  --path <url>         extra path to render (repeatable)\n  --not-found <url>    render this path to 404.html\n  --only-paths         render only --path entries\n  --template <file>    html template (default index.html)\n  --app <module>       app entry (default /src/app.tsx)\n  --client-dist <dir>  client build dir (default dist/client)\n  --server-dist <dir>  server build dir (default dist/server)',
        },
      },
    ],
  },
  {
    slug: 'api',
    title: 'API Reference',
    summary: 'Entry points and the exports each one carries.',
    category: 'reference',
    order: 220,
    sections: [
      {
        id: 'entries',
        heading: 'Entry points',
        paragraphs: [
          'The main entry has no side effects, so a bundler keeps only what you import.',
        ],
        bullets: [
          '@rigbyhost/karui — jsx, router, and ssr together',
          '@rigbyhost/karui/jsx — runtime, hooks, mount, hydrate, unmount',
          '@rigbyhost/karui/router — createRouter, Link, notFound, redirect',
          '@rigbyhost/karui/router/file-based — createFileRouter and page module types',
          '@rigbyhost/karui/ssr — defineSite, renderToString, islands, head',
          '@rigbyhost/karui/ssr/site-server — the Node dev and production server',
          '@rigbyhost/karui/ssr/prerender — static export',
          '@rigbyhost/karui/core — runtime detection and render state',
          '@rigbyhost/karui/legacy — the inherited newHelper-js toolkit',
        ],
      },
      {
        id: 'page-exports',
        heading: 'Page module exports',
        paragraphs: [
          'Every export on a page module is optional except the default component.',
        ],
        bullets: [
          'default — the route component, receives the route context',
          'loader(ctx) — data for reads, available as ctx.data',
          'action(ctx) — handles POST/PUT/PATCH/DELETE, available as ctx.actionData',
          'meta — document metadata, an object or a function of the context',
          'staticPaths() — parameter sets to prerender for a dynamic route',
          'errorBoundary(ctx) — a route-level error boundary',
        ],
      },
      {
        id: 'route-context',
        heading: 'Route context',
        paragraphs: [
          'Loaders, actions, and components all receive the same shape.',
        ],
        bullets: [
          'url — the parsed URL',
          'pathname — the path portion',
          'searchParams — a URLSearchParams',
          'params — route parameters, URL-decoded',
          'state — site state, RenderState or your own extension',
          'data — the loader result',
          'actionData — the action result, when one just ran',
          'request — the incoming request, on server renders',
        ],
      },
      {
        id: 'legacy',
        heading: 'Legacy toolkit',
        paragraphs: [
          'Karui inherited an imperative pre-JSX toolkit from newHelper-js: DOM helpers, draggable windows, hotkeys, a script lazy-loader, a query-string router, a data-trans i18n service, and a string-returning HTTP client.',
          'It still works, but it lives on its own entry because importing it instantiates a helper and registers a popstate listener. New code should prefer the JSX runtime, the router, and fetch.',
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
    title: 'Migrating to 5.0',
    summary: 'What changed from 4.x, and what to rename.',
    category: 'reference',
    order: 230,
    sections: [
      {
        id: 'renames',
        heading: 'Renamed site exports',
        paragraphs: [
          'The old API was named after the counter demo it was extracted from. The old names still work as deprecated aliases and are removed in 6.0.',
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
        heading: 'Site state no longer carries count',
        paragraphs: [
          'RenderState is url, runtime, and generatedAt. The count field was residue from the counter demo. Keep a counter in component state with useState, or add your own field through createState.',
        ],
      },
      {
        id: 'legacy-move',
        heading: 'The legacy toolkit moved',
        paragraphs: [
          'helper, _, createHelper, mountGlobal, WindowManager, Hotkeys, LazyLoader, LinkManager, LanguageService, HttpClient, NamespaceStorage, and ErrorCenter are no longer on the main entry. Import them from @rigbyhost/karui/legacy.',
          'The main entry is side-effect free as a result, and dropped from 18.1 kB to 12.6 kB gzipped.',
        ],
        code: {
          language: 'diff',
          code: "-import { helper, WindowManager } from '@rigbyhost/karui'\n+import { helper, WindowManager } from '@rigbyhost/karui/legacy'",
        },
      },
      {
        id: 'wire-format',
        heading: 'Renamed internals',
        paragraphs: [
          'Rebuild server and client together — a half-deployed pair will not hydrate islands. islandsKey is still configurable if you need the old value during a rollout.',
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
        heading: 'Behaviour changes',
        paragraphs: [
          'These need no code changes, but they change what your app does at runtime.',
        ],
        bullets: [
          'Updates diff the DOM instead of replacing it, so focus and input values survive',
          'Hydration adopts server markup instead of rebuilding it',
          'key now affects hook identity, not just rendering',
          'Loader data is serialized into the page and reused on first client render',
          'The site server accepts POST/PUT/PATCH/DELETE instead of answering 405',
        ],
      },
    ],
  },
];
