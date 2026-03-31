import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const essaySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional().default(false),
});

const noteSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional().default(false),
});

const starSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string(),
  draft: z.boolean().optional().default(false),
});

export const collections = {
  essays: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/essays" }),
    schema: essaySchema,
  }),
  notes: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
    schema: noteSchema,
  }),
  stars: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/stars" }),
    schema: starSchema,
  }),
};
