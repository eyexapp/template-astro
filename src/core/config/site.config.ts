import type { SiteConfig } from '@core/types';

export const siteConfig: SiteConfig = {
  name: 'Astro Master',
  title: 'Astro Master Template',
  description:
    'Production-ready Astro template with multi-framework Islands Architecture, Content Collections, i18n, and Tailwind design system.',
  url: 'https://example.com',
  defaultLocale: 'en',
  locales: ['en', 'tr'],

  author: {
    name: 'Your Name',
    url: 'https://github.com/yourusername',
    email: 'you@example.com',
  },

  social: [
    { platform: 'github', url: 'https://github.com/yourusername', label: 'GitHub' },
    { platform: 'twitter', url: 'https://twitter.com/yourusername', label: 'Twitter' },
  ],

  nav: {
    main: [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Docs', href: '/docs' },
      { label: 'Showcase', href: '/showcase' },
    ],
    footer: [
      { label: 'Blog', href: '/blog' },
      { label: 'Docs', href: '/docs' },
      { label: 'GitHub', href: 'https://github.com/yourusername', external: true },
    ],
  },

  og: {
    image: '/og-image.png',
    type: 'website',
  },
};
