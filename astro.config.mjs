// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://simon-martens.github.io',
  base: '/j-p-hebel',
  vite: {
    plugins: [tailwindcss()]
  }
});
