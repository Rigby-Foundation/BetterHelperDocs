import type { Language } from './i18n.js';
import { enDocs } from './docs.en.js';
import { ruDocs } from './docs.ru.js';
import type { DocCategory, DocPage } from './docs-types.js';

export type {
  DocCategory,
  DocCategoryId,
  DocCodeBlock,
  DocPage,
  DocSection,
} from './docs-types.js';

const categoriesByLanguage: Record<Language, DocCategory[]> = {
  en: [
    {
      id: 'fundamentals',
      title: 'Fundamentals',
      description: 'Core concepts, setup, and project structure.',
    },
    {
      id: 'guides',
      title: 'Guides',
      description: 'Practical tutorials for common tasks.',
    },
    {
      id: 'reference',
      title: 'Reference',
      description: 'API details, commands, and migration notes.',
    },
  ],
  ru: [
    {
      id: 'fundamentals',
      title: 'Fundamentals',
      description: 'Базовые концепции, установка и структура проекта.',
    },
    {
      id: 'guides',
      title: 'Guides',
      description: 'Практические гайды для типовых задач.',
    },
    {
      id: 'reference',
      title: 'Reference',
      description: 'Справочник API, команд и заметки по миграции.',
    },
  ],
};

const docsByLanguage: Record<Language, DocPage[]> = {
  en: enDocs,
  ru: ruDocs,
};

export function getDocCategories(language: Language): DocCategory[] {
  return categoriesByLanguage[language];
}

export function getDocsCatalog(language: Language): DocPage[] {
  return docsByLanguage[language]
    .slice()
    .sort((a, b) => a.order - b.order);
}

export function getDocsByCategory(language: Language): Array<{ category: DocCategory; pages: DocPage[] }> {
  const categories = getDocCategories(language);
  const pages = getDocsCatalog(language);

  return categories.map((category) => ({
    category,
    pages: pages.filter((page) => page.category === category.id),
  }));
}

export function getDocPage(language: Language, slug: string): DocPage | null {
  return getDocsCatalog(language).find((page) => page.slug === slug) ?? null;
}

export function getDefaultDocSlug(language: Language): string {
  return getDocsCatalog(language)[0]?.slug ?? 'introduction';
}

/** Every language/slug pair, for prerendering and sitemaps. */
export function getAllDocPaths(): Array<{ lang: Language; slug: string }> {
  const paths: Array<{ lang: Language; slug: string }> = [];

  for (const language of Object.keys(docsByLanguage) as Language[]) {
    for (const page of docsByLanguage[language]) {
      paths.push({ lang: language, slug: page.slug });
    }
  }

  return paths;
}

export function getAdjacentDocs(
  language: Language,
  slug: string
): { previous: DocPage | null; next: DocPage | null } {
  const pages = getDocsCatalog(language);
  const index = pages.findIndex((page) => page.slug === slug);
  if (index < 0) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: pages[index - 1] ?? null,
    next: pages[index + 1] ?? null,
  };
}
