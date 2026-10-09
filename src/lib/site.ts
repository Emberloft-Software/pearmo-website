/**
 * Site-wide configuration. Every absolute URL, canonical, sitemap entry and
 * structured-data node is derived from here — nothing hardcodes the domain.
 */

/**
 * The canonical origin, `www` included.
 *
 * This must match the host that actually serves a 200. `pearmo.com` 308-redirects
 * to `www.pearmo.com`, so pointing canonicals, hreflang, og:url, sitemap entries
 * and JSON-LD @ids at the bare apex aimed every one of them at a redirect —
 * which wastes crawl budget and lets Google discard the canonical and choose its
 * own. If the apex ever becomes primary in Vercel, change this line too.
 */
const PRODUCTION_ORIGIN = "https://www.pearmo.com";

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
  return PRODUCTION_ORIGIN;
}

export const siteUrl = resolveSiteUrl();

/** True only for the real production domain — gates indexing. */
export const isProductionSite = siteUrl === PRODUCTION_ORIGIN;

export const site = {
  url: siteUrl,
  name: "Pearmo",
  legalName: "Pearmo",
  /**
   * Feeds `authors`/`creator`/`publisher` metadata and the JSON-LD
   * `Organization`. Deliberately "Pearmo", not a studio name: no company is
   * registered, and naming an unregistered entity as the publisher is a claim
   * we cannot back up. Change this only once something is actually registered.
   */
  publisher: "Pearmo",
  /** Used as the <title> template suffix and og:site_name. */
  shortTitle: "Pearmo",
  tagline: "Meet the person, not the picture",
  description:
    "Pearmo is an anonymous, psychology-matched dating app. There's no swiping and no public photos, just a few real matches a day and chat that opens only when you both say yes. In an invite-only closed beta in Sri Lanka.",
  /**
   * Kept under ~155 chars for SERP display without truncation. Don't say
   * "verified people only": verification is optional in the app.
   */
  metaDescription:
    "Anonymous, psychology-matched dating. No swiping, no public photos, chat only when you both say yes. Closed beta in Sri Lanka. Join the beta.",
  locale: "en_LK",
  /** BCP-47 tag for <html lang> and hreflang. */
  lang: "en-LK",
  countryCode: "LK",
  country: "Sri Lanka",
  city: "Colombo",
  /**
   * The one address that actually receives mail (confirmed 4 Aug 2026).
   * hello@ and privacy@pearmo.com were aspirational and do not exist — a
   * privacy policy that routes data-subject requests into a black hole is a
   * real PDPA problem, so both point here until the domain mailboxes are set
   * up. When they are, change these two lines and `legalFacts.contactEmail`
   * in `src/content/legal.ts` together.
   */
  contactEmail: "pearmo.app@gmail.com",
  privacyEmail: "pearmo.app@gmail.com",
  themeColor: "#6c4cf1",
  backgroundColor: "#faf8ff",
  /** Minimum age — a dating service, so this is a hard gate, not a rating. */
  minimumAge: 18,
  /**
   * The beta sign-up form. Every "Join the beta" button links here. Invites
   * go out to the WhatsApp number and email address people give on it.
   */
  betaFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfnxg145QbDhb91PiIa70qEewfnhWrYTLVyHsUwBcJBJ_pe8A/viewform",
  /**
   * The launch switch for the web app (the PWA at app.pearmo.com, for
   * Android, iPhone and computers alike). Switched on 9 October 2026; set it
   * back to null to hide every app link and QR code at once.
   *
   * While null: no QR codes, no "Open Pearmo" buttons, no "Get Pearmo"
   * section, the beta form leads everywhere, and /get sends people to the
   * beta section. Setting it switches all of these on together, plus the
   * platforms in JSON-LD and llms.txt and the web-app parts of the privacy
   * policy and beta terms, so they can't drift apart.
   */
  webAppUrl: "https://app.pearmo.com" as string | null,
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

/**
 * The one address every QR code and printed link uses. It never points at
 * app.pearmo.com directly: /get answers with a temporary (307) redirect, so
 * where it leads can change without reprinting anything. Always the www
 * production host, even on preview deployments, because a printed code
 * outlives any preview.
 */
export const getUrl = `${PRODUCTION_ORIGIN}/get`;
/** The same address as people read it under a QR code. */
export const getUrlLabel = "pearmo.com/get";

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteUrl}/`).toString();
}

/**
 * Canonical + hreflang for a page.
 *
 * Next merges `metadata` one top-level field at a time, so a page that exports
 * its own `alternates` replaces the layout's wholesale — including `languages`.
 * Every page therefore builds its alternates through this helper, which keeps
 * the hreflang set attached to the canonical.
 *
 * Today there is one locale, so this self-references. It's the seam for adding
 * `/si` (Sinhala): a second entry here and the pages get correctly paired.
 */
export function buildAlternates(path = "/") {
  return {
    canonical: path,
    languages: {
      [site.lang]: path,
      // Served to anyone whose language matches no other entry.
      "x-default": path,
    },
  };
}
