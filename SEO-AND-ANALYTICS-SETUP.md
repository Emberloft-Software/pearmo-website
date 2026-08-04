# Search, analytics and security — full setup guide

**For:** `https://www.pearmo.com` (Next.js 16 App Router, deployed on Vercel)
**Written:** 1 August 2026
**Companion to:** `PROJECT-STATUS.md` §4.2–§4.4, which lists these as the
largest remaining gaps. This document is the how-to for closing them.

---

## Read this first

The website's **on-page** technical SEO is already done and scores 100/100 in
Lighthouse. Canonicals, hreflang, structured data, Open Graph, `robots.txt`,
`sitemap.xml`, `llms.txt`, security headers — all shipped. **Do not redo any of
it.**

What does not exist is the **external layer**: the site has never been
registered with a single search engine, so nothing is monitoring it, and
indexing is left entirely to chance discovery.

That gives a clean split:

| Layer | State | This guide |
| ----- | ----- | ---------- |
| Site deployed | ✅ Verified live 1 Aug 2026 | Phase 0 |
| On-page technical SEO | ✅ Done, verified | Phase 3 verifies it against Google's live tools |
| Search engine registration | ❌ Nothing | Phase 1–2 |
| Analytics | ⚠️ Installed, may not be switched on | Phase 4 |
| Security | ✅ Headers done · ❌ Domain/email layer missing | Phase 5 |
| Off-page authority | ❌ Nothing | Phase 7 — **this is what actually decides ranking** |

One expectation to set honestly up front, because it governs how you should
spend your time:

> **Perfect technical SEO does not make a new domain rank.** Everything in
> Phases 1–6 is necessary hygiene — it makes you *eligible* to rank and lets
> you *measure* what happens. It is Phase 7 that decides whether you actually
> do. A brand-new `.com` with 3 URLs and zero inbound links will not outrank
> Tinder for `dating app sri lanka` because its JSON-LD is tidy.

---

## Phase 0 — Prerequisite: the new site must actually be live

> ✅ **Verified live on 1 August 2026 — this phase is already done.** The
> Next.js build is serving production: `sitemap.xml` returns 200, the security
> headers ship, and `pearmo.com` 308s to `www.pearmo.com`. `PROJECT-STATUS.md`
> is out of date where it says production still serves `legacy/index.html`.
>
> **Skip to Phase 1.** The checks below are kept for re-verification after any
> future deploy that changes hosting or the canonical host.

**Nothing below works until this is true.** Confirm the site is deployed before
spending an hour in Search Console registering a site that doesn't serve the
markup you think it does.

Run these three checks:

```powershell
# 1. Is the sitemap live? (Only the Next.js build emits this.)
curl.exe -sI https://www.pearmo.com/sitemap.xml | Select-String "HTTP/"

# 2. Is robots.txt generated, and does it point at the sitemap?
curl.exe -s https://www.pearmo.com/robots.txt

# 3. Do the security headers ship? (Old static site had none.)
curl.exe -sI https://www.pearmo.com/ | Select-String "content-security-policy|strict-transport"
```

**Expected:** `200` for the sitemap, a `robots.txt` listing `Sitemap:
https://www.pearmo.com/sitemap.xml` plus the AI crawler allowances, and both
security headers present.

If the sitemap 404s, the old site is still being served — go finish
`PROJECT-STATUS.md` §2.2 (Vercel build settings) before continuing.

Also confirm the host behaviour is intact, because every canonical depends on
it:

```powershell
curl.exe -sI https://pearmo.com/ | Select-String "HTTP/|location"
# Expected: 308, location: https://www.pearmo.com/
```

---

## Phase 1 — Google Search Console

**Time:** ~20 minutes, plus DNS propagation wait.
**Priority:** 🔴 Do this first. It is the single highest-value item in this
document.

Search Console is not analytics — it is the diagnostic console between you and
Google's crawler. It is the only place that tells you which pages are indexed,
which are excluded and why, what queries you appear for, and whether your
structured data was accepted.

### 1.1 Choose the right property type — this matters

Search Console offers two property types, and the choice is not cosmetic:

| Type | Verified by | Covers |
| ---- | ----------- | ------ |
| **Domain** ← use this | DNS TXT record | `pearmo.com`, `www.pearmo.com`, every subdomain, http **and** https — all in one property |
| URL-prefix | Meta tag, HTML file, GA, DNS | Only the exact prefix, e.g. `https://www.pearmo.com/` |

**Use a Domain property.** You have traffic on two hosts (`pearmo.com` 308s to
`www.pearmo.com`). A URL-prefix property on `https://www.pearmo.com/` would
show you nothing about requests hitting the apex, including any redirect
problems — which is exactly the class of bug §2.1 of the status doc was about.

> **Important clarification about the env vars.** The
> `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` variable wired into
> [layout.tsx:131](src/app/layout.tsx#L131) emits a `<meta
> name="google-site-verification">` tag. That tag **only verifies a URL-prefix
> property.** A Domain property is verified by DNS and ignores the meta tag
> entirely.
>
> So if you follow the recommendation here, that env var stays **unset — and
> that is correct, not an unfinished task.** `PROJECT-STATUS.md` §4.2 lists the
> Domain property and the env var side by side, which reads as if you need
> both. You don't. Pick one; pick Domain.

### 1.2 Create the property

1. Go to <https://search.google.com/search-console> and sign in with the Google
   account that should own this long-term. **Use a company account, not a
   personal one** — migrating ownership later is tedious. If a shared workspace has a
   Google Workspace account, use it.
2. Property selector (top-left) → **Add property**.
3. Choose the **Domain** box (left-hand option).
4. Enter exactly:
   ```
   pearmo.com
   ```
   No `https://`, no `www.`, no trailing slash. The domain property expands to
   cover those automatically.
5. Google shows a TXT record like:
   ```
   google-site-verification=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   Copy the whole string.

### 1.3 Add the DNS record

Where you do this depends on who runs DNS for `pearmo.com`. Check first:

```powershell
nslookup -type=NS pearmo.com
```

- **If nameservers say `vercel-dns.com`** → Vercel Dashboard → your project →
  **Settings → Domains** → `pearmo.com` → **Manage DNS Records** → Add:
  - Type: `TXT`
  - Name: `@` (or leave blank — this means the root domain)
  - Value: the full `google-site-verification=...` string
  - TTL: default (60)

- **If nameservers say your registrar** (Namecheap, GoDaddy, Cloudflare, etc.)
  → add the same TXT record in that registrar's DNS panel.

⚠️ **Two mistakes that waste an afternoon here:**
- Putting the record on `www.pearmo.com` instead of the root. A Domain property
  for `pearmo.com` reads the TXT record at the **root**.
- Some panels auto-append the domain to the Name field. If you type
  `pearmo.com` as the name and the panel makes it `pearmo.com.pearmo.com`,
  verification fails. Use `@` or blank.

### 1.4 Verify

DNS propagation is usually 5–30 minutes, occasionally a few hours. Confirm the
record is visible before clicking Verify:

```powershell
nslookup -type=TXT pearmo.com
# Look for the google-site-verification string in the output
```

Then back in Search Console → **Verify**. If it fails, wait and retry — the
property stays pending, nothing is lost.

**Do not remove the TXT record afterwards.** Google re-checks it periodically
and will unverify the property if it disappears.

### 1.5 Submit the sitemap

Once verified:

1. Left sidebar → **Sitemaps**.
2. Under "Add a new sitemap", enter just:
   ```
   sitemap.xml
   ```
   (The domain prefix is pre-filled. If it asks for a full URL, use
   `https://www.pearmo.com/sitemap.xml`.)
3. **Submit.**

Status will read "Couldn't fetch" for a short while — that is normal and
usually resolves within hours. It should settle on **Success · 3 discovered
URLs**.

> If it reports fewer than 3 URLs, or 0, the deploy in Phase 0 didn't take.

### 1.6 Request indexing for the three URLs

Sitemaps are a hint. For a 3-page site, explicitly push each one:

1. Top search bar ("Inspect any URL") → paste `https://www.pearmo.com/` →
   Enter.
2. Wait for the fetch → click **Request indexing** → wait for the test to
   finish (~1 min).
3. Repeat for:
   - `https://www.pearmo.com/privacy`
   - `https://www.pearmo.com/terms`

There is a daily quota (~10–12 requests), which is ample for three URLs.

Indexing typically takes **2 days to 2 weeks** for a new domain. It is not
instant, and there is no way to make it instant. Don't re-request daily; it
does not help.

### 1.7 Turn on alerts and add the team

- **Settings → Users and permissions → Add user.** Add anyone who needs it as
  *Full* (can act on the property) or *Restricted* (read-only). Keep at least
  two owners so you are not locked out if one account is lost.
- **Settings → (top-right gear) → Search Console preferences → Email
  notifications** → ensure enabled. Google emails you about manual actions,
  indexing collapses and Core Web Vitals failures. These are the emails you
  actually want.

### 1.8 What to check, and when

Nothing useful appears immediately. Realistic timeline:

| When | Report | What you're looking for |
| ---- | ------ | ----------------------- |
| Day 2–14 | **Pages** (Indexing) | All 3 URLs move to "Indexed". Anything under "Not indexed" — read the reason |
| Day 3+ | **Sitemaps** | Status = Success, 3 URLs |
| Week 2+ | **Performance** | First impressions for `pearmo.com`, `pearmo app` etc. |
| Week 4+ | **Core Web Vitals** | Needs ~28 days of field data. This is where the LCP problem (§4.1) shows up as real-user data, not lab data |
| Ongoing | **Enhancements** | Structured data Google actually parsed |
| Ongoing | **Security & Manual Actions** | Should read "No issues detected". If it ever doesn't, drop everything |

---

## Phase 2 — Bing Webmaster Tools

**Time:** ~10 minutes.
**Priority:** 🔴 High — and higher than its search share suggests.

Bing's index is ~3–5% of search in most markets, which sounds skippable. It is
not, because of what else reads from it:

- **ChatGPT search** is Bing-backed.
- **Microsoft Copilot** is Bing-backed.
- **DuckDuckGo** sources its results primarily from Bing.
- **Yahoo** is Bing-backed.

For a pre-launch product whose whole discovery story is *"someone asks an
assistant whether there's a dating app in Sri Lanka without photos"* — a story
this codebase deliberately optimised for with `llms.txt` and an explicit AI
crawler allowlist — being absent from Bing's index undercuts the strategy.

### 2.1 Set it up by importing from Google

1. Go to <https://www.bing.com/webmasters> and sign in (Microsoft, Google or
   Facebook account).
2. Choose **Import from Google Search Console**.
3. Authorise, pick the `pearmo.com` property, import.

This carries verification across, so you skip DNS entirely, and it imports your
sitemap submission too.

### 2.2 Or verify manually

If the import fails or you'd rather keep the two separate — add site
`https://www.pearmo.com`, then verify by any of:

- **Meta tag** — Bing gives `<meta name="msvalidate.01" content="..." />`. This
  path is already wired: set `NEXT_PUBLIC_BING_SITE_VERIFICATION` to the
  content value in Vercel → Settings → Environment Variables (all three
  environments), then **redeploy** — the value is baked in at build time.
- **DNS TXT / CNAME** — same panel as Phase 1.3.
- **XML file** — drop `BingSiteAuth.xml` into [public/](public/).

### 2.3 Submit the sitemap

**Sitemaps → Submit sitemap** → `https://www.pearmo.com/sitemap.xml`
(Bing wants the full URL here, unlike Google.)

### 2.4 Worth clicking while you're in there

- **URL Inspection → Request indexing** for the three URLs, same as Google.
- **SEO Reports** — Bing runs its own on-page audit for free. Expect it to be
  clean, but it occasionally catches things Lighthouse doesn't.
- **Site Explorer → Backlinks** — Bing shows backlink data free, which Google
  does not. This is a genuinely useful free tool for tracking Phase 7.

---

## Phase 3 — Verify what you already shipped

**Time:** ~15 minutes.
**Priority:** 🟠 Do it once, right after the site is live.

`PROJECT-STATUS.md` §4.2 is explicit that the structured data was only
validated as *parsing locally* — no external tool could reach `localhost`, so
none of it has been checked by Google itself. Close that now.

### 3.1 Structured data

| Tool | URL | What to expect |
| ---- | --- | -------------- |
| **Google Rich Results Test** | <https://search.google.com/test/rich-results> | Detects eligible rich-result types |
| **Schema Markup Validator** | <https://validator.schema.org> | Validates *all* schema.org, not just rich-result types |

Test `https://www.pearmo.com/`, `/privacy` and `/terms`.

**How to read the results — this trips people up:**

The Rich Results Test only reports types Google renders as rich results. Your
`Organization`, `WebSite` and `MobileApplication` blocks are valid and useful
for **entity understanding**, but Rich Results Test may report *"No items
detected"* for them. That is **not an error.** Use the Schema Markup Validator
to confirm those parse — it checks everything.

> **Set expectations on the FAQ markup.** In August 2023 Google restricted
> FAQ rich results to well-known government and health sites. Your `FAQPage`
> markup is correct, and it still earns its place — it feeds AI answer engines,
> `llms.txt` consumers and entity understanding, which is precisely the channel
> that matters pre-launch. But **it will not render an FAQ accordion in Google's
> results** for a dating app. Don't spend time debugging its absence.

Fix anything reported as an **Error**. Warnings are usually optional fields
(e.g. a missing `image` on Organization) — judgement call, most are safe to
ignore pre-launch.

### 3.2 Social share cards

The old site had no OG image at all, so every share rendered as a grey link.
The new 1200×630 card exists — confirm each platform actually picks it up:

| Platform | Tool |
| -------- | ---- |
| Facebook / Instagram | <https://developers.facebook.com/tools/debug/> → paste URL → **Scrape Again** |
| LinkedIn | <https://www.linkedin.com/post-inspector/> |
| WhatsApp | No tool — paste the link into a chat with yourself. **This is the one that matters most for Sri Lanka.** |
| X / Twitter | X retired the standalone Card Validator. Draft a post with the link (don't send) and check the preview |

Facebook and LinkedIn cache aggressively. If you ever change the OG image,
re-scrape in the debugger or the old one persists for weeks.

### 3.3 Favicon — fixed 1 August 2026

Google shows a favicon next to every result on mobile, so this is a small but
real SERP surface.

`/favicon.ico` used to be a **308 redirect to `/icon.svg`**. That has been
replaced with a real multi-resolution ICO at
[src/app/favicon.ico](src/app/favicon.ico) (16/32/48 px, generated from
`icon.svg`), and the redirect has been deleted from `next.config.ts`. Both
`<link rel="icon">` tags are now emitted, so modern browsers still prefer the
vector.

After the next deploy, confirm:

```powershell
curl.exe -sI https://www.pearmo.com/favicon.ico | Select-String "HTTP/|content-type"
# Expected: HTTP/1.1 200 OK  /  content-type: image/x-icon
```

If it still reports 308, your browser or an intermediary cached the old
permanent redirect — test in a private window or with `curl` as above.

### 3.4 Baseline the scores

Run <https://pagespeed.web.dev> against the live URL, mobile and desktop, and
**save the result**. This is your before-picture; the field-data section stays
empty until you have real traffic, which is what makes Phase 1's Core Web
Vitals report worth checking at day 28.

Expect mobile Performance in the high 80s / low 90s, with **LCP as the weak
metric** (~3.5 s vs the 2.5 s "good" threshold) — a known, documented issue
with a fix list in `PROJECT-STATUS.md` §4.1. Core Web Vitals *is* a ranking
signal, so this is worth returning to, but it is a tiebreaker, not the reason a
new site doesn't rank.

---

## Phase 4 — Analytics

**Time:** ~15 minutes for 4.1, longer if you add events.
**Priority:** 🟠 4.1 is a 2-minute fix that may be silently costing you all data.

### 4.1 Confirm Vercel Analytics is actually switched on ⚠️

`@vercel/analytics` and `@vercel/speed-insights` are installed and both
components are mounted in [layout.tsx:185-186](src/app/layout.tsx#L185-L186).
**That is only half the setup.** Each product must also be enabled on the
Vercel *project*, or the scripts no-op and you collect nothing — with no error
and no warning anywhere.

1. Vercel Dashboard → `pearmo-website` → **Analytics** tab → **Enable** if
   prompted.
2. Same for the **Speed Insights** tab.
3. Load `https://www.pearmo.com` in a browser, then check DevTools → Network
   for a request to `/_vercel/insights/view`. If it's there, data is flowing.

Both are free at the Hobby tier with a monthly event cap, and both are
**cookieless** — which is why this site ships no consent banner and has no
PDPA/GDPR consent exposure. Preserve that property deliberately (see 4.4).

### 4.2 Add the custom events worth having

Only one event exists today (`waitlist_submit`). Pre-launch, the highest-value
addition is **FAQ expansions** — which questions people open tells you what
they're actually worried about, and for a privacy-sensitive dating product in a
conservative market that is genuinely useful product research, not vanity data.

```tsx
// src/components/sections/Faq.tsx
import { track } from "@vercel/analytics";

// on the <details> element:
<details
  onToggle={(e) => {
    if (e.currentTarget.open) track("faq_open", { question: item.q });
  }}
>
```

Also worth adding, in rough priority order:

| Event | Why |
| ----- | --- |
| `faq_open` | What people worry about. Highest signal pre-launch |
| `cta_click` with a `position` property (`hero` / `footer` / `nav`) | Which CTA placement converts. Cheap to add, directly actionable |
| `waitlist_error` | You currently cannot see failed signups at all |

Skip scroll-depth tracking for now — on a single-page site it mostly measures
page length.

### 4.3 Set up UTM tags before launch, not after

This is flagged in §4.3 of the status doc and it is the one analytics gap that
is **unrecoverable if you skip it**. Traffic will arrive from Instagram bios,
WhatsApp forwards and Reddit. Without UTM parameters on the links you post, all
of it collapses into "Direct" and you will never know which channel produced
signups. You cannot backfill this.

Fix the scheme now and use it on every link you ever post:

```
https://www.pearmo.com/?utm_source=instagram&utm_medium=social&utm_campaign=prelaunch
https://www.pearmo.com/?utm_source=reddit&utm_medium=social&utm_campaign=prelaunch&utm_content=r-srilanka
https://www.pearmo.com/?utm_source=whatsapp&utm_medium=referral&utm_campaign=prelaunch
https://www.pearmo.com/?utm_source=producthunt&utm_medium=referral&utm_campaign=launch
```

Conventions that save pain later: lowercase everything (UTM values are
case-sensitive — `Instagram` and `instagram` become two rows), keep
`utm_source` to the platform, `utm_medium` to the channel type, and one
`utm_campaign` per push.

**These do not harm SEO.** Your canonical tag is self-referencing and
parameter-free, so Google consolidates all UTM variants back to the clean URL.

### 4.4 GA4 — the deliberate omission, and what changes if you add it

GA4 was skipped on purpose. That call still looks right pre-launch: it buys
funnel analysis you don't need for a 3-page waitlist site, and it costs you the
cookieless property that currently lets you ship no consent banner — on a
brand whose entire pitch is privacy. Vercel Analytics answers the only
questions you have right now (how many, from where, how many converted).

If you add it later anyway — most likely once you're running paid ads and need
conversion tracking — **three things must change together**, and missing the
third is the classic silent failure:

1. Install via `@next/third-parties/google` (the maintained Next.js
   integration), not a hand-rolled `<script>`.
2. Add a **cookie consent banner**. GA4 sets cookies; under Sri Lanka's PDPA and
   GDPR (for any EU visitor) that requires consent before the script loads.
3. **Update the CSP in [next.config.ts:17-30](next.config.ts#L17-L30)** — the
   current policy is `default-src 'self'` and will silently block Google's
   domains. You need to add:
   ```
   script-src  … https://www.googletagmanager.com
   connect-src … https://*.google-analytics.com https://*.googletagmanager.com
   img-src     … https://*.google-analytics.com https://*.googletagmanager.com
   ```
   Without this, GA4 loads nothing and reports zero, and the only trace is a
   CSP violation in the browser console.

The same three-step applies to a Meta Pixel or TikTok Pixel. Decide *before*
installing, not after.

### 4.5 Error monitoring — defer, but know the trigger

Sentry is low value on a fully static marketing site. **The trigger to add it
is when the waitlist gets a real backend** (`PROJECT-STATUS.md` §2.4). At that
point a failing route handler silently discards signups, which is exactly the
failure you cannot afford twice. Note that Sentry also requires a CSP
`connect-src` entry.

---

## Phase 5 — Security

**Time:** ~30 minutes for 5.1–5.3, longer for email auth.
**Priority:** 🟠 5.3 (email auth) is the one genuine gap and is more urgent
than it looks.

The **HTTP header layer is already done and done well** — CSP, HSTS with
`preload`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`,
`nosniff`, `X-Powered-By` removed. What's missing is everything at the *domain*
level, which headers can't cover.

### 5.1 Verify the headers externally

| Tool | URL | Expected |
| ---- | --- | -------- |
| **Security Headers** | <https://securityheaders.com> | **A** or **A+** |
| **Mozilla Observatory** | <https://developer.mozilla.org/en-US/observatory> | A/A+ |
| **SSL Labs** | <https://www.ssllabs.com/ssltest/> | **A** (Vercel manages TLS) |

If Security Headers gives an A rather than A+, the reason will be the
`'unsafe-inline'`/`'unsafe-eval'` in `script-src`. That is a **documented,
deliberate trade-off** — the comment at the top of
[next.config.ts:3-16](next.config.ts#L3-L16) explains it: a nonce-based CSP
requires middleware, which makes every route dynamic and throws away static
rendering, for a site with no user input. Leave it. Revisit if the waitlist
gains a real backend.

### 5.2 Submit to the HSTS preload list

Your header already meets every requirement (`max-age=63072000`,
`includeSubDomains`, `preload`), but **the header alone does nothing** — you
must submit the domain. Preloading bakes HTTPS-only for `pearmo.com` directly
into browsers, protecting even a user's very first visit from an SSL-strip
downgrade.

Submit at <https://hstspreload.org> — enter `pearmo.com`, confirm the checks
pass, submit. Inclusion takes weeks to months as browsers ship new versions.

> ⚠️ **Understand this before you click.** Preloading is **slow and painful to
> reverse** — removal requires a separate request and another full browser
> release cycle. `includeSubDomains` means **every** subdomain, forever, must
> serve valid HTTPS. If you might later want `staging.pearmo.com` or a
> third-party service on a subdomain that doesn't do HTTPS cleanly, it will
> simply be unreachable. For a Vercel-hosted site this is almost always fine —
> just make the decision knowingly.

### 5.3 Email authentication — SPF, DKIM, DMARC 🔴

**This is the real security gap, and it isn't in the status doc.**

The site publishes `hello@pearmo.com` and `privacy@pearmo.com`, and the whole
point of the waitlist is to email those people at launch. Without email
authentication records on the domain:

1. **Anyone can spoof `hello@pearmo.com`.** For a dating brand whose pitch is
   trust and verification, a phishing campaign wearing your domain is a
   brand-ending problem, not an IT annoyance.
2. **Your launch email lands in spam.** Gmail and Yahoo have required
   authentication for bulk senders since 2024. An unauthenticated blast to your
   whole waitlist will be filtered — after you spent months collecting it.

Add three DNS records (same panel as Phase 1.3):

**SPF** — declares who may send as your domain. One TXT record at the root,
and only one; two SPF records is itself a failure.
```
Type: TXT   Name: @
Value: v=spf1 include:_spf.google.com ~all
```
Replace `include:_spf.google.com` with your actual provider's value — Google
Workspace as shown, or `include:sendgrid.net`, `include:mailgun.org`,
`include:amazonses.com` for the sending service you use.

**DKIM** — cryptographically signs your mail. The record is generated by your
email provider (Google Workspace: Admin → Apps → Google Workspace → Gmail →
Authenticate email → Generate). It gives you a selector and a key to publish.

**DMARC** — tells receivers what to do when SPF/DKIM fail, and sends you
reports.
```
Type: TXT   Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@pearmo.com; fo=1
```
**Start at `p=none`.** It enforces nothing but sends you reports so you can see
who is sending as you. After a few weeks of clean reports, tighten to
`p=quarantine`, then `p=reject`. Jumping straight to `p=reject` will silently
kill legitimate mail you forgot about.

> **If you are not sending email from the domain at all yet**, publish
> lock-down records anyway — they cost nothing and block spoofing today:
> `v=spf1 -all` and `v=DMARC1; p=reject;`. Just remember to relax them *before*
> you send the launch email.

Verify everything at <https://www.mail-tester.com> or
<https://dmarcian.com/dmarc-inspector/>.

### 5.4 CAA record

A CAA record restricts which certificate authorities may issue certificates for
your domain, blocking mis-issuance.

```
Type: CAA   Name: @   Flags: 0   Tag: issue   Value: letsencrypt.org
```

⚠️ **Check your current issuer before adding this.** Vercel issues via Let's
Encrypt today, but if that ever changes — or if any other service issues a cert
on a subdomain — a too-narrow CAA record **breaks certificate renewal**, which
takes the site down. Confirm the issuer first:

```powershell
curl.exe -sv https://www.pearmo.com 2>&1 | Select-String "issuer"
```

This one is genuinely optional. Skip it if you'd rather not own the failure
mode.

### 5.5 `security.txt`

RFC 9116. A standard place for a security researcher to find out where to
report a vulnerability instead of tweeting it. Cheap and it signals competence.

Create [public/.well-known/security.txt](public/.well-known/security.txt):

```
Contact: mailto:security@pearmo.com
Expires: 2027-08-01T00:00:00.000Z
Preferred-Languages: en
Canonical: https://www.pearmo.com/.well-known/security.txt
```

The `Expires` field is **required** by the RFC. Set a reminder to refresh it —
an expired `security.txt` is treated as invalid. Make sure `security@` actually
routes somewhere a human reads.

### 5.6 Dependency and CI hygiene

Both are `PROJECT-STATUS.md` §4.8 items and both are small:

**Dependabot** — create `.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

**CI** — a GitHub Actions workflow running `npm ci`, `npm run lint`, `npm run
typecheck`, `npm run build` on every PR. Right now nothing stops a broken
commit reaching `main`, and `main` deploys to production.

---

## Phase 6 — "All search engines": the honest map

**Time:** ~0 minutes. That's the point.

The instinct is to hunt for a submission form for every search engine. Almost
none of them have one, and almost none of them need one — the modern search
landscape is two indexes wearing many faces.

| Engine / surface | Where its results come from | Action needed |
| ---------------- | --------------------------- | ------------- |
| **Google** | Own crawler | ✅ Phase 1 |
| **Bing** | Own crawler | ✅ Phase 2 |
| DuckDuckGo | Primarily Bing | Nothing — Phase 2 covers it |
| Yahoo | Bing | Nothing |
| Ecosia, Startpage, Qwant | Google / Bing | Nothing |
| Brave Search | Own index, crawls independently | Nothing to submit; just stay crawlable |
| **ChatGPT search** | Bing + `OAI-SearchBot` | ✅ Phase 2 + robots.txt (already allowed) |
| **Microsoft Copilot** | Bing | ✅ Phase 2 |
| **Perplexity** | Own crawler (`PerplexityBot`) | ✅ Already allowed |
| **Claude** | `ClaudeBot` / `Claude-SearchBot` + Brave | ✅ Already allowed |
| **Google AI Overviews** | Google's index | ✅ Phase 1 |
| Apple Spotlight / Siri | `Applebot` | ✅ Already allowed |
| Yandex | Own crawler | Optional — negligible Sri Lanka traffic |
| Baidu | Own crawler | Not applicable — needs an ICP licence and China hosting |
| Naver, Seznam | Own crawlers | Not applicable — Korea / Czech markets |

**So: Google + Bing is the whole job.** Everything else either follows from
those two or isn't relevant to a Sri Lanka launch.

Two things this codebase already did that pay off in the AI rows above, and
which most sites get wrong:

- [src/app/robots.ts:16-33](src/app/robots.ts#L16-L33) explicitly **allows** 16
  AI crawlers. The common default is to block them; blocking would make the site
  invisible in exactly the place early adopters now look.
- [src/app/llms.txt/route.ts](src/app/llms.txt/route.ts) gives assistants a
  clean factual summary generated from the same content module as the page, so
  it cannot drift — and it explicitly refuses to state unverified numbers.

### IndexNow — worth it later, not now

IndexNow pushes instant recrawl pings to Bing, Yandex and Seznam (**not**
Google, which doesn't participate). Setup: generate a key in Bing Webmaster
Tools → **IndexNow**, host it at `public/<key>.txt`, then ping
`https://api.indexnow.org/indexnow?url=...&key=...` on publish.

For 3 URLs that almost never change, this is **not worth building yet** — the
status doc reaches the same conclusion. Revisit when you add a blog, where new
posts benefit from same-hour indexing.

---

## Phase 7 — The part that actually determines ranking

**Time:** ongoing, and mostly not an engineering task.
**Priority:** 🔴 Highest actual impact of anything in this document.

Phases 1–6 make you *eligible* and *measurable*. None of them make you rank.
Ranking for a new domain comes down to entity clarity, links and content — and
right now all three are at zero.

### 7.1 Claim the social handles — this week 🔴

`PROJECT-STATUS.md` §4.4 documents a real problem: a search for **"pearmo"**
returns *none* of your pages. The brand SERP is occupied by an unrelated
company (PearMo Communications), a MuseScore user, a musician, and a Pinterest
account that already took the handle.

Two consequences:

1. **Claiming Instagram, Facebook and TikTok is urgent** — profiles are what
   fill a brand SERP, and they'd displace those unrelated results. The
   Pinterest handle is already gone. This only gets harder; it is a same-day
   task.
2. **All copy, ads and bios must say `pearmo.com`, never bare "pearmo."**
   No browser resolves a dotless word to a domain on a first visit, so "pearmo"
   is a *search*, and that search currently finds other people.

Once the accounts exist, uncomment them in
[src/lib/site.ts:81-86](src/lib/site.ts#L81-L86):

```ts
export const socialProfiles: readonly string[] = [
  "https://www.instagram.com/pearmoapp",
  "https://www.facebook.com/pearmoapp",
  "https://www.tiktok.com/@pearmoapp",
];
```

This populates `Organization.sameAs` in the JSON-LD, which is the mechanism
that ties the domain to the accounts and consolidates them into one entity —
the prerequisite for a brand knowledge panel. The array is deliberately empty
today because a 404 in `sameAs` is worse than no `sameAs` at all. **Only add
URLs that resolve.**

> Also flagged in the status doc and worth repeating here because it is not an
> SEO issue: **"PearMo" is an active company name.** That's a trademark
> question for the team, separate from anything in this guide.

### 7.2 Get the first backlinks

Zero inbound links is the binding constraint. Realistic, legitimate sources for
a pre-launch app, roughly in order of effort-to-value:

- **LinkedIn company page** for Pearmo — trivial, and a strong
  entity signal
- **Crunchbase** company profile
- **Product Hunt** — plan this properly; a launch there is a real spike
- **BetaList / Betapage** — built for pre-launch waitlists
- Sri Lankan tech press and startup communities
- **r/SriLanka** and local Facebook groups — participate honestly, do not spam;
  a dating app posting promos into a community reads badly and can backfire

Never buy links. For a brand-new domain in a sensitive category (dating), a
spammy backlink profile is a fast route to a manual action — which you'd see in
the Search Console panel from Phase 1.7.

### 7.3 Three URLs is a hard ceiling

You cannot rank for queries you have no page for. Landing + 2 legal pages caps
the organic ceiling structurally, no matter how good the markup is.

Target queries worth building for (from §4.5, none researched yet — validate
volumes before writing):
`dating app sri lanka` · `colombo dating app` · `anonymous dating app` ·
`dating apps in sri lanka` · `safe dating app sri lanka`

Realistic content that would actually earn links and rank:

- **A dating-safety guide for Sri Lanka** — genuinely useful, highly linkable,
  and perfectly on-brand for a product whose pitch is safety
- **"How personality matching works"** — explains Big Five + attachment theory;
  targets an informational query and builds credibility for the core claim
- **Comparison pages** — "Pearmo vs Tinder in Sri Lanka" style, honest ones

Each is a new URL, a new set of queries, and a reason for someone to link.

### 7.4 The largest untapped opportunity: Sinhala and Tamil

A Sri-Lanka-first product, English-only, on a `.com`. The `hreflang`
infrastructure is already built for this —
[buildAlternates()](src/lib/site.ts#L103-L112) and the sitemap's `languages`
map exist specifically as the seam for adding `/si`. All the copy is already
extracted into `src/content/`, which is the hard part done.

The blocker is not engineering: the headlines are idiomatic and will not
survive machine translation. This needs a native speaker. Worth costing out —
the competitive density in Sinhala search is a fraction of English.

---

## Ongoing cadence

Once set up, this is not a large time commitment.

**Weekly (~5 min)**
- Search Console → **Pages**: any new "Not indexed"?
- Search Console → **Performance**: which queries are appearing?
- Vercel Analytics: traffic and `waitlist_submit` count, split by UTM source

**Monthly (~20 min)**
- Core Web Vitals report (real field data, once ~28 days have accumulated)
- Bing Webmaster Tools → Backlinks — is Phase 7.2 working?
- Merge Dependabot PRs
- Re-run PageSpeed Insights and compare against the Phase 3.4 baseline

**At launch — do not forget these**
- Update the FAQ, which is deliberately non-committal on **price and launch
  date** right now. It's the source for both the on-page accordion *and* the
  `FAQPage` schema *and* `llms.txt` — one edit in `src/content/site-content.ts`
  fixes all three, but nothing fixes it automatically.
- Add `installUrl` / `downloadUrl` to the `MobileApplication` schema once store
  listings exist.
- Ship the deep-linking association files, which live on **this** website and
  don't exist yet: `/.well-known/assetlinks.json` (Android App Links) and
  `/.well-known/apple-app-site-association` (iOS Universal Links).
- Add the `apple-itunes-app` Smart App Banner once iOS ships.

---

## Priority order — if you only do some of this

| # | Task | Phase | Time | Why |
| - | ---- | ----- | ---- | --- |
| ~~1~~ | ~~Confirm the new site is actually deployed~~ | 0 | — | ✅ Verified live 1 Aug 2026 |
| 2 | Google Search Console, Domain property | 1 | 20 min | **Start here.** The core diagnostic; nothing else replaces it |
| 3 | Submit sitemap + request indexing | 1.5–1.6 | 10 min | Gets you into the index |
| 4 | Claim Instagram / Facebook / TikTok handles | 7.1 | 30 min | Time-sensitive — handles disappear |
| 5 | Bing Webmaster Tools (import from GSC) | 2 | 10 min | Feeds ChatGPT, Copilot, DuckDuckGo |
| 6 | Confirm Vercel Analytics is enabled | 4.1 | 2 min | May be silently collecting nothing |
| 7 | Fix the UTM scheme before you post any link | 4.3 | 15 min | Unrecoverable if skipped |
| 8 | SPF / DKIM / DMARC | 5.3 | 30 min | Spoofing risk + your launch email's deliverability |
| 9 | Rich Results + OG card validation | 3 | 15 min | Never externally verified |
| 10 | `sameAs` once handles exist | 7.1 | 5 min | Entity consolidation |
| 11 | First backlinks (LinkedIn, Crunchbase, Product Hunt) | 7.2 | ongoing | The actual ranking constraint |
| 12 | HSTS preload | 5.2 | 5 min | Read the warning first |
| 13 | Dependabot + CI | 5.6 | 20 min | Nothing currently guards `main` |
| 14 | Content beyond 3 URLs | 7.3 | ongoing | The structural ceiling |
| 15 | Sinhala / Tamil | 7.4 | large | Largest untapped opportunity |

---

## Environment variable reference

See [.env.example](.env.example) for the full annotated version. Summary:

| Variable | Needed? | Notes |
| -------- | ------- | ----- |
| `NEXT_PUBLIC_SITE_URL` | No | Default is already correct. Setting it to a non-production value switches the site to `noindex` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | **No**, if you use a Domain property | Meta-tag verification only works for URL-prefix properties |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | No, if you import from GSC | Only for manual meta-tag verification |

All are `NEXT_PUBLIC_*` and therefore **inlined into the client bundle at build
time** — public by design, which is correct for verification tokens. Changing
any of them requires a **redeploy**, not just a settings save.
