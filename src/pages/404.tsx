import type { CounterSiteRouteContext } from 'better-helperjs/ssr';
import { getUiDictionary, resolveLanguage } from '../content/docs.js';

export const meta = {
  title: '404',
};

export default function NotFoundPage(ctx: CounterSiteRouteContext) {
  const language = resolveLanguage(ctx.pathname.split('/').filter(Boolean)[0]) ?? 'en';
  const ui = getUiDictionary(language);

  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold tracking-tight">{ui.notFound}</h2>
      <p className="text-[hsl(var(--muted-foreground))]">{ui.notFoundText}</p>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">{ctx.pathname}</p>
    </section>
  );
}
