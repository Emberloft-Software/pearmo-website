/**
 * All user-facing copy for the marketing site.
 *
 * Kept out of the components on purpose: adding a locale later means
 * translating this one file and moving pages into an `app/[locale]/` segment,
 * rather than hunting strings through JSX.
 *
 * `emphasis` fields render in the italic Fraunces serif with the brand
 * gradient — that's the design's accent treatment, not arbitrary markup.
 */

export type Avatar = {
  /** Filename stem in /public/assets/avatars — also the image alt basis. */
  slug: string;
  name: string;
  trait: string;
};

/** The 16 avatars shipped on the site (the app itself has more). */
export const avatars: readonly Avatar[] = [
  { slug: "fox-f", name: "The Fox", trait: "Playful" },
  { slug: "wolf-m", name: "The Wolf", trait: "Loyal" },
  { slug: "cat-f", name: "The Cat", trait: "Independent" },
  { slug: "owl-m", name: "The Owl", trait: "Thoughtful" },
  { slug: "deer-f", name: "The Deer", trait: "Gentle" },
  { slug: "lion-m", name: "The Lion", trait: "Confident" },
  { slug: "rabbit-f", name: "The Rabbit", trait: "Warm" },
  { slug: "panther-m", name: "The Panther", trait: "Mysterious" },
  { slug: "otter-f", name: "The Otter", trait: "Easygoing" },
  { slug: "tiger-m", name: "The Tiger", trait: "Bold" },
  { slug: "koala-f", name: "The Koala", trait: "Calm" },
  { slug: "hawk-m", name: "The Hawk", trait: "Focused" },
  { slug: "swan-f", name: "The Swan", trait: "Graceful" },
  { slug: "bear-m", name: "The Bear", trait: "Steady" },
  { slug: "dog-f", name: "The Dog", trait: "Devoted" },
  { slug: "hedgehog-m", name: "The Hedgehog", trait: "Guarded" },
];

export const nav = {
  logoLabel: "Pearmo — home",
  links: [
    { href: "#why", label: "Why" },
    { href: "#how", label: "How it works" },
    { href: "#personality", label: "Personality" },
    { href: "#safety", label: "Safety" },
    { href: "#showcase", label: "Inside the app" },
    { href: "#faq", label: "FAQ" },
  ],
  cta: { href: "#waitlist", label: "Join the waitlist" },
  menuOpenLabel: "Open menu",
  menuCloseLabel: "Close menu",
} as const;

export const hero = {
  badge: "Pre-launch · Sri Lanka 🇱🇰",
  /** Rendered as: Meet the {person}, / not the {picture}. */
  titleLead: "Meet the",
  titleEmphasis: "person",
  titleMid: "not the",
  /** Gets the hand-drawn strike-through. */
  titleStruck: "picture",
  lead: "Pearmo is an anonymous, psychology-matched dating app. No swiping, no public photos — just a few real, verified matches a day, and conversations that open only when you both say yes.",
  primaryCta: { href: "#waitlist", label: "Join the waitlist" },
  secondaryCta: { href: "#how", label: "See how it works" },
  note: "Your face stays yours. Show up as your avatar.",
  /** Avatars in the small stacked row under the CTAs. */
  noteAvatars: ["fox-f", "wolf-m", "owl-m", "cat-f"],
  image: "/assets/hero-scene.jpg",
  imageWidth: 1376,
  imageHeight: 768,
  imageAlt:
    "Illustrated fox and wolf avatars sitting across from each other on a cafe date",
  imageTag: "Matched on personality",
  chipTop: {
    avatar: "fox-f",
    name: "Maya · The Fox",
    meta: "Colombo",
    match: "87%",
  },
  chipBottom: {
    avatar: "wolf-m",
    name: "Dev · The Wolf",
    meta: "Consent given · chat unlocked",
  },
} as const;

export const marquee = {
  label: "Pick who you show up as — 24 animals, endless personality",
} as const;

export const problem = {
  kicker: "Why Pearmo exists",
  titleLead: "Dating apps have a",
  titleEmphasis: "trust",
  titleTrail: "problem.",
  lead: "We surveyed 93 people before writing a line of code. Women told us the same two things, over and over: they don't trust that other users are real, and they don't want their photos out there. Every app felt built around hookups — so we built the opposite.",
  stats: [
    {
      value: 93,
      /** `false` renders the number statically instead of counting up. */
      countUp: true,
      label: "people surveyed before we started building",
    },
    {
      value: 2,
      countUp: true,
      label:
        "answers we heard on repeat: “are they real?” and “not my photos”",
    },
    {
      value: 0,
      countUp: false,
      label: "swipes in Pearmo — curated matches instead",
    },
  ],
  quote:
    "Every dating app here feels like it was built around hookups. I just want to know the person on the other side is real, without putting my face on the internet.",
  quoteSource: "— what we kept hearing, r/SriLanka & our survey",
} as const;

export const how = {
  kicker: "How it works",
  titleLead: "Slow by",
  titleEmphasis: "design.",
  lead: "Real screens from the Pearmo app — no mockups. The MVP already works.",
  /** Every step screenshot is a 720×1600 phone capture. */
  shotWidth: 720,
  shotHeight: 1600,
  steps: [
    {
      num: "STEP 01",
      title: "Answer honestly. It can't be gamed.",
      body: "A psychology-based questionnaire built on the Big Five, reverse-scored, so playing it cool doesn't work. Your trait scores stay private, always.",
      image: "/assets/app-personality-radar.webp",
      alt: "Pearmo personality radar screen showing six trait scores",
    },
    {
      num: "STEP 02",
      title: "Get a few curated matches a day.",
      body: "No swiping, no endless grid. Compatibility does the heavy lifting and brings you a handful of people actually worth your time.",
      image: "/assets/app-trait-scores.webp",
      alt: "Pearmo trait scores screen breaking down personality dimensions",
    },
    {
      num: "STEP 03",
      title: "Break the ice before the chat.",
      body: "Chat doesn't just open. Both people consent, then you unlock it by playing icebreaker games together — shared music taste included.",
      image: "/assets/app-music-match.webp",
      alt: "Pearmo music match screen comparing shared music taste",
    },
    {
      num: "STEP 04",
      title: "Say what you're actually here for.",
      body: "Something serious? Say it up front. Pearmo profiles lead with intent: values, ambition and emotional depth — not gym selfies.",
      image: "/assets/app-about-looking-for.webp",
      alt: "Pearmo about screen showing what a user is looking for",
    },
  ],
} as const;

export const scene = {
  image: "/assets/icebreaker-scene.jpg",
  imageWidth: 1376,
  imageHeight: 768,
  alt: "Illustrated fox and wolf avatars playing an icebreaker game together",
  titleLead: "Games first.",
  titleEmphasis: "Chat second.",
  body: "Icebreakers turn “hey” into an actual conversation. You already know you click before the first message.",
  tag: "Pearmo · Icebreakers",
} as const;

export const personality = {
  kicker: "The science bit",
  titleLead: "Matched on",
  titleEmphasis: "who you are.",
  lead: "Six research-backed dimensions, drawn from the Big Five and attachment theory. We measure them properly — reverse-scored items, validated scales — then match people whose traits actually work together.",
  privacyNote:
    "Only you can see this. Your matches never see your trait scores — compatibility is computed, not exposed.",
  radarLabel:
    "Radar chart of an example Pearmo personality profile across six dimensions",
  /** Scores are 0–5. `short` is the radar axis label, kept tight to fit. */
  traits: [
    {
      icon: "✨",
      name: "Openness",
      short: "Openness",
      blurb: "Curious, creative, open to new ideas",
      score: 4.0,
    },
    {
      icon: "🎯",
      name: "Conscientiousness",
      short: "Conscient.",
      blurb: "Organized, reliable, goal-driven",
      score: 3.0,
    },
    {
      icon: "⚡",
      name: "Extraversion",
      short: "Extraversion",
      blurb: "Where you draw your social energy",
      score: 3.5,
    },
    {
      icon: "🤝",
      name: "Agreeableness",
      short: "Agreeable.",
      blurb: "Warm, empathetic, cooperative",
      score: 4.0,
    },
    {
      icon: "🌊",
      name: "Emotional stability",
      short: "Stability",
      blurb: "Calm and steady under stress",
      score: 2.0,
    },
    {
      icon: "🛡️",
      name: "Attachment security",
      short: "Security",
      blurb: "Comfort with closeness and trust",
      score: 4.0,
    },
  ],
  scoreMax: 5,
} as const;

export const safety = {
  kicker: "Safety, not vibes",
  titleLead: "Real people.",
  titleEmphasis: "Really",
  titleTrail: "verified.",
  lead: "Anonymity for you doesn't mean anonymity for bad actors. Every layer of Pearmo assumes trust has to be earned by the platform first.",
  cards: [
    {
      icon: "shield" as const,
      title: "Liveness + ID verification",
      body: "A selfie liveness check and national ID verification, so the person and the age are both real. Verified badges you can actually believe.",
    },
    {
      icon: "eye-off" as const,
      title: "Your photos stay private",
      body: "No public photo grid. You show up as your avatar, and your real photos are shared only when you choose, with who you choose.",
    },
    {
      icon: "lock" as const,
      title: "Consent gates everything",
      body: "Chat, photo reveals, contact details — nothing moves forward unless both people opt in. Slowing down is the feature.",
    },
  ],
} as const;

export const showcase = {
  kicker: "See it in action",
  titleLead: "Every claim, a",
  titleEmphasis: "real",
  titleTrail: "screen.",
  lead: "Nothing on this page is a promise on faith. Here's what profiles, matches and consent actually look like once you're in the app.",
  cards: [
    {
      featured: true,
      image: "/assets/app-profile-showcase.webp",
      width: 1600,
      height: 1200,
      alt: "Pearmo profile screen showing an animal avatar above an about tab with intent, age range and values",
      title: "Profiles that lead with substance",
      body: "Your avatar up top, then who you actually are: what you're looking for, the ages you're open to, and what you value in a partner — before anyone gets to your photos.",
    },
    {
      featured: false,
      image: "/assets/app-showcase-overview.webp",
      width: 2560,
      height: 1920,
      alt: "Pearmo music match, connection and personality radar screens shown side by side",
      title: "Matches, music and traits in one place",
      body: "Shared genres, your private personality radar, and the connections you've made — all a tab away.",
    },
    {
      featured: false,
      image: "/assets/app-shared-unlocks.webp",
      width: 1500,
      height: 1125,
      alt: "Pearmo shared unlocks screen listing chat, photos, calls, location and gift delivery, each requiring mutual consent",
      title: "Consent, unlocked one step at a time",
      body: "Chat, photos, calls, location, even a gift address — each stays locked until you both agree. Plus a date safety check-in with an emergency contact for when you meet up.",
    },
  ],
} as const;

/**
 * FAQ — also emitted as FAQPage JSON-LD, so answers must be self-contained
 * and factually true. Deliberately non-committal on pricing and launch date;
 * do not add specifics here until they're decided.
 */
export const faq = {
  kicker: "Questions, answered",
  titleLead: "Everything you're",
  titleEmphasis: "wondering.",
  lead: "Still curious about something? Reach us at hello@pearmo.com.",
  items: [
    {
      q: "What is Pearmo?",
      a: "Pearmo is an anonymous, psychology-matched dating app launching first in Sri Lanka. Instead of swiping through photos, you complete a Big Five personality questionnaire, show up as one of 24 animal avatars, and receive a few curated, compatibility-matched people each day. Chat unlocks only when both people consent.",
    },
    {
      q: "When does Pearmo launch?",
      a: "The MVP is built and we're preparing a first release in Sri Lanka, starting in Colombo. Join the waitlist and you'll be told the launch date before it's public.",
    },
    {
      q: "Do I have to upload my photo?",
      a: "No. Pearmo has no public photo grid. You appear to other users as your chosen animal avatar, and your real photos stay private until you decide to share them with a specific match — who has to consent to the reveal too.",
    },
    {
      q: "How does Pearmo make sure people are real?",
      a: "Every account goes through a selfie liveness check and national ID verification before it can match. That confirms both that the person is real and that they're over 18. Your ID is used for verification only — it is never shown on your profile.",
    },
    {
      q: "How does personality matching work?",
      a: "You answer a questionnaire built on the Big Five personality traits plus attachment theory, covering six dimensions: openness, conscientiousness, extraversion, agreeableness, emotional stability and attachment security. Items are reverse-scored, so answering strategically doesn't improve your results. Pearmo then matches people whose trait profiles are genuinely compatible.",
    },
    {
      q: "Can my matches see my personality scores?",
      a: "No. Your trait scores are visible only to you. Compatibility is computed on our side and never exposed as raw numbers to anyone you match with.",
    },
    {
      q: "Why can't I message someone straight away?",
      a: "Chat is deliberately gated. Both people have to consent to connect, and then you unlock messaging by playing icebreaker games together — including comparing music taste. It means the first message lands with someone you already know you click with.",
    },
    {
      q: "Is Pearmo free?",
      a: "Joining the waitlist is free. We'll confirm what the app itself costs before launch, and waitlist members will hear first.",
    },
    {
      q: "Is Pearmo only for serious relationships?",
      a: "Pearmo is built for people looking for something real, and profiles lead with intent so you can state what you're actually after. It isn't designed for hookups — the slower, consent-gated flow is the whole point.",
    },
    {
      q: "Where is Pearmo available?",
      a: "Pearmo is launching in Sri Lanka first, beginning with Colombo. Other markets will follow once the first release is stable.",
    },
  ],
} as const;

export const cta = {
  kicker: "Launching first in Sri Lanka",
  titleLead: "Be there when the",
  titleEmphasis: "masks come off.",
  lead: "The MVP is built and we're opening the doors soon. Join the waitlist to be among the first matches in Colombo.",
  emailLabel: "Email address",
  emailPlaceholder: "you@example.com",
  submitLabel: "Get early access",
  successMessage: "🦊 You're on the list — see you at launch.",
  errorMessage: "That doesn't look like a valid email. Mind checking it?",
  privacyNote:
    "One email at launch. No spam, no sharing your address with anyone.",
  /** Avatars floated in the corners of the CTA card. */
  floatingAvatars: ["deer-f", "lion-m", "rabbit-f", "panther-m"],
} as const;

export const footer = {
  tagline: "Anonymous, psychology-matched dating. Launching in Sri Lanka.",
  copyright: `© ${new Date().getFullYear()} Pearmo · Pre-launch`,
  links: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "mailto:hello@pearmo.com", label: "Contact" },
  ],
} as const;
