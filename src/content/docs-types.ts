export type DocCategoryId = 'fundamentals' | 'guides' | 'reference';

export interface DocCategory {
  id: DocCategoryId;
  title: string;
  description: string;
}

export interface DocCodeBlock {
  language: string;
  code: string;
  filename?: string;
}

export interface DocSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  code?: DocCodeBlock;
}

export interface DocPage {
  slug: string;
  title: string;
  summary: string;
  category: DocCategoryId;
  order: number;
  sections: DocSection[];
}
