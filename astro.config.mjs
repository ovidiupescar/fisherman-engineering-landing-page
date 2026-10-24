// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://fishermanengineering.com',
  // Astro 7 defaults to 'jsx', which drops the spaces between inline elements; keep v5 output
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()]
  }
});