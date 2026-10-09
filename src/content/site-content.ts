/**
 * All user-facing copy for the marketing site.
 *
 * Kept out of the components on purpose: adding a locale later means
 * translating this one file and moving pages into an `app/[locale]/` segment,
 * rather than hunting strings through JSX.
 *
 * Every factual claim here must match what the app does today. The beta
 * section and the "Get Pearmo" steps are taken from the beta terms in
 * `legal.ts`; if those change, change these with them.
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

/**
 * Words shared by every "join" and "open the app" control, so the nav, hero,
 * beta section and footer can never say it two different ways.
 */
export const actions = {
  joinBeta: "Join the beta",
  joinBetaNote: "Free · 18+ · Opens a Google Form",
  invited: "Already invited?",
  openApp: "Open Pearmo",
  getApp: "Get Pearmo",
  noStore: "No app store needed. It opens in your browser.",
  scan: "Scan with your phone",
  openHere: "open it on this computer",
  howBeta: "How the beta works",
} as const;

export const nav = {
  logoLabel: "Pearmo home",
  links: [
    { href: "#how", label: "How it works" },
    { href: "#personality", label: "Personality" },
    { href: "#safety", label: "Safety" },
    { href: "#beta", label: "The beta" },
    { href: "#faq", label: "FAQ" },
  ],
  menuOpenLabel: "Open menu",
  menuCloseLabel: "Close menu",
} as const;

/**
 * The avatar/person scene pairs. Both images in a pair are cropped to the
 * same frame so the faces line up, which is what makes the reveal read as
 * the avatars becoming people rather than one picture replacing another.
 * The portrait crops are the same pair cut to 4:5 for phones.
 */
export const scenes = {
  cafe: {
    width: 1509,
    height: 937,
    portraitWidth: 750,
    avatar: "/assets/scenes/cafe-avatar",
    person: "/assets/scenes/cafe-person",
    avatarAlt:
      "Illustrated fox and wolf avatars on a café date under string lights",
    personAlt: "The same café date, with the two people shown as themselves",
  },
  sofa: {
    width: 1678,
    height: 937,
    portraitWidth: 750,
    avatar: "/assets/scenes/sofa-avatar",
    person: "/assets/scenes/sofa-person",
    avatarAlt:
      "Illustrated fox and wolf avatars laughing over an icebreaker game on a sofa",
    personAlt: "The same sofa scene, with the two people shown as themselves",
  },
} as const;

export const hero = {
  badge: "Closed beta · Sri Lanka",
  /** Rendered as: Meet the {person}, / not the {picture}. */
  titleLead: "Meet the",
  titleEmphasis: "person",
  titleMid: "not the",
  /** Gets the hand-drawn strike-through. */
  titleStruck: "picture",
  lead: "Pearmo is an anonymous, psychology-matched dating app. There's no swiping and no public photos, just a few real matches a day, and conversations that open only when you both say yes.",
  revealCaption:
    "On Pearmo you're your avatar. Your photo stays hidden unless you choose to show it.",
  compareAvatar: "Avatar",
  comparePerson: "Person",
  compareLabel: "Slide to compare the avatar and the person",
} as const;

export const strip = {
  // No count on purpose. The site once said "24", an older note said "48",
  // and the character folder holds 20, so any number here risks being wrong.
  label: "Show up as an animal that feels like you.",
} as const;

export const why = {
  kicker: "Why Pearmo exists",
  titleLead: "Dating apps have a",
  titleMark: "trust",
  titleTrail: "problem.",
  heardLabel: "What we heard",
  builtLabel: "What we built",
  lead: "We surveyed 93 people before writing a line of code. Women told us the same two things again and again. They don't trust that other users are real, and they don't want their photos out there. Every app felt built around hookups, so we built the opposite.",
  stats: [
    { value: "93", label: "people surveyed before we started building" },
    {
      value: "2",
      label:
        "answers we heard again and again: “are they real?” and “not my photos”",
    },
    { value: "0", label: "swipes in Pearmo, just curated matches instead" },
  ],
  quote:
    "Every dating app here feels like it was built around hookups. I just want to know the person on the other side is real, without putting my face on the internet.",
  quoteSource: "A recurring theme on r/SriLanka and in our survey",
} as const;

export const how = {
  kicker: "How it works",
  titleLead: "Slow by",
  titleEmphasis: "design.",
  lead: "Real screens from the Pearmo app, not mockups.",
  /** Every step screenshot is a 720×1600 phone capture. */
  shotWidth: 720,
  shotHeight: 1600,
  steps: [
    {
      title: "Answer honestly. It can't be gamed.",
      body: "A psychology-based questionnaire built on the Big Five and reverse-scored, so playing it cool doesn't work. Your trait scores always stay private.",
      image: "/assets/app-personality-radar.webp",
      alt: "Pearmo personality radar screen showing six trait scores",
    },
    {
      title: "Get a few curated matches a day.",
      body: "No swiping, no endless grid. Compatibility does the heavy lifting and brings you a handful of people actually worth your time.",
      image: "/assets/app-trait-scores.webp",
      alt: "Pearmo trait scores screen breaking down personality dimensions",
    },
    {
      // Was "Break the ice before the chat." Games don't gate chat any more.
      title: "Talk only when you both say yes.",
      body: "Nobody can message you unless you both agree, and either of you can lock chat again. A shared music match gives you something real to start with.",
      image: "/assets/app-music-match.webp",
      alt: "Pearmo music match screen comparing shared music taste",
    },
    {
      title: "Say what you're actually here for.",
      body: "Something serious? Say it up front. Pearmo profiles lead with values, ambition and emotional depth, not gym selfies.",
      image: "/assets/app-about-looking-for.webp",
      alt: "Pearmo about screen showing what a user is looking for",
    },
  ],
  showcase: {
    kicker: "Inside the app",
    image: "/assets/app-profile-showcase.webp",
    width: 1600,
    height: 1200,
    alt: "Pearmo profile screen showing an animal avatar above an about tab with intent, age range and values",
    title: "Profiles that lead with substance",
    body: "Your avatar comes first, followed by what you're looking for, the ages you're open to and what you value in a partner. Your photos come last.",
  },
} as const;

export const icebreakers = {
  kicker: "Icebreakers",
  // Was "Games first. Chat second." Games are optional and don't gate chat.
  titleLead: "Skip the",
  titleMark: "“hey”",
  titleTrail: ".",
  body: "Optional icebreaker games give you something real to talk about, so the first message isn't a cold “hey”.",
  /** As named in the beta terms, plus the music-taste match on profiles. */
  games: ["Would you rather", "20 questions", "Draw together", "Music match"],
  note: "Play them any time in a connection, or not at all. Chat never waits for a game.",
} as const;

export const personality = {
  kicker: "The science bit",
  titleLead: "Matched on",
  titleEmphasis: "who you are.",
  lead: "Six research-backed dimensions, drawn from the Big Five and attachment theory. We measure them properly, using reverse-scored items and validated scales, then match people whose traits actually work together.",
  privacyNote:
    "Only you can see this. Your matches never see your trait scores. Compatibility is computed, not exposed.",
  radarLabel:
    "Radar chart of an example Pearmo personality profile across six dimensions",
  exampleLabel: "Example profile",
  /** Scores are 0–5. `short` is the radar axis label, kept tight to fit. */
  traits: [
    { name: "Openness", short: "Openness", blurb: "Curious, creative, open to new ideas", score: 4.0 },
    { name: "Conscientiousness", short: "Conscient.", blurb: "Organized, reliable, goal-driven", score: 3.0 },
    { name: "Extraversion", short: "Extraversion", blurb: "Where you draw your social energy", score: 3.5 },
    { name: "Agreeableness", short: "Agreeable.", blurb: "Warm, empathetic, cooperative", score: 4.0 },
    { name: "Emotional stability", short: "Stability", blurb: "Calm and steady under stress", score: 2.0 },
    { name: "Attachment security", short: "Security", blurb: "Comfort with closeness and trust", score: 4.0 },
  ],
  scoreMax: 5,
} as const;

export const safety = {
  kicker: "Safety, not vibes",
  // Was "Real people. Really verified." Verification is optional.
  titleLead: "Your face.",
  titleMark: "Your call.",
  lead: "Anonymity for you doesn't mean anonymity for bad actors. Every layer of Pearmo assumes trust has to be earned by the platform first.",
  cards: [
    {
      icon: "eye-off" as const,
      chip: "Photo hidden",
      title: "Your photos stay private",
      body: "No public photo grid. You show up as your avatar, and a real photo appears only if you add one and choose to show it.",
    },
    {
      icon: "lock" as const,
      chip: "Chat locked · both must agree",
      title: "Consent gates everything",
      body: "Chat and photo sharing stay locked until both people opt in, and either of you can lock them again at any time. Slowing down is the feature.",
    },
    {
      icon: "shield" as const,
      chip: "Selfie checked by a person",
      title: "Real-person verification",
      body: "An optional selfie check, reviewed by a real person, confirms someone real is behind the account. Every profile shows how far it's verified, and the app spells out what a badge does and doesn't mean.",
    },
    {
      // From the beta terms ("Reporting and rating").
      icon: "flag" as const,
      chip: "Report · Rate",
      title: "Report anyone, rate every connection",
      body: "You can report someone at any point, and rate a connection after it ends. Ratings feed an internal trust score.",
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
  lead: "Still curious about something? Email pearmo.app@gmail.com. It reaches the team directly.",
  /**
   * The topic tabs, in order; the first is open by default. Every answer is
   * in the HTML whichever tab is showing, and without JavaScript the groups
   * simply stack, so the FAQPage markup always matches what's on the page.
   */
  groups: [
    { id: "safety", label: "Privacy & safety" },
    { id: "matching", label: "Matching" },
    { id: "beta", label: "The beta" },
  ],
  items: [
    {
      q: "What is Pearmo?",
      group: "matching",
      a: "Pearmo is an anonymous, psychology-matched dating app launching first in Sri Lanka. Instead of swiping through photos, you complete a Big Five personality questionnaire, choose an animal avatar to appear as, and receive a few curated, compatibility-matched people each day. Chat unlocks only when both people consent.",
    },
    {
      q: "When does Pearmo launch?",
      group: "beta",
      a: "Pearmo is in an invite-only closed beta with a small group in Sri Lanka. There's no public launch date yet. Join the beta and you'll hear about the launch before it's public.",
    },
    {
      q: "Do I have to upload my photo?",
      group: "safety",
      a: "No. Pearmo has no public photo grid. You appear to other users as your chosen animal avatar. Once you've verified, you can add a real profile photo, and it stays hidden unless you choose to show it. Sending photos inside a chat needs both of you to agree first.",
    },
    {
      q: "How does Pearmo make sure people are real?",
      group: "safety",
      a: "Verification is optional, and every profile shows its level. A selfie check, reviewed by a real person, confirms there's someone real behind the account. Unverified accounts are matched mainly with each other, and sharing photos in a chat needs both people verified. A national ID check that also confirms age is planned but not switched on yet. Verification isn't a background check, and it doesn't vouch for how anyone will behave.",
    },
    {
      q: "How does personality matching work?",
      group: "matching",
      a: "You answer a questionnaire built on the Big Five personality traits plus attachment theory, covering six dimensions: openness, conscientiousness, extraversion, agreeableness, emotional stability and attachment security. Items are reverse-scored, so answering strategically doesn't improve your results. Pearmo then matches people whose trait profiles are genuinely compatible.",
    },
    {
      q: "Can my matches see my personality scores?",
      group: "safety",
      a: "No. Your trait scores are visible only to you. Compatibility is computed on our side and never exposed as raw numbers to anyone you match with.",
    },
    {
      q: "Why can't I message someone straight away?",
      group: "safety",
      a: "Chat is deliberately gated. Both people have to accept the connection and agree to open chat, and either of you can lock it again later. Icebreaker games, including comparing music taste, give you something real to start from, so the first message isn't a cold \"hey\".",
    },
    {
      q: "Is Pearmo free?",
      group: "beta",
      a: "The beta is free, with no payments anywhere in it. We'll confirm what the app itself costs before launch, and beta testers will hear first.",
    },
    {
      q: "Is Pearmo only for serious relationships?",
      group: "matching",
      a: "Pearmo is built for people looking for something real, and profiles lead with intent so you can state what you're actually after. It isn't designed for hookups. The slower, consent-gated flow is the whole point.",
    },
    {
      q: "Where is Pearmo available?",
      group: "beta",
      a: "Only in Sri Lanka for now, through the invite-only closed beta. Other markets will follow once the first release is stable.",
    },
    {
      q: "What happens to my data when the beta ends?",
      group: "beta",
      a: "We delete the beta data: accounts, profiles, messages, connections, matches and any verification images. Nothing carries over to a public launch. Your sign-up form answers are deleted too, and you can ask us to delete them sooner.",
    },
  ],
} as const;

/**
 * The closing section. Facts from the beta terms: who can take part, that it's
 * free, that the data is deleted at the end, and how the form is stored.
 */
export const beta = {
  kicker: "Join the closed beta",
  titleLead: "Be there when the",
  titleEmphasis: "masks come off.",
  lead: "Pearmo is in an early, invite-only test with a small group in Sri Lanka. Tell us a little about yourself, and we'll send your invite to your WhatsApp and email.",
  steps: [
    {
      title: "Fill in the form",
      body: "Your first name, phone number, email and a few questions about you. It's a Google Form.",
    },
    {
      title: "Get your invite",
      body: "When it's ready, we send it to your WhatsApp and email.",
    },
    {
      title: "Open Pearmo",
      body: "Follow the link in your invite, sign in with your phone number, and pick your animal.",
    },
  ],
  whoTitle: "Who can join",
  who: [
    "You're 18 or older",
    "You're in Sri Lanka",
    "You have a Sri Lankan mobile number for the SMS sign-in code",
    "You're joining as yourself, with one account",
  ],
  /** Inserted after the phone-number line; which one depends on `site.webAppUrl`. */
  deviceWithWebApp: "You have an Android phone or an iPhone",
  deviceAndroidOnly: "You have an Android phone (Android 7.0 or newer)",
  expectTitle: "What to expect",
  expect: [
    { title: "It's free", body: "No payments or card details anywhere in the beta." },
    {
      title: "It's early",
      body: "Some things will break. Telling us is the most useful thing you can do.",
    },
    {
      title: "The people are real",
      body: "Other testers are real people, and you can genuinely end up talking to someone.",
    },
    {
      title: "It ends cleanly",
      body: "When the beta ends we delete the beta data. Nothing carries over.",
    },
  ],
  data: "Your answers go to a private Google Sheet only our team can open. We delete them when the beta ends, or sooner if you ask.",
  termsLink: "Read the beta terms",
  team: "Pearmo is built by a small team in Colombo. Every email reaches us directly.",
} as const;

/** Shown only once `site.webAppUrl` is set. */
export const getApp = {
  kicker: "Already invited?",
  title: "Get Pearmo on your phone",
  lead: "No app store needed. Pearmo runs in your phone's browser and sits on your Home Screen like any other app.",
  steps: [
    {
      title: "Open pearmo.com/get",
      body: "Scan the code with your phone's camera, or tap the button on your phone.",
    },
    {
      title: "Sign in with your phone number",
      body: "You'll get a code by SMS. There's no password.",
    },
    {
      title: "Add it to your Home Screen",
      body: "Pearmo shows you how. On iPhone, that's also what turns on notifications.",
    },
  ],
  scanTitle: "Scan with your phone's camera",
  noStores:
    "Pearmo isn't in the App Store or Google Play. The web app is the same Pearmo, with nothing to download from a store.",
  signIn: "Your sign-in stays on your device, and signing out removes it.",
  notInvited: "Not invited yet?",
} as const;

export const footer = {
  tagline: "Anonymous, psychology-matched dating. In closed beta in Sri Lanka.",
  copyright: `© ${new Date().getFullYear()} Pearmo · Closed beta`,
  contactLabel: "Contact",
  qrLabel: "Scan to open Pearmo",
  links: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/beta-terms", label: "Beta terms" },
    // Google Play requires a deletion URL reachable without the app, so it
    // needs a real link somewhere crawlable — the footer is that somewhere.
    { href: "/data-deletion", label: "Delete my data" },
  ],
} as const;
