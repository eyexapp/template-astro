import { z } from 'astro:content';

export const blogSchema = z.object({
  title: z.string().max(100),
  description: z.string().max(260),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default('Anonymous'),
  image: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

export const docsSchema = z.object({
  title: z.string().max(100),
  description: z.string().max(260),
  section: z.string(),
  order: z.number().default(0),
  updatedDate: z.coerce.date().optional(),
});

export type BlogEntry = z.infer<typeof blogSchema>;
export type DocsEntry = z.infer<typeof docsSchema>;
