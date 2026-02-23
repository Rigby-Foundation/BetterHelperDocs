import { Link } from 'better-helperjs/router';
import type { CounterSiteLayoutProps } from 'better-helperjs/ssr';
import { getUiDictionary, resolveLanguage, type Language } from './content/docs.js';

function languageFromUrl(url: string): Language {
  const parts = url.split('/').filter(Boolean);
  const candidate = resolveLanguage(parts[0]);
  return candidate ?? 'en';
}

function switchLanguagePath(currentUrl: string, target: Language): string {
  const [pathPart, queryPart] = currentUrl.split('?');
  const parts = pathPart.split('/').filter(Boolean);
  const currentLang = resolveLanguage(parts[0]);

  if (!currentLang) {
    if (pathPart === '/404') {
      return `/${target}`;
    }
    const normalizedPath = pathPart === '/' ? '' : pathPart;
    return `/${target}${normalizedPath}${queryPart ? `?${queryPart}` : ''}`;
  }

  parts[0] = target;
  return `/${parts.join('/')}${queryPart ? `?${queryPart}` : ''}`;
}

export default function Layout({ state, children, title, status }: CounterSiteLayoutProps) {
  const language = languageFromUrl(state.url);
  const ui = getUiDictionary(language);
  const otherLanguage: Language = language === 'en' ? 'ru' : 'en';
  const otherLanguagePath = switchLanguagePath(state.url, otherLanguage);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <header className="border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 items-center rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-3 text-xs font-medium text-[hsl(var(--muted-foreground))]">
              {ui.siteLabel}
            </span>
            <span className="rounded-md border border-[hsl(var(--border))] px-2 py-1 text-xs text-[hsl(var(--muted-foreground))]">
              HTTP {status}
            </span>
          </div>

          <nav className="flex items-center gap-2">
            <Link href={`/${language}`} className="nav-link">{ui.navOverview}</Link>
            <Link href={`/${language}/docs`} className="nav-link">{ui.navDocsHome}</Link>
            <Link href={`/${language}/docs/introduction`} className="nav-link">{ui.docsLabel}</Link>
            <Link href={`/${language}/about`} className="nav-link">{ui.navAbout}</Link>
          </nav>

          <Link href={otherLanguagePath} className="btn-outline">
            {ui.switchTo} {otherLanguage.toUpperCase()}
          </Link>
        </div>
      </header>

      <main className="grid w-full max-w-screen gap-6 px-6 py-8">
        <section className="card p-6">
          <div className="mb-6 border-b border-[hsl(var(--border))] pb-4">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          </div>
          <div className="space-y-6">{children}</div>
        </section>
      </main>
    </div>
  );
}
