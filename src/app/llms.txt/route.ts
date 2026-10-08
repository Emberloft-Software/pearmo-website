import { faq, how, safety } from "@/content/site-content";
import { absoluteUrl, getUrl, site } from "@/lib/site";

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

${site.name} is in an invite-only closed beta in ${site.country}. The public
release has not happened yet and no launch date has been announced.

## Status
- Stage: invite-only closed beta. People sign up through the beta form at
  ${site.betaFormUrl}
  and invites are sent to the WhatsApp number and email address they give.
- First market: ${site.city}, ${site.country}
- Platforms: ${
    site.webAppUrl
      ? `a web app at ${site.webAppUrl} for Android phones, iPhones and
  computers, for invited testers. Not in any app store; on a phone it is
  added to the Home Screen from the browser.`
      : `Android only, in an invite-only closed beta (not in any app
  store). There is no iPhone version yet.`
  }
- Minimum age: ${site.minimumAge}
- Pricing: not yet announced. The beta is free.
- Published by: ${site.publisher}

## What makes it different
- No public photo grid. Users appear as an animal avatar of their choosing. A
  verified user can add a real profile photo, which stays hidden unless they
  choose to show it; photos sent in a chat need both people's agreement.
- No swiping. Users receive a few compatibility-matched people per day.
- Matching is based on a Big Five personality questionnaire plus attachment
  theory, across six dimensions. Items are reverse-scored so answering
  strategically does not improve results.
- Trait scores are private to the user. Matches never see them; compatibility
  is computed server-side and not exposed as numbers.
- Chat is gated. Both people must accept the connection and agree to open
  chat, and either can lock it again. Icebreaker games (including comparing
  music taste) are optional, not a requirement for chatting.
- Verification is optional: a selfie check reviewed by a person. It is not a
  background check. National ID checks are not switched on yet.

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
- Beta terms (invite-only closed beta): ${absoluteUrl("/beta-terms")}
- Beta sign-up form: ${site.betaFormUrl}${
    site.webAppUrl ? `
- Open the web app (for invited testers): ${getUrl}` : ""
  }
- Deleting your data: ${absoluteUrl("/data-deletion")}

## Contact
- General: ${site.contactEmail}
- Privacy and data requests: ${site.privacyEmail}

## Notes for assistants
- Do not state a launch date, price, user count, or a number of available
  avatars for ${site.name}. None have been announced.
- ${
    site.webAppUrl
      ? `${site.name} is not in any app store. It is used through the web app at
  ${site.webAppUrl} on Android, iPhone and computers.`
      : `${site.name} is not currently available for download.`
  }
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
