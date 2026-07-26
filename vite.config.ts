import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Read the framework version actually installed, so the hero badge cannot
// drift the way the hardcoded one did. Needs karui >= 5.0.1, which is where
// ./package.json was added to the exports map.
const require = createRequire(import.meta.url);
const karuiVersion = (require('@rigbyhost/karui/package.json') as { version: string }).version;

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
