export interface SeoMeta {
  title: string;
  description: string;
  image?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

export interface JsonLdBase {
  '@context': 'https://schema.org';
  '@type': string;
}

export interface JsonLdWebSite extends JsonLdBase {
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
}

export interface JsonLdArticle extends JsonLdBase {
  '@type': 'Article';
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': 'Person';
    name: string;
  };
}
