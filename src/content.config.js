import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

export const collections = {
  work: defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/work" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      projectDate: z.string().optional(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
      draft: z.boolean().default(false).optional(),
    }),
  }),
  posts: defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/posts" }),
    schema: z.object({
      title: z.string(),
      publishedDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      published: z.boolean().default(true).optional(),
      evergreen: z.boolean().optional(),
      tags: z.array(z.string()).optional().default([]),
    }),
  }),
  articles: defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/articles" }),
    schema: z.object({
      title: z.string(),
      publishedDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      published: z.boolean().default(true).optional(),
      originalSource: z
        .object({
          url: z.string(),
          label: z.string(),
        })
        .optional(),
    }),
  }),
};
