import { defineSite, type RenderState, type FileSystemModule } from '@rigbyhost/karui/ssr';
import Layout from './layout.js';
import './styles.css';

const pages = import.meta.glob('./pages/**/*.tsx', { eager: true }) as Record<string, FileSystemModule<RenderState>>;

export const site = defineSite({
  pages,
  layout: Layout,
  titlePrefix: 'Karui Docs',
  defaultTitle: 'Documentation',
  pagesRoot: './pages',
  notFoundFile: './pages/404.tsx',
  errorFile: './pages/error.tsx',
  stateKey: '__DOCS_STATE__',
  hydrateMode: 'full',
});
