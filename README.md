# Pearmo — marketing site (closed beta)

Next.js 16 (App Router) + TypeScript + Tailwind v4. Deployed to Vercel at
**pearmo.com**.

Rebuilt from a single-file static `index.html`, which is archived at
[`legacy/index.html`](legacy/index.html) for reference. Nothing imports it.

> **See [`PROJECT-STATUS.md`](PROJECT-STATUS.md)** for the full picture: measured
> Lighthouse scores, everything that's done, every known gap (SEO, Search
> Console, analytics, ASO, off-page), and the six decisions still needed.
> **It also documents a canonical-host defect that must be fixed at merge.**

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
```

## ⚠️ Before merging to `main` — Vercel needs a settings change

The repo used to be a static folder with no build step. It is now a Next.js
app, so the Vercel project settings must be updated **at the same time as the
merge**, or the deploy will serve nothing:

| Setting          | Old               | New                       |
| ---------------- | ----------------- | ------------------------- |
| Framework Preset | Other / None      | **Next.js**               |
| Build Command    | _(empty)_         | `npm run build` (default) |
| Output Directory | `.` / root        | _(leave empty)_           |
| Install Command  | _(empty)_         | `npm install` (default)   |
| Node version     | —                 | 22.x or later             |

Merging to `main` without this is the only real deployment risk in the rebuild.
Check the branch's preview deployment first — it exercises the same settings.

## Environment variables

All optional. Everything works without them; each one is skipped cleanly when
absent.

| Variable                               | Purpose                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | Overrides the canonical origin. Defaults to `https://www.pearmo.com`.        |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification token → emits the `google-site-verification` meta tag. |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`   | Bing Webmaster Tools token → emits the `msvalidate.01` meta tag.             |

Preview deployments detect themselves via `VERCEL_ENV` and automatically
switch to `noindex` plus a `Disallow: /` robots.txt, so previews can never
compete with production in search results.

## Design (direction C, "Duet")

Rebuilt in October 2026. Everything comes in pairs: the headline is a
two-line exchange between the fox and the wolf avatars, the hero scene is
drag-to-compare (avatar ↔ person), and colour blocks replace cards. Two
sections use layouts borrowed from the other candidate directions, restyled
in C: **How it works** (direction A: a sticky phone on desktop, a swipe row
on phones) and **Icebreakers** (direction B: a full-bleed scene where a
spotlight turns the avatars into people as you scroll). The **FAQ** has
equal-width topic tabs over equal-width rows.

**Tokens** live in `@theme` in `src/app/globals.css`. The palette is the
Flutter app's own, so a tap from the site into the web app feels like one
product:

| Token | Hex | Use |
| ----- | --- | --- |
| `paper` | `#faf8ff` | page |
| `ink` / `ink-2` / `mute` | `#17101f` / `#3b3350` / `#5e5670` | text, strongest to quietest (all AA on paper) |
| `lime` / `lime-press` | `#c6ff3d` / `#b5f01f` | big panels, highlighter, buttons on dark |
| `violet` / `violet-soft` / `violet-deep` | `#6c4cf1` / `#efeafe` / `#4a2fd0` | blocks, focus ring; `violet-deep` for small text on soft fills |
| `on-violet` | `#f7f5ff` | body text on violet (4.9:1) |
| `pink` / `pink-soft` / `magenta` | `#ff3d7f` / `#ffe1ec` / `#c4176a` | dots and stickers; `magenta` is pink's text-safe version |
| `coral` / `indigo` | `#ef4c56` / `#291450` | the logo only |

**Fonts**, self-hosted with `next/font` (the CSP blocks font CDNs), all
preloaded because all three render above the fold:

- **Funnel Display 800**: headings (one static file)
- **Funnel Sans**: body, nav, buttons (one variable file)
- **Instrument Serif italic**: the accent word in headings and the quotes,
  the same face the app uses for quotes

Font stacks name Noto Sans Sinhala and Noto Sans Tamil as the first
fallbacks, ready for those locales.

**Logo**: the 2026 pear-and-p mark, traced into two SVG paths in
`src/lib/logo-paths.ts` and drawn by `Logo.tsx` (`tone` swaps the "p" for
light or ink grounds). `icon.svg`, `favicon.ico` and `apple-icon.png` use a
version with a thickened pear line so it survives at 16px.

**Motion** (`src/components/motion/Motion.tsx`): GSAP ScrollTrigger and
SplitText plus Lenis smooth scrolling, driven by `data-` attributes
(`data-reveal`, `data-stagger`, `data-split`, `data-parallax`,
`data-marquee`, `data-spotlight`, `data-pin`, `data-radar`). Rules:

- it loads on the first scroll, touch, wheel, key or mouse movement, then
  when idle, so it never competes with first paint;
- content is never hidden in CSS; only elements below the fold at that
  moment animate in, so nothing visible blinks out, and with JS off the page
  is simply static;
- reveals use opacity, never `visibility` (GSAP's `autoAlpha`): hidden
  elements can't take focus, so keyboard users would skip whole sections;
- Lenis only for a mouse or trackpad; phones keep native scrolling;
- `prefers-reduced-motion: reduce` gets no Lenis and no animations.

## The web app, its buttons and the QR codes

The web app is a PWA at app.pearmo.com for Android, iPhone and computers.
`site.webAppUrl` in `src/lib/site.ts` is the single launch switch. It was
switched on (`https://app.pearmo.com`) on 9 October 2026; set it back to
`null` to hide every app link and QR code at once.

| | `webAppUrl` null | `webAppUrl` set (today) |
| --- | --- | --- |
| Main button everywhere | **Join the beta** → `site.betaFormUrl` (Google Form) | same |
| Phones and tablets | nothing else | "Already invited? **Open Pearmo**" + the Get Pearmo section's button |
| Desktop with a mouse | nothing else | QR cards in the hero, nav ("Get Pearmo" panel), Get Pearmo section and footer |
| `/get` | 307 → `/#beta` | 307 → `webAppUrl` |
| JSON-LD, llms.txt, legal web-app text | Android only | Android, iPhone, web |

How it's decided, and why:

- **Phone vs desktop is CSS**, never user-agent sniffing: the `desk:` and
  `touch:` variants in `globals.css` are
  `(min-width: 1024px) and (hover: hover) and (pointer: fine)` and its
  negation. The server HTML is identical for everyone, nothing can mismatch
  on hydration, and it works with JavaScript off.
- **The buttons are links, not install prompts.** `beforeinstallprompt` only
  fires for a page's own manifest, so www.pearmo.com cannot install the app;
  it installs from app.pearmo.com itself. Labels say "Open Pearmo" and "No
  app store needed". No App Store or Google Play badges (there are no
  listings, and both companies forbid badges without one). The Android APK is
  invite-only and never linked.
- **Every QR encodes `https://www.pearmo.com/get`** (`site.getUrl`, always the
  www production host), never app.pearmo.com, so printed codes outlive any
  change of destination. `/get` (`src/app/get/route.ts`) answers **307, not
  308**: browsers cache permanent redirects indefinitely, so a 308 could never
  be repointed. It also sends `Cache-Control: no-store`.
- **QR codes are generated on the server** as inline SVG (`QrCode.tsx`, the
  `qrcode` package): no external service (the CSP blocks it, and it would
  hand visitors' IPs to a third party). Dark modules on a white tile, 4-module
  quiet zone, error correction M, 160px or more except the small footer copy,
  and an accessible name containing the URL. `QrCode` is server-only; client
  components receive it as a prop.
- **The marketing site is not installable as the app**: the manifest's
  `display` is `browser`, and `appleWebApp.capable` is explicitly `false`
  (Next defaults it to `true` whenever `appleWebApp` is set).
- **Analytics**: one `track()` event per placement: `beta_form_hero`,
  `beta_form_nav`, `beta_form_menu`, `beta_form_section`, `beta_form_terms`,
  `beta_form_404`, `open_app_hero`, `open_app_nav`, `open_app_final`,
  `open_app_desktop_link`.

To see the not-launched state locally, set `webAppUrl: null`, and set it
back before committing.

## Design previews (temporary)

`/design/a`, `/design/b` and `/design/c` show the three candidate directions
on the real content, with a switcher bar: A "Same app, bigger screen", B
"After Dark", C "Duet" (the live design). They're `noindex`, not in the
sitemap, use plain links (no analytics events), and the A/B styles are scoped
under `.design-a` / `.design-b`. **Delete `src/app/design/` and
`src/designs/` together** once the comparison is over; nothing else imports
them.

## Layout

```
src/
  app/
    layout.tsx              root layout: next/font, metadata, Motion, analytics
    page.tsx                home page (renders components/HomePage.tsx)
    globals.css             Tailwind v4 @theme tokens, desk/touch variants, Lenis CSS
    get/route.ts            /get → 307 to the web app (or /#beta before launch)
    privacy/ terms/ beta-terms/ data-deletion/   legal pages (LegalDocument.tsx)
    not-found.tsx           custom 404
    opengraph-image.tsx     1200×630 share card (twitter-image reuses it)
    _og/                    TTF copies of the three fonts, for the share card
    sitemap.ts robots.ts    generated from src/lib/site.ts
    manifest.ts             manifest (display: browser)
    icon.svg favicon.ico apple-icon.png
    llms.txt/route.ts       plain-text summary for AI assistants
    design/a|b|c/           TEMPORARY design previews
  components/
    HomePage.tsx            section order for the home page
    sections/               one file per section
    AppLinks.tsx            Open Pearmo line, QR card, nav QR panel (server-only)
    BetaLink.tsx            Join the beta (client-safe)
    QrCode.tsx              server-side QR SVG
    TrackedLink.tsx         <a> that records one analytics event
    Logo.tsx                mark + wordmark
    motion/Motion.tsx       GSAP + Lenis
    ui/                     Compare slider, ScenePicture, StickySteps, FaqTabs, Icon, Tag, shared classes
    seo/JsonLd.tsx          structured data
  content/
    site-content.ts         ← all marketing copy lives here
    legal.ts                ← legal text (the site restyles it, never rewrites it)
  designs/                  TEMPORARY: directions A and B
  lib/
    site.ts                 domain, beta form, webAppUrl, getUrl
    logo-paths.ts           traced logo outlines
    radar.ts                personality-chart geometry (pure, build-time)
```

**Copy changes go in `src/content/`, not in components.** That separation is
also what makes a Sinhala or Tamil translation a contained job later: translate
the content module and move pages into an `app/[locale]/` segment.

## What the July 2026 rebuild changed

(History: that rebuild ported the original design faithfully. The October
2026 redesign above replaced the design.) The substantive changes:

**SEO**

- Full metadata: canonical, Open Graph, Twitter card, `hreflang` (`en-LK` +
  `x-default`), robots directives with `max-image-preview:large`.
- Generated 1200×630 OG image (~150 KB, under WhatsApp's 300 KB limit). The old
  site had none, so every share rendered as a bare link.
- JSON-LD: `Organization`, `WebSite`, `MobileApplication`, `FAQPage`,
  `BreadcrumbList`, `WebPage`. Nodes use stable `@id`s and cross-reference, so
  search engines resolve one entity rather than several.
- `sitemap.xml`, `robots.txt`, `llms.txt` — all generated from the content
  module, so they can't drift from the page.
- New FAQ section, and its `FAQPage` markup is built from the same source as
  the visible accordion.
- AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, …) are explicitly
  allowed — see the comment in `src/app/robots.ts` for why.

**Crawlability**

- The avatar marquee and personality radar are server-rendered. Previously both
  were injected by client-side `innerHTML`, so their content did not exist for
  crawlers that don't run JavaScript.
- Reveal-on-scroll no longer hides content when JS is unavailable: the
  `opacity: 0` state sits behind `@media (scripting: enabled)`.

**Performance**

- Fonts self-hosted via `next/font`, replacing two `preconnect`s and a
  render-blocking Google Fonts stylesheet.
- All images through `next/image` → AVIF/WebP with correct `sizes`. The 16
  avatar PNGs alone were ~4.8 MB of unoptimised source.
- Every route prerenders to static HTML.

**Accessibility**

- `prefers-reduced-motion` support across all 10+ animations. There was none.
- Working mobile navigation. The old site hid the nav links below 760px with no
  replacement.
- Skip link, visible focus rings, labelled form control with `aria-live` status,
  radar chart exposes its values via `<desc>`.

**Security** — CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy`, `X-Content-Type-Options` in `next.config.ts`.

## Open items

### 1. ~~The waitlist form does not store anything~~ — resolved

The fake email form is gone. Every "Join the beta" button links to the
Google Form in `site.betaFormUrl`.

### 2. Legal pages are unreviewed drafts

`/privacy` and `/terms` carry a visible draft banner. `src/content/legal.ts`
lists the specific gaps a lawyer or the team must close — the registered entity
name, the ID-verification vendor, biometric retention periods, and whether data
leaves Sri Lanka. Both are written against Sri Lanka's PDPA (Act No. 9 of 2022),
which treats the liveness biometric and national ID data as sensitive personal
data.

A live privacy policy URL is also required by Google Play and the App Store.

### 3. Search Console and Bing are not set up

Add the two verification env vars, then submit `https://pearmo.com/sitemap.xml`.
Use a **domain** property in Search Console (DNS-verified) rather than a URL
prefix, so it covers `www` and any subdomains.

### 4. ~~Hero video~~ — superseded

The hero is now the drag-to-compare café scene (`public/assets/scenes/`).

### 5. Sinhala / Tamil

Not built. Sri Lanka–first launch on a `.com` with English-only content is the
largest untapped SEO opportunity here, and machine-translated marketing copy
won't do — the headlines are idiomatic. Needs a native speaker. The content
module is structured so this is contained work when one is available.

## Assets

- `public/assets/scenes/{cafe,sofa}-{avatar,person}[-portrait].webp` — the
  avatar scenes (Higgsfield) and their real-person versions, cropped to one
  shared frame so the faces line up; that's what makes the compare slider
  read as the avatars becoming people. `-portrait` is the same pair cut to
  4:5 for phones (`ScenePicture.tsx` art-directs between them). The
  real-person images are AI-generated illustrations: never caption them with
  names, ages or match scores that suggest real members.
- `public/assets/app-*.webp` — real screenshots from the Flutter app. The
  status bar is cropped in CSS (`.shot-crop`). **Don't use**
  `app-shared-unlocks.webp` (shows removed unlocks), `app-showcase-overview.webp`
  or `app-profile-about.webp` (both show an emergency-contact field the app
  doesn't have).
- `public/assets/avatars/*.png` — 16 avatars (411×461 portraits, so render
  them with `object-cover object-top`). `strip.webp` is a 16-up square sprite
  of the same avatars, in `avatars` order, for the marquee.

  The full character set lives **outside this repo** at `D:\pearmo\3d-individual`
  (40 files — 20 animals × female/male). Only add a file here if a section
  actually renders it.

- `public/assets/design-concept-panels.jpg` — 3-panel design concept, unused.
