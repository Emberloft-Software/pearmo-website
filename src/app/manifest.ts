import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description: site.metaDescription,
    start_url: "/",
    display: "standalone",
    background_color: site.backgroundColor,
    theme_color: site.themeColor,
    lang: site.lang,
    dir: "ltr",
    categories: ["social", "lifestyle", "dating"],
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        src: "/apple-icon",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  };
}
