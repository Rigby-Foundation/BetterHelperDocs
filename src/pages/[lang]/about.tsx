import { notFound } from 'better-helperjs/router';
import type { CounterSiteRouteContext } from 'better-helperjs/ssr';
import { getUiDictionary, resolveLanguage } from '../../content/docs.js';

export const meta = {
  title: 'About',
};

export function loader(ctx: CounterSiteRouteContext) {
  const language = resolveLanguage(ctx.params.lang);
  if (!language) {
    notFound();
  }

  return {
    language,
    ui: getUiDictionary(language),
  };
}

export default function AboutPage(ctx: CounterSiteRouteContext) {
  const data = ctx.data as ReturnType<typeof loader>;
  const points = data.language === 'ru'
    ? [
      'Нативный JSX runtime фреймворка',
      'File-based роутинг и nested layouts',
      'SSR режимы: full, islands, no-hydration',
      'Tailwind CSS v4 и zinc-стилизация в духе shadcn/ui',
    ]
    : [
      'Framework-native JSX runtime',
      'File-based routing and nested layouts',
      'SSR modes: full, islands, no-hydration',
      'Tailwind CSS v4 with shadcn-style zinc visuals',
    ];

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{data.ui.aboutTitle}</h2>
      <p className="text-[hsl(var(--muted-foreground))]">{data.ui.aboutText}</p>

      <ul className="list-disc space-y-2 pl-5 text-sm text-[hsl(var(--muted-foreground))]">
        {points.map((point) => <li>{point}</li>)}
      </ul>
    </section>
  );
}
