import en from '../locales/en.json' with { type: 'json' };
import ru from '../locales/ru.json' with { type: 'json' };

export type Language = 'en' | 'ru';
export type Dictionary = typeof en;

const dictionaries: Record<Language, Dictionary> = {
  en,
  ru,
};

export function resolveLanguage(value: string | undefined): Language | null {
  if (value === 'en' || value === 'ru') return value;
  return null;
}

export function detectSystemLanguage(value: string | undefined): Language {
  const normalized = (value ?? '').toLowerCase();
  if (normalized.startsWith('ru')) return 'ru';
  return 'en';
}

export function getDictionary(language: Language): Dictionary {
  return dictionaries[language] || dictionaries.en;
}
