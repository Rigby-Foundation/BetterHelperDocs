import { Link, notFound } from 'better-helperjs/router';
import type { CounterSiteRouteContext } from 'better-helperjs/ssr';
import {
  getDefaultDocSlug,
  getDocsByCategory,
  getUiDictionary,
  resolveLanguage,
} from '../../../content/docs.js';

export const meta = {
  title: 'Docs',
};

export function loader(ctx: CounterSiteRouteContext) {
  const language = resolveLanguage(ctx.params.lang);
  if (!language) {
    notFound();
  }

  return {
    language,
    ui: getUiDictionary(language),
    groups: getDocsByCategory(language),
    defaultSlug: getDefaultDocSlug(language),
  };
}

export default function DocsHomePage(ctx: CounterSiteRouteContext) {
  const data = ctx.data as ReturnType<typeof loader>;

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{data.ui.docsHomeTitle}</h2>
        <p className="text-[hsl(var(--muted-foreground))]">{data.ui.docsHomeText}</p>
        <div>
          <Link href={`/${data.language}/docs/${data.defaultSlug}`} className="btn-primary">
            {data.ui.getStartedLabel}
          </Link>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.groups.map((group) => (
          <div className="card space-y-3 p-4">
            <h3 className="text-lg font-semibold">{group.category.title}</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{group.category.description}</p>
            <div className="space-y-2">
              {group.pages.slice(0, 4).map((page) => (
                <Link href={`/${data.language}/docs/${page.slug}`} className="block text-sm underline-offset-2 hover:underline">
                  {page.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}

