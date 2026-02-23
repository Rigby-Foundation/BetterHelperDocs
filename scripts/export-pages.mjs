import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { site } from '../dist/server/app.js';

function normalizeBasePath(input) {
  const value = (input ?? '/').trim();
  if (value === '' || value === '/') return '/';

  const startsWithSlash = value.startsWith('/');
  const endsWithSlash = value.endsWith('/');
  const withLeading = startsWithSlash ? value : `/${value}`;
  return endsWithSlash ? withLeading : `${withLeading}/`;
}

function withBase(basePath, urlPath) {
  if (basePath === '/') return urlPath;
  return `${basePath}${urlPath.replace(/^\/+/, '')}`;
}

function toFilePathForRoute(route) {
  if (route === '/') return 'index.html';
  const normalized = route.replace(/^\/+/, '').replace(/\/+$/, '');
  return path.join(normalized, 'index.html');
}

function createRootLanguageRedirect(basePath) {
  return [
    '<script>',
    '(() => {',
    "  const preferred = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';",
    "  const lang = String(preferred).toLowerCase().startsWith('ru') ? 'ru' : 'en';",
    `  const target = ${JSON.stringify(basePath)} + lang + '/';`,
    '  if (location.pathname !== target) {',
    '    location.replace(target);',
    '  }',
    '})();',
    '</script>',
  ].join('');
}

function rewriteAbsoluteUrls(html, basePath) {
  if (basePath === '/') return html;

  return html.replace(/\b(href|src)=("|')\/(?!\/)/g, (_full, attribute, quote) => {
    return `${attribute}=${quote}${basePath}`;
  });
}

function collectDocSlugs(language, html) {
  const regex = new RegExp(`href="/${language}/docs/([a-z0-9-]+)"`, 'g');
  const slugs = new Set();

  let match = regex.exec(html);
  while (match) {
    slugs.add(match[1]);
    match = regex.exec(html);
  }

  return Array.from(slugs);
}

async function main() {
  const root = process.cwd();
  const distClient = path.resolve(root, 'dist/client');
  const distPages = path.resolve(root, 'dist/pages');
  const templatePath = path.resolve(root, 'index.html');
  const manifestPath = path.resolve(distClient, '.vite/manifest.json');
  const assetsFrom = path.resolve(distClient, 'assets');
  const assetsTo = path.resolve(distPages, 'assets');
  const basePath = normalizeBasePath(process.env.PAGES_BASE_PATH);

  const [template, manifestRaw, docsEn, docsRu] = await Promise.all([
    readFile(templatePath, 'utf8'),
    readFile(manifestPath, 'utf8'),
    site.render('/en/docs'),
    site.render('/ru/docs'),
  ]);

  const manifest = JSON.parse(manifestRaw);
  const entry = manifest['src/app.tsx'];
  if (!entry) {
    throw new Error('Cannot find src/app.tsx entry in dist/client manifest');
  }

  const styleTags = (entry.css ?? [])
    .map((cssFile) => `<link rel="stylesheet" href="${withBase(basePath, `/${cssFile}`)}">`)
    .join('');

  const routes = new Set(['/', '/404', '/en', '/ru', '/en/about', '/ru/about', '/en/docs', '/ru/docs']);
  for (const slug of collectDocSlugs('en', docsEn.html)) {
    routes.add(`/en/docs/${slug}`);
  }
  for (const slug of collectDocSlugs('ru', docsRu.html)) {
    routes.add(`/ru/docs/${slug}`);
  }

  await rm(distPages, { recursive: true, force: true });
  await mkdir(distPages, { recursive: true });
  await cp(assetsFrom, assetsTo, { recursive: true });
  await writeFile(path.join(distPages, '.nojekyll'), '', 'utf8');

  for (const route of routes) {
    const rendered = await site.render(route);

    let html = template
      .replace('<!--app-head-->', `${rendered.head}\n${styleTags}`)
      .replace('<!--app-html-->', rendered.html)
      .replace('<!--app-state-->', 'null')
      .replace('<!--app-bootstrap-->', route === '/' ? createRootLanguageRedirect(basePath) : '')
      .replace('<!--app-scripts-->', '');

    html = rewriteAbsoluteUrls(html, basePath);

    const relativeFilePath = route === '/404' ? '404.html' : toFilePathForRoute(route);
    const absoluteFilePath = path.join(distPages, relativeFilePath);
    await mkdir(path.dirname(absoluteFilePath), { recursive: true });
    await writeFile(absoluteFilePath, html, 'utf8');
  }

  console.log(`[pages] exported ${routes.size} routes to ${distPages}`);
  console.log(`[pages] base path: ${basePath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

