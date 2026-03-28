import { Link } from 'better-helperjs/router';
import type { CounterSiteLayoutProps } from 'better-helperjs/ssr';
import { getDictionary, resolveLanguage, type Language } from './content/i18n.js';

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
  const ui = getDictionary(language);

  const isLandingPage = title === 'Overview' || title === 'Language';

  const enPath = switchLanguagePath(state.url, 'en');
  const ruPath = switchLanguagePath(state.url, 'ru');

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] relative overflow-x-hidden">
      {/* Universal Background Glow */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[hsl(var(--primary-glow))] bg-glow rounded-full"></div>

      <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] glass-panel">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-4 px-6 py-4 relative z-10">
          <div className="flex items-center gap-3">
            <Link href={`/${language}`} className="inline-flex h-8 items-center rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-3 text-sm font-semibold text-[hsl(var(--foreground))] shadow-sm hover:bg-[hsl(var(--border))] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mr-2 text-[hsl(var(--primary))]"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              BetterHelper
            </Link>
            {status !== 200 && (
              <span className="rounded-md border border-[hsl(var(--border))] px-2 py-1 text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--card))]">
                HTTP {status}
              </span>
            )}
          </div>

          <nav className="flex items-center gap-2">
            <Link href={`/${language}`} className="nav-link">{ui.navOverview}</Link>
            <Link href={`/${language}/docs`} className="nav-link">{ui.navDocsHome}</Link>
            <Link href={`/${language}/docs/introduction`} className="nav-link">{ui.docsLabel}</Link>
            <Link href={`/${language}/about`} className="nav-link">{ui.navAbout}</Link>
          </nav>

          <div
            className="custom-select"
            onClick={(e: MouseEvent) => {
              const el = (e.currentTarget as HTMLElement);
              el.classList.toggle('open');
              // close on outside click
              const close = (ev: MouseEvent) => {
                if (!el.contains(ev.target as Node)) {
                  el.classList.remove('open');
                  document.removeEventListener('click', close, true);
                }
              };
              if (el.classList.contains('open')) {
                document.addEventListener('click', close, true);
              }
            }}
          >
            <button type="button" className="custom-select-trigger">
              <span>{language === 'en' ? '🇺🇸 English' : '🇷🇺 Русский'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div className="custom-select-content">
              <a
                href={enPath}
                className={`custom-select-item ${language === 'en' ? 'active' : ''}`}
              >
                🇺🇸 English
                <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </a>
              <a
                href={ruPath}
                className={`custom-select-item ${language === 'ru' ? 'active' : ''}`}
              >
                🇷🇺 Русский
                <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {isLandingPage ? (
          children
        ) : (
          <div className="w-full px-6 py-10">
            <section className="card p-8 bg-[hsl(var(--background))]">
              <div className="mb-8 border-b border-[hsl(var(--border))] pb-5">
                <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">{title}</h1>
              </div>
              <div className="space-y-6 text-[hsl(var(--muted-foreground))] leading-relaxed">
                {children}
              </div>
            </section>
          </div>
        )}
      </main>
      
      {/* Simple Footer */}
      <footer className="border-t border-[hsl(var(--border))] py-8 mt-12 relative z-10 text-center text-sm text-[hsl(var(--muted-foreground))] glass-panel">
        <p>&copy; {new Date().getFullYear()} Rigby Foundation. Built with BetterHelper.</p>
      </footer>
    </div>
  );
}
