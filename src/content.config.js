import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";
import { CATEGORIES, slugifyTag } from "./lib/taxonomy";
import { postId } from "./lib/permalinks";

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
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: "./src/content/posts",
      generateId: ({ entry, data }) => postId(entry, data.slug),
    }),
    schema: z
      .object({
        title: z.string(),
        // Overrides the URL slug derived from the filename
        slug: z.string().optional(),
        description: z.string().optional(),
        publishedDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        published: z.boolean().default(true),
        category: z.enum(CATEGORIES).default("note"),
        tags: z
          .array(z.union([z.string(), z.number()]))
          .default([])
          .transform((tags) => [...new Set(tags.map(slugifyTag))]),
        // External URL for link posts
        link: z.string().url().optional(),
        syndicate: z.boolean().default(true),
        // Content that doesn't date; suppresses the age notice
        evergreen: z.boolean().default(false),
        // Showcased on the homepage
        featured: z.boolean().default(false),
        // Kept at the top of /notes
        pinned: z.boolean().default(false),
      })
      .strict(),
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
        .or(z.date())
        .optional()
        .transform((val) => (val ? new Date(val) : undefined)),
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
