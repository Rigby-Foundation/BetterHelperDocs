import { Link, notFound } from 'better-helperjs/router';
import type { CounterSiteRouteContext } from 'better-helperjs/ssr';
import { getDefaultDocSlug, getDocsByCategory, getUiDictionary, resolveLanguage } from '../../content/docs.js';

export const meta = {
  title: 'Overview',
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

export default function LanguageOverviewPage(ctx: CounterSiteRouteContext) {
  const data = ctx.data as ReturnType<typeof loader>;

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold tracking-tight">{data.ui.homeTitle}</h2>
      <p className="text-[hsl(var(--muted-foreground))]">{data.ui.homeText}</p>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link href={`/${data.language}/docs`} className="card block p-4 transition-colors hover:border-[hsl(var(--ring))]">
          <p className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">{data.ui.docsContent}</p>
          <h3 className="mt-2 text-lg font-semibold">{data.ui.navDocsHome}</h3>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{data.ui.homeCta}</p>
        </Link>

        <Link href={`/${data.language}/docs/${data.defaultSlug}`} className="card block p-4 transition-colors hover:border-[hsl(var(--ring))]">
          <p className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">{data.ui.getStartedLabel}</p>
          <h3 className="mt-2 text-lg font-semibold">{data.ui.docsLabel}</h3>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            {data.groups.reduce((acc, group) => acc + group.pages.length, 0)} pages
          </p>
        </Link>

        <Link href={`/${data.language}/about`} className="card block p-4 transition-colors hover:border-[hsl(var(--ring))]">
          <p className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">{data.ui.navAbout}</p>
          <h3 className="mt-2 text-lg font-semibold">{data.ui.aboutTitle}</h3>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{data.ui.aboutText}</p>
        </Link>
      </div>
    </section>
  );
}
