# Pearmo website — status, gaps and open decisions

**Last updated:** 30 July 2026
**Branch:** `design-sanuth` (7 commits ahead of `main`, 0 behind)
**Live site:** `https://www.pearmo.com` — still serving the old static
`legacy/index.html`. Nothing in this document is live yet.

This is the working record of the Next.js rebuild: what is finished, what is
blocked, and what was never started. Read §2 before merging — there is a
canonical-host defect that will misfire on day one if it isn't fixed.

---

## 1. Measured baseline

Lighthouse 12, mobile emulation, throttled 4G, production build served locally.
Two consecutive runs:

| Category           | Score      |
| ------------------ | ---------- |
| Performance        | **90–91**  |
| Accessibility      | **100**    |
| Best Practices     | **96** \*  |
| SEO                | **100**    |

| Metric                   | Value        | Verdict            |
| ------------------------ | ------------ | ------------------ |
| First Contentful Paint   | 1.0 s        | good               |
| Largest Contentful Paint | **3.5–3.6 s** | **needs work** (<2.5 s target) |
| Cumulative Layout Shift  | 0            | good               |
| Total Blocking Time      | 40–50 ms     | good               |
| Total page weight        | 476 KB       | acceptable         |

\* Best Practices is capped at 96 only because `_vercel/insights/script.js` and
`_vercel/speed-insights/script.js` 404 on localhost — Vercel serves them from
its own infrastructure. This resolves to 100 in production; it is not a bug.

**LCP is the one weak metric.** The LCP element is the hero image
(`hero-scene.jpg`) competing with ~120 KB of preloaded fonts and the JS bundle
on a throttled connection. Vercel's CDN will improve this, but see §4.1 for what
would actually fix it.

### Fixed during this audit

- **LCP 4.3 s → 3.5 s.** The hero was wrapped in scroll-reveal animations that
  start at `opacity: 0`, so the largest element didn't paint until hydration +
  IntersectionObserver + a transition delay had all completed. Above-the-fold
  content now uses `Reveal eager`, a CSS-only transform entrance that keeps
  `opacity: 1`. (The original static site had this same flaw.)
- **Accessibility 96 → 100.** The 13 px hero note used `--mute` `#6f6a80` over
  the pink decorative blob `#f4d3ec` — 3.79:1, below the WCAG AA 4.5:1 minimum
  for that size. Now `--ink-2`.
- **Fonts: 11 files / 302 KB → 8 files / 216 KB.** `Archivo` italic was being
  downloaded but never used; the only italic on the site is `.serif-accent`,
  which is Fraunces.
- Tried and reverted: `preload: false` on Fraunces and Azeret. It bought 0.1 s
  of LCP but cost 0.5 s of FCP and introduced CLS, because both render above the
  fold. Measurement is in the `layout.tsx` comments.

---

## 2. 🔴 Blocking — must be handled at merge

### 2.1 ~~The canonical host is wrong~~ — RESOLVED 30 July 2026

The DNS setup is correct and needs no change:

```
https://www.pearmo.com    → 200   ← canonical host
https://pearmo.com        → 308 → https://www.pearmo.com
```

One canonical host with the other redirecting to it is exactly right. The defect
was only in the code: `src/lib/site.ts` hardcoded the bare apex, so every
canonical, `hreflang`, `og:url`, `og:image`, sitemap `<loc>`, `robots.txt`
Host/Sitemap and JSON-LD `@id` pointed at a redirect instead of the live URL.

**Fixed.** `PRODUCTION_ORIGIN` is now `https://www.pearmo.com`. Verified in the
build output: 0 remaining references to the bare apex.

No env var needed — the default is correct. `NEXT_PUBLIC_SITE_URL` remains
available as an override. If the apex ever becomes primary in Vercel, change
that one constant.

### 2.2 Vercel build settings

The repo goes from "static folder, no build step" to a Next.js app. Change these
**before** merging (changing them does not trigger a deploy, so the old site
keeps serving until you merge):

| Setting          | From         | To                        |
| ---------------- | ------------ | ------------------------- |
| Framework Preset | Other / None | **Next.js**               |
| Build Command    | _(empty)_    | `npm run build` (default) |
| Output Directory | `.` / root   | _(empty)_                 |
| Install Command  | _(empty)_    | `npm install` (default)   |
| Node.js Version  | —            | 22.x or later             |

Rollback if it goes wrong: Vercel → Deployments → last good one → Instant
Rollback. Commit `50e6941` stays in history regardless.

### 2.3 ~~Two URLs that will start 404ing~~ — RESOLVED 30 July 2026

Both now 308 via `redirects()` in `next.config.ts`, verified against the
production build:

| URL             | Before                          | Now              |
| --------------- | ------------------------------- | ---------------- |
| `/index.html`   | 200 live → would 404 after merge | 308 → `/`        |
| `/favicon.ico`  | 404 before and after            | 308 → `/icon.svg` |

### 2.4 The waitlist still discards every email

`src/components/WaitlistForm.tsx` shows "🦊 You're on the list" without storing
anything. This mirrors what production has been doing since 25 July, which means
**every signup so far is gone**, and the success message shown to users is not
true.

Validation, honeypot, pending/error states and the `waitlist_submit` analytics
event are all already in place. Making it real means replacing the body of
`submitEmail` with a POST to a route handler. This is a deliberate temporary
state, not an oversight — but it should not survive the merge for long.

### 2.5 ~~Legal pages are unreviewed drafts~~ — mostly RESOLVED 4 August 2026

Rewritten against what the app **actually does**, verified line by line against
the Flutter source, the Supabase schema/RLS notes in `pearmo-flutter/CLAUDE.md`
and the edge functions. Two new documents added:

| Route | Purpose |
| ----- | ------- |
| `/privacy` | Rewritten. Several claims in the old draft were factually wrong |
| `/terms` | Corrected — removed consent gates that no longer exist |
| `/beta-terms` | **New.** The closed beta signup form links to this |
| `/data-deletion` | **New.** Required by Google Play, must work without the app |

Gaps closed:

- **Legal entity** — there isn't one. Neither Pearmo nor any studio name is
  registered, so the documents name the two founders personally as controllers
  rather than implying a company. Naming an unregistered entity as the operator
  would misrepresent who the user's agreement is with.
- **Verification vendor** — there is none. Liveness runs on-device via ML Kit
  and is never uploaded; selfies are reviewed by hand. The old draft's
  "specialist verification provider" was simply untrue.
- **Biometric retention** — until review, then deleted by the
  `cleanup-verification-media` scheduled job. Outcome kept, image not.
- **Cross-border transfer** — yes, data leaves Sri Lanka. Supabase project is
  in **Singapore (AWS ap-southeast-1)**, disclosed explicitly.
- **DPO** — none appointed, and the policy says so and explains why.
- **Pricing** — nothing costs money; no pricing terms are described.

Controllers named as **Sanuth Mandepa and Chanka Dewmina Herath** — everyday
names, not full legal names, deliberately: these documents are read by testers
who need to know who holds their data, and a recognisable name does that job.
Worth revisiting only if Pearmo is incorporated, or if the terms ever need to
be enforced against a named individual.

SMS provider confirmed as **Text.lk** — the only sub-processor in the chain
that is physically inside Sri Lanka, which is worth saying out loud in the
policy rather than burying.

**No studio or publisher name appears anywhere on the site**, by explicit
instruction (4 Aug 2026). `site.publisher` is `"Pearmo"`; it feeds
`authors`/`creator`/`publisher` metadata and the JSON-LD `Organization`. Do not
reintroduce one until something is actually registered.

`legalFacts` at the top of `src/content/legal.ts` now has no open `TODO`s.

Written against Sri Lanka's **Personal Data Protection Act No. 9 of 2022**,
which treats the liveness biometric and national ID data as sensitive personal
data. Still not lawyer-reviewed, and the draft banner stays until it is. A live
privacy policy URL is also **required** by Google Play and the App Store before
you can submit.

⚠️ **These four pages 404 in production until this branch is merged and
deployed** (§2.2). The beta signup form's consent checkboxes link to all of
them, so the deploy has to happen before that form goes out to anyone.

---

## 3. ✅ Done

### On-page SEO

- [x] Title template, meta description, keywords, category, `rating: adult`
- [x] `<link rel="canonical">` on every page _(pointing at the wrong host — §2.1)_
- [x] `hreflang` — `en-LK` + `x-default`, in both `<head>` and the sitemap
- [x] Open Graph: type, site_name, locale, url, title, description, image
- [x] Twitter `summary_large_image`
- [x] Generated **1200×630 OG image**, 150 KB — under WhatsApp's 300 KB limit.
      Rendered and visually verified. The old site had none, so every WhatsApp,
      Instagram and Facebook share rendered as a bare grey link.
- [x] Robots directives with `max-image-preview:large`, `max-snippet:-1`
- [x] `sitemap.xml`, `robots.txt`, `llms.txt` — all generated from the content
      module so they cannot drift from the page
- [x] **FAQ section, 10 questions** — new. Highest-ROI content addition for a
      pre-launch app, and what AI assistants quote
- [x] AI crawlers explicitly allowed (`GPTBot`, `ClaudeBot`, `PerplexityBot`,
      `OAI-SearchBot`, `Google-Extended`, `Applebot-Extended`, +10 more)
- [x] Custom 404 with `noindex`
- [x] Preview deploys auto-`noindex` + `Disallow: /` so they never compete with
      production

### Structured data

All four blocks validated as parsing; `FAQPage` question count matches the
visible accordion exactly.

- [x] `Organization` — with `areaServed`, `address`, `contactPoint`
- [x] `WebSite`
- [x] `MobileApplication` — 8 features, `contentRating: 18+`,
      `isFamilyFriendly: false`
- [x] `FAQPage` — 10 questions, generated from the same source as the UI
- [x] `BreadcrumbList` + `WebPage` on the legal pages
- [x] Stable cross-referencing `@id`s so search engines resolve one entity
- [x] Deliberately **omitted**: `AggregateRating`, `Offer`, `SearchAction` —
      fabricating review or price markup is a manual-action risk

### Crawlability

- [x] **Avatar marquee server-rendered** — was client-side `innerHTML`, so 24
      cards of names, traits and alt text did not exist for non-JS crawlers
- [x] **Personality radar server-rendered** — geometry computed at build time in
      `src/lib/radar.ts`; values also exposed via `<desc>`
- [x] Reveal-on-scroll no longer hides content without JS (`opacity: 0` sits
      behind `@media (scripting: enabled)`)
- [x] FAQ built on native `<details>` so answers are always in the DOM

### Performance

- [x] Fonts self-hosted via `next/font` — replaced 2 preconnects + a
      render-blocking Google Fonts stylesheet
- [x] Unused `Archivo` italic removed (−86 KB)
- [x] All images through `next/image` → AVIF/WebP with explicit `sizes`
- [x] Real intrinsic dimensions on every image → **CLS 0**
- [x] Hero image `priority` + `fetchPriority="high"`
- [x] Above-the-fold content uses the `eager` entrance (see §1)
- [x] All 12 routes prerender to static HTML
- [x] `Cache-Control: immutable` on `/assets/*`

### Accessibility

- [x] `prefers-reduced-motion` across all 10+ animations — there was **none**
- [x] Working mobile navigation — the old site hid nav links below 760 px with
      no replacement, on a mobile-majority audience
- [x] Skip link, visible focus rings
- [x] Labelled form control, `aria-live` status, `role="alert"` on error
- [x] Radar exposes values via `<desc>`; decorative elements `aria-hidden`
- [x] WCAG AA contrast verified by audit — **Lighthouse a11y 100**

### Security

- [x] CSP, HSTS (2 yr, preload), `X-Frame-Options: DENY`, `Referrer-Policy`,
      `Permissions-Policy`, `X-Content-Type-Options: nosniff`
- [x] `X-Powered-By` removed

### Analytics

- [x] Vercel Analytics + Speed Insights — cookieless, so no consent banner and
      no PDPA/GDPR exposure
- [x] `waitlist_submit` custom event

### Engineering

- [x] Next.js 16 App Router, TypeScript strict + `noUncheckedIndexedAccess`
- [x] Tailwind v4 with the original design tokens ported to `@theme`
- [x] All copy extracted to `src/content/` — the seam that makes translation a
      contained job
- [x] `npm run lint` / `npm run typecheck` scripts added; both clean
- [x] Legal pages with auto-generated table of contents

---

## 4. ⚠️ Not done — gaps and things we missed

### 4.1 Performance: LCP

LCP 3.5 s vs a 2.5 s target. Options, roughly in order of value:

- [ ] Shrink the hero image. `hero-scene.jpg` is 1376×768 and on a 360 px phone
      `sizes="92vw"` at DPR 2.6 resolves to a **1080 px-wide** file. Art-direct
      a smaller mobile crop, or drop `quality` to ~60 (the Ken Burns scale hides
      softness).
- [ ] The two step screenshots (~60 KB) download despite `loading="lazy"` —
      Chrome's lazy threshold is generous on slow connections.
- [ ] Consider inlining critical CSS (Lighthouse flags render-blocking CSS at 50).
- [ ] `Reduce unused JavaScript` / `legacy JavaScript` — Next's baseline
      polyfills. Little to do without ejecting.

### 4.2 Search Console and webmaster tools — **nothing set up**

This is the largest genuinely-missing piece. None of it exists yet.

- [ ] **Google Search Console.** Create a **Domain** property (DNS TXT record),
      not a URL-prefix property — a domain property covers `www`, the apex and
      every subdomain at once, which matters given §2.1.
- [ ] Submit `sitemap.xml`; request indexing for `/`, `/privacy`, `/terms`
- [ ] Turn on email alerts for coverage and Core Web Vitals
- [ ] Check the CWV report after ~28 days of field data
- [ ] **Bing Webmaster Tools** — one-click import from Search Console. Not
      optional-feeling: Bing's index feeds **ChatGPT search and Copilot**
- [ ] `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION`
      env vars — the meta tags are wired and omitted cleanly while unset
- [ ] **IndexNow** — not implemented. Instant recrawl pings for Bing/Yandex.
      Cheap; marginal for 3 URLs, worth it once a blog exists
- [ ] Run **Google Rich Results Test** and the **Schema Markup Validator**
      against the live URLs. I validated the JSON parses locally, but neither
      tool can reach `localhost`, so the markup is **unverified against Google**
- [ ] Validate the OG card in the **Facebook Sharing Debugger**, **X Card
      Validator**, and by actually pasting the link into WhatsApp

### 4.3 Analytics gaps

- [ ] Only one custom event exists. Worth adding: FAQ expansions (tells you what
      people actually worry about — unusually useful pre-launch), CTA clicks
      split by position, scroll depth
- [ ] **No UTM strategy.** Launch traffic will come from Instagram, WhatsApp and
      Reddit shares. Without UTM tags on the links you post, you cannot tell
      which channel produced signups
- [ ] GA4 deliberately skipped — buys funnels you don't need pre-launch and
      forces a cookie banner on a privacy-first brand. Easy to add later
- [ ] Meta / TikTok Pixel — only if you run paid ads. Both trigger consent
      obligations, so decide before installing
- [ ] No error monitoring (Sentry). Low value on a static site; **needed once the
      waitlist route handler is real**
- [ ] Speed Insights reports nothing until real traffic arrives

### 4.4 Off-page — the real ranking gap

**No on-page work substitutes for this.** A brand-new domain with zero inbound
links will not rank for competitive terms no matter how clean the markup is.

- [ ] `socialProfiles` in `src/lib/site.ts` is **empty**, so `Organization.sameAs`
      is omitted entirely. No social accounts means no entity consolidation and
      no brand knowledge panel. Instagram, Facebook and TikTok matter most for
      Sri Lanka
- [ ] Zero backlinks. Nowhere submitted: Product Hunt, BetaList, Crunchbase,
      LinkedIn company page, local tech press, r/SriLanka

#### The brand SERP is owned by other people (checked 30 July 2026)

A search for **"pearmo"** returns none of our pages. The results are:

| Result | What it is |
| ------ | ---------- |
| `wellfound.com/company/pearmo` | An existing **company** called PearMo, with a team page |
| `facebook.com/PearMoCommnications` | PearMo Communications — a marketing consultancy |
| `musescore.com/user/59392171` | A MuseScore user named Pearmo |
| `soundcloud.com/khyi-pearman` | A musician |
| `pinterest.com/pearmo` | A personal profile already holding the handle |

Two things follow:

- **Typing `pearmo` without `.com` is a search, not navigation.** No browser
  resolves a dotless word to a domain on a first visit. So all marketing copy,
  ads and bios must say **`pearmo.com`**, never just "pearmo".
- **Claiming social handles is now urgent.** Profiles are what fill a brand SERP,
  and they'd displace these unrelated results. The Pinterest handle is already
  gone; Instagram, Facebook and TikTok should be claimed immediately — this is a
  same-day task that only gets harder.

Separately, and outside SEO: **"PearMo" is an active company name.** That is a
commercial and trademark question for the team to look at, flagged here only
because it surfaced during this check.

### 4.5 Content and keywords

- [ ] Only **3 URLs**. You chose landing + legal, which caps organic ceiling
- [ ] No keyword research on record. Obvious targets: `dating app sri lanka`,
      `colombo dating app`, `anonymous dating app`, `dating apps in sri lanka`,
      `safe dating app sri lanka`
- [ ] No competitor analysis (Tinder/Bumble/Hinge presence in LK, local apps)
- [ ] Realistic organic wins not built: a dating-safety guide for Sri Lanka, a
      "how personality matching works" explainer, comparison pages
- [ ] FAQ is deliberately non-committal on price and launch date — **must be
      updated at launch**, in the page and in `llms.txt`
- [ ] **No Sinhala or Tamil.** Largest untapped opportunity: Sri-Lanka-first
      launch, English-only, on a `.com`. Needs a native speaker — the headlines
      are idiomatic and won't survive machine translation

### 4.6 App store / ASO — untouched

- [ ] No Play Store or App Store listing
- [ ] Play **Data Safety** declaration for biometric + government-ID data
- [ ] App Store **Privacy Nutrition Labels**
- [ ] ASO keywords, screenshots, preview video
- [ ] `MobileApplication` JSON-LD has no `installUrl`/`downloadUrl` yet
- [ ] `apple-itunes-app` Smart App Banner once iOS ships
- [ ] **Deep linking association files live on this website** and don't exist:
      `/.well-known/assetlinks.json` (Android App Links) and
      `/.well-known/apple-app-site-association` (iOS Universal Links)

### 4.7 Compliance

- [ ] Check whether the PDPA requires controller registration in Sri Lanka
- [ ] No cookie banner — correct today (cookieless analytics). Adding GA4 or any
      ad pixel changes that
- [ ] Age is declared in metadata but there is no 18+ interstitial. Probably fine
      pre-launch; revisit at launch
- [ ] No accessibility statement page

### 4.8 Engineering hygiene

- [ ] **No CI.** No GitHub Actions running `build` / `lint` / `typecheck` on PRs,
      so nothing stops a broken commit reaching `main`
- [ ] No `.env.example` documenting the three env vars
- [ ] No Dependabot/Renovate
- [ ] No uptime monitoring
- [ ] No Lighthouse CI budget to catch performance regressions
- [ ] `legacy/index.html` still in the repo. Intentional for reference — delete
      once you're confident in the rebuild

### 4.9 Known cosmetic issues

- [ ] The 🇱🇰 flag in the hero badge renders as the letters "LK" on Windows —
      Windows ships no regional-indicator flag glyphs. Was true of the original
      too. Use an SVG flag or drop it if it bothers you
- [ ] Editor lint suggests canonical Tailwind classes (`mt-[22px]` → `mt-5.5`).
      Left as arbitrary values deliberately, so they stay traceable to the
      original design's pixel values
- [ ] `sitemap.xml` emits `https://pearmo.com/` for the root while the canonical
      is `https://pearmo.com` — equivalent for a root URL, but will tidy up when
      §2.1 is resolved

---

## 5. Decisions

### Settled 30 July 2026

| Decision | Outcome |
| -------- | ------- |
| Canonical host | **`www.pearmo.com`.** DNS was already correct; the code was fixed. §2.1 |
| Avatar count in copy | **Number dropped entirely.** "24" could not be verified (old README said 48, the character folder holds 20), and it appeared in FAQ schema and `llms.txt` as a factual claim. Copy now reads "an animal avatar". `llms.txt` explicitly instructs assistants not to state a count |
| Waitlist backend | **Deferred.** Stays front-end only for now — see §2.4. Signups continue to be discarded |
| Social accounts | **None exist yet.** `socialProfiles` left empty and `Organization.sameAs` omitted, since a 404 in `sameAs` is worse than no `sameAs` |

### Still open

| # | Decision | Blocks |
| - | -------- | ------ |
| 1 | ~~**Legal facts**~~ — resolved 4 Aug 2026, see §2.5. One `TODO` left in `src/content/legal.ts`: the SMS provider name | Nothing structural; edit and redeploy |
| 1b | **Domain mailboxes.** `hello@` and `privacy@pearmo.com` never existed, so every reference now points at `pearmo.app@gmail.com` — including the JSON-LD `Organization.email` and the footer. Set up real mailboxes and change `site.contactEmail` / `site.privacyEmail` / `legalFacts.contactEmail` together | Brand credibility, not function |
| 2 | **Waitlist backend**, when you're ready to stop losing signups | §2.4 |
| 3 | **Launch date and pricing** — when decided, the FAQ and `llms.txt` must be updated together | §4.5 |
| 4 | **Social handles**, once accounts exist → `socialProfiles` in `src/lib/site.ts` | §4.4 |
| 5 | **Real avatar count**, if you ever want the number back in the copy | §4.5 |

---

## 6. Quick reference

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm start
npm run lint
npm run typecheck
```

Merging to `main` (clean fast-forward — 0 behind):

```bash
git checkout main && git pull
git merge --ff-only design-sanuth
git push origin main
```

`--ff-only` is deliberate: if it refuses, `main` moved and you should look before
merging.

**Where things live** — full map in `README.md`. The two files you'll touch most:

- `src/content/site-content.ts` — all marketing copy
- `src/lib/site.ts` — domain, canonicals, verification tokens, social profiles
