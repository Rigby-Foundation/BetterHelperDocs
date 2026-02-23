import { Link } from 'better-helperjs/router';
import { useEffect } from 'better-helperjs/jsx';
import { detectSystemLanguage } from '../content/docs.js';

export const meta = {
  title: 'Language',
};

function AutoLanguageRedirect() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const preferred = window.navigator.languages?.[0] ?? window.navigator.language;
    const language = detectSystemLanguage(preferred);
    window.location.replace(`/${language}`);
  }, []);
  return null;
}

export default function LanguagePage() {
  return (
    <section className="space-y-4">
      <AutoLanguageRedirect />
      <h2 className="text-xl font-semibold">Choose language / Выберите язык</h2>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">
        Detecting system language and redirecting automatically...
      </p>

      <div className="flex flex-wrap gap-3">
        <Link href="/en" className="btn-primary">English</Link>
        <Link href="/ru" className="btn-outline">Русский</Link>
      </div>
    </section>
  );
}
