# Pearmo — pre-launch promo site

Single-page static promotional site for the Pearmo dating app. No build step —
`index.html` plus `assets/` is the whole site; deploy the folder anywhere
(Netlify, Vercel, GitHub Pages, S3).

## Run locally

```
npx serve . -l 8321
```

(or the `pearmo-site` entry in `C:\Chanka\.claude\launch.json`)

## Assets

- `assets/app-*.jpg` — real screenshots from the Flutter MVP (renamed from the
  WhatsApp exports), shown inside CSS phone frames in the "How it works" steps.
  The frames crop the Android status/nav bars with negative margins.
- `assets/design-concept-panels.jpg` — 3-panel design concept (currently unused).
- `assets/hero-scene.jpg` / `assets/icebreaker-scene.jpg` — AI scenes generated
  with Higgsfield (nano banana pro) using `avatars/fox-f.png` + `avatars/wolf-m.png`
  as character references. Higgsfield job IDs:
  - hero: `333fd2f9-324a-4ea6-b864-b038eee2f7de`
  - icebreaker: `1dfaa890-acc4-4a71-8385-1be2dc8e3b7a`
- `assets/avatars/*.png` — 16 of the 48 app avatars, copied from
  `E:\Chanka\Pearmo documents\Animals -avatars\3d-individual`.

## TODO before launch

- **Hero video**: the hero currently uses a Ken Burns + sheen animation over
  `hero-scene.jpg`. The Higgsfield account is on the free plan (6 credits left)
  and every image-to-video model is plan-gated, so the animated version couldn't
  be generated. Once the plan is upgraded, animate job
  `333fd2f9-...` (image-to-video, subtle loop: steam, blinking, bokeh shimmer,
  slow push-in), save as `assets/hero-scene.mp4`, and swap the `.kb` div in the
  hero back to a `<video autoplay muted loop playsinline>`.
- **Waitlist form**: `#wlForm` is front-end only (shows a success state).
  Wire it to a real backend (e.g. Supabase table + edge function, or a
  Formspree/Google Form endpoint) before sharing the link.
