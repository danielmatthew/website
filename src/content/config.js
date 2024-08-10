import { defineCollection, z } from "astro:content";

export const collections = {
  work: defineCollection({
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
    schema: z.object({
      title: z.string(),
      publishedDate: z.string().or(z.date()).transform((val) => new Date(val)),
      updatedDate: z.string().optional().transform((str) => (str ? new Date(str): undefined)),
      published: z.boolean().default(false).optional()
    }),
  }),
  articles: defineCollection({
    schema: z.object({
      title: z.string(),
      publishedDate: z.string().or(z.date()).transform((val) => new Date(val)),
      updatedDate: z.string().optional().transform((str) => (str ? new Date(str): undefined)),
      published: z.boolean().default(false).optional(),
      originalSource: z.object({
        url: z.string(),
        label: z.string(),
      }).optional(),
    })
  })
};
