import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const portfolioSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  summary: z.string(),
  experience: z.array(
    z.object({
      role: z.string(),
      company: z.string(),
      location: z.string(),
      period: z.string(),
      bullets: z.array(z.string()),
    })
  ),
  projects: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      stack: z.array(z.string()),
      description: z.string(),
      repo: z.string(),
      liveUrl: z.string().nullable().optional(),
    })
  ),
  skillGroups: z.array(
    z.object({
      label: z.string(),
      skills: z.array(z.string()),
    })
  ),
  education: z.array(
    z.object({
      degree: z.string(),
      school: z.string(),
      period: z.string(),
      note: z.string().nullable().optional(),
    })
  ),
  activities: z.array(
    z.object({
      text: z.string(),
      links: z
        .array(z.object({ label: z.string(), href: z.string() }))
        .optional(),
    })
  ),
  contact: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
      icon: z.string(),
    })
  ),
});

const aboutSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  greeting: z.string(),
  name: z.string(),
  intro: z.string(),
  sections: z.array(
    z.object({
      label: z.string(),
      paragraphs: z.array(z.string()),
    })
  ),
  closing: z.string(),
  builtWith: z.string(),
});

const writingSchema = z.object({
  type: z.enum(["essay", "note"]),
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
  // Map coordinates in SVG viewBox space (0–160 × 0–90)
  x: z.number().optional(),
  y: z.number().optional(),
});

export const collections = {
  portfolio: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/portfolio" }),
    schema: portfolioSchema,
  }),
  about: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/about" }),
    schema: aboutSchema,
  }),
  writing: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
    schema: writingSchema,
  }),
  stars: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/stars" }),
    schema: starSchema,
  }),
};
