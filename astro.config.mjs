// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://wordix-lilac.vercel.app',
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
