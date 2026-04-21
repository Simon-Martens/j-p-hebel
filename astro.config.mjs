// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://hebel-archiv.de',
  base: '/',
  vite: {
    plugins: [tailwindcss()]
  },
	devToolbar: {
		enabled: false
	}
});
