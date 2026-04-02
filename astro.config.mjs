// @ts-check

import preact from '@astrojs/preact';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import solid from '@astrojs/solid-js';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',

  integrations: [
    preact({ include: ['**/preact/*'] }),
    solid({ include: ['**/solid/*'] }),
    react({ include: ['**/react/*'] }),
    svelte(),
    vue(),
    sitemap(),
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});