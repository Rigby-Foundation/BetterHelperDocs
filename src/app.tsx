import { defineCounterSite, type CounterSiteState, type FileSystemModule } from 'better-helperjs/ssr';
import Layout from './layout.js';
import './styles.css';

const pages = import.meta.glob('./pages/**/*.tsx', { eager: true }) as Record<string, FileSystemModule<CounterSiteState>>;

export const site = defineCounterSite({
  pages,
  layout: Layout,
  titlePrefix: 'BetterHelper Docs',
  defaultTitle: 'Documentation',
  pagesRoot: './pages',
  notFoundFile: './pages/404.tsx',
  errorFile: './pages/error.tsx',
  stateKey: '__DOCS_STATE__',
  hydrateMode: 'full',
  autoHydrate: true,
});
