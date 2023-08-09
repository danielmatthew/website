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
    }),
  }),
  posts: defineCollection({
    schema: z.object({
      title: z.string()
    }),
  }),
  articles: defineCollection({
    schema: z.object({
      title: z.string(),
      originalSource: z.object({
        url: z.string(),
        label: z.string(),
      }).optional(),
    })
  })
};
