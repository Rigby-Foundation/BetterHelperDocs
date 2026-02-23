import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'better-helperjs',
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
