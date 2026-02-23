import { Link, notFound } from 'better-helperjs/router';
import type { CounterSiteRouteContext } from 'better-helperjs/ssr';
import {
  getAdjacentDocs,
  getDocPage,
  getUiDictionary,
  resolveLanguage,
} from '../../../content/docs.js';

export const meta = {
  title: 'Docs',
};

export function loader(ctx: CounterSiteRouteContext) {
  const language = resolveLanguage(ctx.params.lang);
  const slug = ctx.params.slug ?? '';
  if (!language) {
    notFound();
  }

  const page = getDocPage(language, slug);
  if (!page) {
    notFound();
  }

  const adjacent = getAdjacentDocs(language, slug);

  return {
    language,
    slug,
    page,
    ui: getUiDictionary(language),
    previous: adjacent.previous,
    next: adjacent.next,
    updatedAt: '2026-02-23',
  };
}

export default function DocsPage(ctx: CounterSiteRouteContext) {
  const data = ctx.data as ReturnType<typeof loader>;

  return (
    <article className="space-y-8">
      <header className="space-y-3 border-b border-[hsl(var(--border))] pb-5">
        <h2 className="text-3xl font-semibold tracking-tight">{data.page.title}</h2>
        <p className="max-w-3xl text-[hsl(var(--muted-foreground))]">{data.page.summary}</p>
        <p className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
          {data.ui.docsLastUpdated}: {data.updatedAt}
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1fr_250px]">
        <div className="space-y-8">
          {data.page.sections.map((section) => (
            <section id={section.id} className="space-y-4 scroll-mt-20">
              <h3 className="text-xl font-semibold tracking-tight">{section.heading}</h3>

              <div className="space-y-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                {section.paragraphs.map((paragraph) => (
                  <p>{paragraph}</p>
                ))}
              </div>

              {section.bullets && section.bullets.length > 0 ? (
                <ul className="list-disc space-y-2 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
                  {section.bullets.map((bullet) => (
                    <li>{bullet}</li>
                  ))}
                </ul>
              ) : null}

              {section.code ? (
                <div className="overflow-hidden rounded-lg border border-[hsl(var(--border))]">
                  <div className="flex items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-3 py-2">
                    <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">{section.code.filename ?? section.code.language}</span>
                  </div>
                  <pre className="overflow-x-auto p-4 text-xs leading-6">
                    <code>{section.code.code}</code>
                  </pre>
                </div>
              ) : null}
            </section>
          ))}
        </div>

        <aside className="card h-fit p-4">
          <p className="mb-3 text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">{data.ui.docsOnThisPage}</p>
          <nav className="space-y-2">
            {data.page.sections.map((section) => (
              <a href={`#${section.id}`} className="block text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                {section.heading}
              </a>
            ))}
          </nav>
        </aside>
      </section>

      <footer className="grid gap-3 border-t border-[hsl(var(--border))] pt-5 sm:grid-cols-2">
        {data.previous ? (
          <Link href={`/${data.language}/docs/${data.previous.slug}`} className="card block p-4 transition-colors hover:border-[hsl(var(--ring))]">
            <p className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">{data.ui.docsPrevious}</p>
            <p className="mt-2 font-medium">{data.previous.title}</p>
          </Link>
        ) : <div />}

        {data.next ? (
          <Link href={`/${data.language}/docs/${data.next.slug}`} className="card block p-4 text-right transition-colors hover:border-[hsl(var(--ring))]">
            <p className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">{data.ui.docsNext}</p>
            <p className="mt-2 font-medium">{data.next.title}</p>
          </Link>
        ) : <div />}
      </footer>
    </article>
  );
}

