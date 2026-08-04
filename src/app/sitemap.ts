import type { MetadataRoute } from "next";

import { absoluteUrl, site } from "@/lib/site";
import { LEGAL_LAST_UPDATED } from "@/content/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const legalModified = new Date(LEGAL_LAST_UPDATED);

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      // hreflang alternates belong in the sitemap as well as the <head>.
      alternates: {
        languages: { [site.lang]: absoluteUrl("/") },
      },
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: legalModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified: legalModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/beta-terms"),
      lastModified: legalModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/data-deletion"),
      lastModified: legalModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
