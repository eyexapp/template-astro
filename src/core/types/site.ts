import type { NavItem } from './nav';

export interface SocialLink {
  platform: 'github' | 'twitter' | 'linkedin' | 'youtube' | 'discord' | 'mastodon';
  url: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  defaultLocale: string;
  locales: string[];
  author: {
    name: string;
    url?: string;
    email?: string;
  };
  social: SocialLink[];
  nav: {
    main: NavItem[];
    footer: NavItem[];
  };
  og: {
    image: string;
    type: 'website' | 'article';
  };
}
