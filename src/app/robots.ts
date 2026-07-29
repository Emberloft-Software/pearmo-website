import type { MetadataRoute } from "next";

import { absoluteUrl, isProductionSite } from "@/lib/site";

/**
 * robots.txt
 *
 * AI crawlers are allowed on purpose. A pre-launch product wants to be findable
 * when someone asks an assistant "is there a dating app in Sri Lanka that
 * doesn't use photos?" — blocking these crawlers (the common default) makes the
 * site invisible in exactly the place early adopters are now looking.
 *
 * They're listed explicitly rather than relying on the wildcard so the intent
 * is on the record and easy to reverse per-crawler.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Bingbot",
  "DuckDuckBot",
  "Amazonbot",
  "cohere-ai",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  // Preview deployments must not be crawled — they'd compete with pearmo.com.
  if (!isProductionSite) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next's internal build output has no crawlable content.
        disallow: ["/_next/static/chunks/", "/api/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
