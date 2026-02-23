import { Link } from 'better-helperjs/router';
import type { FileLayoutProps } from 'better-helperjs/router/file-based';
import type { CounterSiteState } from 'better-helperjs/ssr';
import { getDocsByCategory, getUiDictionary, resolveLanguage } from '../../../content/docs.js';

export default function DocsLayout({ children, ctx }: FileLayoutProps<CounterSiteState>) {
  const language = resolveLanguage(ctx.params.lang) ?? 'en';
  const ui = getUiDictionary(language);
  const groups = getDocsByCategory(language);
  const currentPath = ctx.pathname;

  return (
    <section className="grid gap-6 xl:grid-cols-[260px_1fr]">
      <aside className="card h-fit p-4">
        <p className="mb-3 text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">{ui.docsCategoryTitle}</p>
        <Link
          href={`/${language}/docs`}
          className={`mb-4 block rounded-md border px-3 py-2 text-sm transition-colors ${
            currentPath === `/${language}/docs`
              ? 'border-[hsl(var(--ring))] bg-[hsl(var(--muted))] font-medium'
              : 'border-[hsl(var(--border))] hover:border-[hsl(var(--ring))]'
          }`}
        >
          {ui.navDocsHome}
        </Link>

        <div className="space-y-5">
          {groups.map((group) => (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                {group.category.title}
              </p>
              <nav className="space-y-2">
                {group.pages.map((page) => (
                  <Link
                    href={`/${language}/docs/${page.slug}`}
                    className={`block rounded-md border px-3 py-2 text-sm transition-colors ${
                      currentPath === `/${language}/docs/${page.slug}`
                        ? 'border-[hsl(var(--ring))] bg-[hsl(var(--muted))] font-medium'
                        : 'border-[hsl(var(--border))] hover:border-[hsl(var(--ring))]'
                    }`}
                  >
                    {page.title}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </aside>

      <div>{children}</div>
    </section>
  );
}

