# Pearmo — pre-launch marketing site

Next.js 16 (App Router) + TypeScript + Tailwind v4. Deployed to Vercel at
**pearmo.com**.

Rebuilt from a single-file static `index.html`, which is archived at
[`legacy/index.html`](legacy/index.html) for reference. Nothing imports it.

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
| `NEXT_PUBLIC_SITE_URL`                 | Overrides the canonical origin. Defaults to `https://pearmo.com`.            |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification token → emits the `google-site-verification` meta tag. |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`   | Bing Webmaster Tools token → emits the `msvalidate.01` meta tag.             |

Preview deployments detect themselves via `VERCEL_ENV` and automatically
switch to `noindex` plus a `Disallow: /` robots.txt, so previews can never
compete with production in search results.

## Layout

```
src/
  app/
    layout.tsx              root layout: next/font, metadata, analytics
    page.tsx                homepage
    globals.css             Tailwind v4 @theme tokens + component classes
    privacy/, terms/        legal pages
    not-found.tsx           custom 404
    sitemap.ts robots.ts    generated from src/lib/site.ts
    manifest.ts             web app manifest
    icon.svg apple-icon.tsx favicon + iOS home-screen icon
    opengraph-image.tsx     generated 1200×630 social card
    twitter-image.tsx       reuses the OG card
    llms.txt/route.ts       plain-text summary for AI assistants
  components/
    sections/               one file per page section
    seo/JsonLd.tsx          structured data
    ui/                     Reveal, CountUp
  content/
    site-content.ts         ← all marketing copy lives here
    legal.ts                ← privacy + terms text
  lib/
    site.ts                 domain, canonicals, verification tokens
    radar.ts                personality-chart geometry (pure, build-time)
```

**Copy changes go in `src/content/`, not in components.** That separation is
also what makes a Sinhala or Tamil translation a contained job later: translate
the content module and move pages into an `app/[locale]/` segment.

## What the rebuild changed

Design is a faithful port — same tokens, type scale, animations and layout.
The substantive changes:

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

### 1. The waitlist form does not store anything

`src/components/WaitlistForm.tsx` shows a success message without persisting
the address. This matches what production does today — the original page had
the same behaviour — and it means **every waitlist signup since launch has been
discarded**. The success message is not truthful and this should not stay in
production.

Validation, honeypot, pending/error states and the analytics event are all
already in place. Wiring it up means replacing the body of `submitEmail` with a
POST to a route handler.

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

### 4. Hero video

The hero uses a Ken Burns + sheen treatment over `hero-scene.jpg`. The animated
version was never generated — the Higgsfield account was on the free plan and
every image-to-video model was plan-gated. To finish it: animate job
`333fd2f9-324a-4ea6-b864-b038eee2f7de` (subtle loop — steam, blinking, bokeh
shimmer, slow push-in), save as `public/assets/hero-scene.mp4`, and swap the
`<Image>` in `src/components/sections/Hero.tsx` for a
`<video autoPlay muted loop playsInline>`.

### 5. Sinhala / Tamil

Not built. Sri Lanka–first launch on a `.com` with English-only content is the
largest untapped SEO opportunity here, and machine-translated marketing copy
won't do — the headlines are idiomatic. Needs a native speaker. The content
module is structured so this is contained work when one is available.

## Assets

- `public/assets/app-*.webp` — real screenshots from the Flutter MVP, shown
  inside CSS phone frames. The frames crop the Android status/nav bars with
  negative margins (see `.phone-frame` in `globals.css`).
- `public/assets/hero-scene.jpg`, `icebreaker-scene.jpg` — AI scenes generated
  with Higgsfield (nano banana pro) using `avatars/fox-f.png` +
  `avatars/wolf-m.png` as character references. Job IDs:
  - hero: `333fd2f9-324a-4ea6-b864-b038eee2f7de`
  - icebreaker: `1dfaa890-acc4-4a71-8385-1be2dc8e3b7a`
- `public/assets/avatars/*.png` — 16 of the 48 app avatars, copied from
  `E:\Chanka\Pearmo documents\Animals -avatars\3d-individual`.
- `public/assets/design-concept-panels.jpg` — 3-panel design concept, unused.
