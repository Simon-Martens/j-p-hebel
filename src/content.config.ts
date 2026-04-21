import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const richTextRunSchema = z.object({
  text: z.string(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  href: z.string().optional(),
  targetBlank: z.boolean().optional(),
  ariaLabel: z.string().optional(),
});

const richTextBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("heading"),
    level: z.union([z.literal(2), z.literal(3)]),
    text: z.string(),
    className: z.string().optional(),
  }),
  z.object({
    type: z.literal("paragraph"),
    runs: z.array(richTextRunSchema).min(1),
    className: z.string().optional(),
  }),
  z.object({
    type: z.literal("lines"),
    lines: z.array(z.array(richTextRunSchema).min(1)).min(1),
    className: z.string().optional(),
  }),
  z.object({
    type: z.literal("list"),
    items: z.array(z.array(richTextRunSchema).min(1)).min(1),
    className: z.string().optional(),
  }),
]);

const site = defineCollection({
  loader: glob({ pattern: "global.json", base: "./src/content" }),
  schema: z.object({
    brand: z.object({
      markLeading: z.string(),
      markAccent: z.string(),
      location: z.string(),
    }),
    seoDefaults: z.object({
      title: z.string(),
      description: z.string(),
    }),
    nav: z.object({
      ariaLabel: z.string(),
      homeAriaLabel: z.string(),
      menuLabel: z.string(),
      items: z.array(
        z.object({
          key: z.string(),
          href: z.string(),
          label: z.string(),
        }),
      ),
    }),
    footer: z.object({
      copyright: z.string(),
      buildDatePrefix: z.string(),
      links: z.object({
        kontakt: z.string(),
        datenschutz: z.string(),
      }),
    }),
  }),
});

const homePage = defineCollection({
  loader: glob({ pattern: "home.json", base: "./src/content" }),
  schema: z.object({
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
    imageAlt: z.string(),
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
    }),
    links: z.array(
      z.object({
        href: z.string(),
        label: z.string(),
        descriptionLines: z.array(z.string()).min(1),
      }),
    ),
  }),
});

const editionPage = defineCollection({
  loader: glob({ pattern: "edition.json", base: "./src/content" }),
  schema: z.object({
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
    imageAlt: z.string(),
    hero: z.object({
      eyebrow: z.string(),
      title: z.string(),
      subtitle: z.string(),
      foundationText: z.string(),
    }),
    overviewTitle: z.string(),
    introStudy: z.object({
      title: z.string(),
      paragraphs: z.array(z.string()).min(1),
    }),
    volumes: z.array(
      z.object({
        band: z.string(),
        title: z.string(),
        pages: z.string(),
        lines: z.array(z.string()).min(1),
      }),
    ),
  }),
});

const tagungPage = defineCollection({
  loader: glob({ pattern: "tagung.json", base: "./src/content" }),
  schema: z.object({
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
    imageAlt: z.string(),
    hero: z.object({
      eyebrow: z.string(),
      title: z.string(),
      subtitle: z.string(),
      organizer: z.string(),
    }),
    badgeLines: z.array(z.string()).length(2),
    days: z.array(
      z.object({
        date: z.string(),
        talks: z.array(
          z.object({
            time: z.string(),
            name: z.string().optional(),
            title: z.string(),
          }),
        ),
      }),
    ).length(2),
  }),
});

const ausstellungPage = defineCollection({
  loader: glob({ pattern: "ausstellung.json", base: "./src/content" }),
  schema: z.object({
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
    imageAlt: z.string(),
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      cardLines: z.array(z.string()).min(1),
    }),
    badge: z.object({
      label: z.string(),
      preposition: z.string(),
      date: z.string(),
      year: z.string(),
    }),
  }),
});

const kontaktPage = defineCollection({
  loader: glob({ pattern: "kontakt.json", base: "./src/content" }),
  schema: z.object({
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
    heroTitle: z.string(),
    contactGroups: z.array(z.array(z.string()).min(1)).min(1),
  }),
});

const datenschutzPage = defineCollection({
  loader: glob({ pattern: "datenschutz.json", base: "./src/content" }),
  schema: z.object({
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
    heroTitle: z.string(),
    noticeBlocks: z.array(richTextBlockSchema).min(1),
    contentBlocks: z.array(richTextBlockSchema).min(1),
  }),
});

export const collections = {
  site,
  homePage,
  editionPage,
  tagungPage,
  ausstellungPage,
  kontaktPage,
  datenschutzPage,
};
