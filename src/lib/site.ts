/**
 * Site-wide configuration. Every absolute URL, canonical, sitemap entry and
 * structured-data node is derived from here — nothing hardcodes the domain.
 */

function resolveSiteUrl(): string {
  // Explicit override wins (set this in Vercel project settings).
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  // Vercel preview/branch deployments: use their generated URL so OG images
  // and canonicals resolve on previews instead of pointing at production.
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://pearmo.com";
}

export const siteUrl = resolveSiteUrl();

/** True only for the real production domain — gates indexing. */
export const isProductionSite = siteUrl === "https://pearmo.com";

export const site = {
  url: siteUrl,
  name: "Pearmo",
  legalName: "Pearmo",
  publisher: "Emberloft Software",
  /** Used as the <title> template suffix and og:site_name. */
  shortTitle: "Pearmo",
  tagline: "Meet the person, not the picture",
  description:
    "Pearmo is an anonymous, psychology-matched dating app. No swiping, no public photos — a few real, verified matches a day, and chat that opens only when you both say yes. Launching first in Sri Lanka.",
  /** Kept under ~155 chars for SERP display without truncation. */
  metaDescription:
    "Anonymous, psychology-matched dating. No swiping, no public photos, verified people only. Launching first in Sri Lanka — join the Pearmo waitlist.",
  locale: "en_LK",
  /** BCP-47 tag for <html lang> and hreflang. */
  lang: "en-LK",
  countryCode: "LK",
  country: "Sri Lanka",
  city: "Colombo",
  contactEmail: "hello@pearmo.com",
  privacyEmail: "privacy@pearmo.com",
  themeColor: "#6c5ce7",
  backgroundColor: "#f6f4fb",
  /** Minimum age — a dating service, so this is a hard gate, not a rating. */
  minimumAge: 18,
} as const;

/**
 * Search-console verification tokens. Add these as environment variables in
 * Vercel; the meta tags are omitted entirely when the vars are absent, so an
 * unverified deploy ships no empty tags.
 *
 *   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION  — Google Search Console
 *   NEXT_PUBLIC_BING_SITE_VERIFICATION    — Bing Webmaster Tools
 */
export const verification = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
} as const;

/**
 * Social profiles feed Organization.sameAs in JSON-LD, which is how search
 * engines tie the domain to the brand's accounts (entity consolidation).
 * Commented entries are placeholders — uncomment as accounts go live, an
 * empty or 404 sameAs URL is worse than none.
 */
export const socialProfiles: readonly string[] = [
  // "https://www.instagram.com/pearmoapp",
  // "https://www.facebook.com/pearmoapp",
  // "https://www.linkedin.com/company/pearmo",
  // "https://x.com/pearmoapp",
];

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteUrl}/`).toString();
}
