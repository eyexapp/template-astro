import type { JsonLdArticle, JsonLdWebSite, SeoMeta } from '@core/types';
import { siteConfig } from '@core/config/site.config';

/** Build Open Graph and Twitter meta tags from SeoMeta */
export function buildMetaTags(meta: Partial<SeoMeta>) {
  const title = meta.title ? `${meta.title} | ${siteConfig.name}` : siteConfig.title;
  const description = meta.description || siteConfig.description;
  const image = meta.image || siteConfig.og.image;
  const url = meta.canonicalUrl || siteConfig.url;

  return {
    title,
    description,
    canonical: url,
    openGraph: {
      title,
      description,
      image: image.startsWith('http') ? image : `${siteConfig.url}${image}`,
      url,
      type: meta.type || 'website',
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      image: image.startsWith('http') ? image : `${siteConfig.url}${image}`,
    },
    robots: {
      noindex: meta.noindex || false,
      nofollow: meta.nofollow || false,
    },
  };
}

/** Generate JSON-LD structured data for the website */
export function buildWebsiteJsonLd(): JsonLdWebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

/** Generate JSON-LD structured data for a blog article */
export function buildArticleJsonLd(article: {
  title: string;
  description: string;
  image?: string;
  pubDate: Date;
  updatedDate?: Date;
  author?: string;
}): JsonLdArticle {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image
      ? article.image.startsWith('http')
        ? article.image
        : `${siteConfig.url}${article.image}`
      : undefined,
    datePublished: article.pubDate.toISOString(),
    dateModified: article.updatedDate?.toISOString(),
    author: {
      '@type': 'Person',
      name: article.author || siteConfig.author.name,
    },
  };
}
