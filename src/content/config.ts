import { defineCollection } from 'astro:content';
import { blogSchema, docsSchema } from '@core/schemas/content';

const blog = defineCollection({
  type: 'content',
  schema: blogSchema,
});

const docs = defineCollection({
  type: 'content',
  schema: docsSchema,
});

export const collections = { blog, docs };
