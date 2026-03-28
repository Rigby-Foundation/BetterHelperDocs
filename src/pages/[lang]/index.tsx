import { Link, notFound } from 'better-helperjs/router';
import type { CounterSiteRouteContext } from 'better-helperjs/ssr';
import { getDefaultDocSlug, getDocsByCategory } from '../../content/docs.js';
import { getDictionary, resolveLanguage } from '../../content/i18n.js';

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
    ui: getDictionary(language),
    groups: getDocsByCategory(language),
    defaultSlug: getDefaultDocSlug(language),
  };
}

export default function LanguageOverviewPage(ctx: CounterSiteRouteContext) {
  const data = ctx.data as ReturnType<typeof loader>;

  return (
    <div className="flex flex-col bg-grid-pattern relative">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-20 lg:pt-40 lg:pb-32 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="inline-flex items-center rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-3 py-1 text-sm text-[hsl(var(--primary))] mb-8 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-[hsl(var(--primary))] mr-2 animate-pulse"></span>
          BetterHelper v3.0.4 is out!
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-[hsl(var(--muted-foreground))] drop-shadow-sm mb-8 max-w-5xl leading-tight">
          {data.ui.heroTagline}
        </h1>
        
        <p className="text-lg md:text-2xl text-[hsl(var(--muted-foreground))] max-w-3xl mb-12 leading-relaxed">
          {data.ui.heroSubtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link href={`/${data.language}/docs/${data.defaultSlug}`} className="btn-primary px-8 py-4 text-lg w-full sm:w-auto shadow-[0_0_30px_hsl(var(--primary-glow))]">
            {data.ui.heroPrimaryCta}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="ml-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
          <a href="https://github.com/Rigby-Foundation/BetterHelperjs" target="_blank" className="btn-outline px-8 py-4 text-lg w-full sm:w-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mr-2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            {data.ui.heroSecondaryCta}
          </a>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="px-6 py-20 lg:py-32 border-t border-[hsl(var(--border))] glass-panel relative z-10 bg-[hsl(var(--background))]/50">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="card p-8 group relative overflow-hidden flex flex-col hover:-translate-y-1">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[hsl(var(--primary-glow))] bg-glow group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="mb-6 inline-flex p-3 rounded-xl bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary))]/20 w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[hsl(var(--foreground))]">{data.ui.featureSsrTitle}</h3>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-sm flex-grow">{data.ui.featureSsrDesc}</p>
            </div>
            
            {/* Feature 2 */}
            <div className="card p-8 group relative overflow-hidden flex flex-col hover:-translate-y-1">
                <div className="absolute -right-10 -hidden w-40 h-40 bg-blue-500/20 bg-glow group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="mb-6 inline-flex p-3 rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20 w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[hsl(var(--foreground))]">{data.ui.featureJsxTitle}</h3>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-sm flex-grow">{data.ui.featureJsxDesc}</p>
            </div>

            {/* Feature 3 */}
            <div className="card p-8 group relative overflow-hidden flex flex-col hover:-translate-y-1">
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/20 bg-glow group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="mb-6 inline-flex p-3 rounded-xl bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20 w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[hsl(var(--foreground))]">{data.ui.featureRouterTitle}</h3>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-sm flex-grow">{data.ui.featureRouterDesc}</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
