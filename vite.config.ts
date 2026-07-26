import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Read the framework version actually installed, so the hero badge cannot
// drift the way the hardcoded one did.
//
// Read straight off disk: Karui is ESM-only and its exports map has no
// ./package.json entry, so neither require.resolve nor a subpath import works.
const karuiVersion = (
  JSON.parse(
    readFileSync(resolve(__dirname, 'node_modules/@rigbyhost/karui/package.json'), 'utf8')
  ) as { version: string }
).version;

export default defineConfig({
  plugins: [tailwindcss()],
  define: {
    __KARUI_VERSION__: JSON.stringify(karuiVersion),
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: '@rigbyhost/karui',
  },
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/app.tsx'),
    },
  },
});
