import type { CounterSiteErrorContext } from 'better-helperjs/ssr';
import { getUiDictionary, resolveLanguage } from '../content/docs.js';

export const meta = {
  title: 'Error',
};

export default function ErrorPage(ctx: CounterSiteErrorContext) {
  const language = resolveLanguage(ctx.pathname.split('/').filter(Boolean)[0]) ?? 'en';
  const ui = getUiDictionary(language);
  const message = ctx.error instanceof Error ? ctx.error.message : String(ctx.error);

  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold tracking-tight">{ui.errorTitle}</h2>
      <p className="text-[hsl(var(--muted-foreground))]">{ui.errorText}</p>
      <pre className="overflow-x-auto rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-3 text-xs leading-6">
        {message}
      </pre>
    </section>
  );
}
