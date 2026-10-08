import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · ${site.tagline}`,
    short_name: site.name,
    description: site.metaDescription,
    start_url: "/",
    // "browser", not "standalone": this is the marketing site, and Add to Home
    // Screen must not produce something that looks and launches like the app.
    // The installable app is app.pearmo.com, with its own manifest.
    display: "browser",
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
        src: "/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  };
}
