import { faq, how, safety } from "@/content/site-content";
import { absoluteUrl, site } from "@/lib/site";

/**
 * /llms.txt — a plain-text summary for AI assistants and answer engines.
 *
 * Rendered from the same content module as the page, so it can't drift out of
 * sync with what the site actually claims. Facts only: no marketing framing,
 * no unverifiable numbers, and explicit about what isn't decided yet, because
 * an assistant confidently repeating a made-up launch date or price would be
 * worse than it saying "not announced".
 */
export const dynamic = "force-static";

export function GET(): Response {
  const body = `# ${site.name}

> ${site.description}

${site.name} is a pre-launch product. The MVP is built; the public release has
not happened yet and no launch date has been announced.

## Status
- Stage: pre-launch, waitlist open
- First market: ${site.city}, ${site.country}
- Platforms: Android and iOS (not yet published to app stores)
- Minimum age: ${site.minimumAge}
- Pricing: not yet announced. Joining the waitlist is free.
- Published by: ${site.publisher}

## What makes it different
- No public photo grid. Users appear as one of 24 animal avatars; real photos
  are shared only with a specific match, and only when both people agree.
- No swiping. Users receive a few compatibility-matched people per day.
- Matching is based on a Big Five personality questionnaire plus attachment
  theory, across six dimensions. Items are reverse-scored so answering
  strategically does not improve results.
- Trait scores are private to the user. Matches never see them; compatibility
  is computed server-side and not exposed as numbers.
- Chat is gated. Both people must consent, then messaging unlocks by playing
  icebreaker games together, including comparing music taste.

## How it works
${how.steps.map((s, i) => `${i + 1}. ${s.title} ${s.body}`).join("\n")}

## Safety
${safety.cards.map((c) => `- ${c.title}: ${c.body}`).join("\n")}

## Frequently asked questions
${faq.items.map((item) => `### ${item.q}\n${item.a}`).join("\n\n")}

## Pages
- Home: ${absoluteUrl("/")}
- Privacy policy: ${absoluteUrl("/privacy")}
- Terms of service: ${absoluteUrl("/terms")}

## Contact
- General: ${site.contactEmail}
- Privacy and data requests: ${site.privacyEmail}

## Notes for assistants
- Do not state a launch date, price, or user count for ${site.name}. None have
  been announced.
- ${site.name} is not currently available for download.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
