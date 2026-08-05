/**
 * Privacy policy, terms of service, beta terms and data-deletion content.
 *
 * ⚠️  NOT LEGAL ADVICE. These documents are written to describe what Pearmo
 * *actually does* — verified against the Flutter app, the Supabase schema/RLS
 * notes in `pearmo-flutter/CLAUDE.md`, and the edge functions — and to name
 * the obligations that follow under Sri Lanka's Personal Data Protection Act
 * No. 9 of 2022. A qualified lawyer should review them before public launch
 * and before submission to Google Play or the App Store. For a free, invite-
 * only closed beta run by two named individuals, accuracy matters more than
 * polish: the biggest legal risk here is claiming something the app does not
 * do, not missing a clause.
 *
 * ── Facts resolved 4 August 2026 ────────────────────────────────────────────
 *   - No company exists, and no studio name is to appear anywhere. The
 *     controller is the two founders personally. Every reference to a
 *     publisher company has been removed on purpose — naming an unregistered
 *     entity as the operator would misrepresent who the user's agreement is
 *     actually with. Do not reintroduce one until something is registered.
 *   - Supabase project region: Singapore (AWS ap-southeast-1). Personal data
 *     therefore leaves Sri Lanka; this is disclosed explicitly.
 *   - One working contact address: pearmo.app@gmail.com.
 *   - There is no third-party identity-verification vendor. Liveness runs
 *     on-device and is never uploaded; selfies are reviewed by hand.
 *
 * ── Still to fill in (search for TODO) ──────────────────────────────────────
 *   - `legalFacts.smsProvider` — confirm the Supabase SMS hook provider.
 *   - Whether the `analyse-profile` edge function sends profile free text to
 *     any third-party AI service. Its source is not in the repo. Until that
 *     is confirmed, this policy does not claim either way — see the
 *     recommendation to disable that call for the beta.
 */

/**
 * Single source of truth for the facts that appear across all four documents.
 * Change a value here and every document follows.
 */
export const legalFacts = {
  /**
   * The two founders, by the names they actually go by — not their full legal
   * names, deliberately. These documents are read by testers who need to know
   * who is holding their data; a name they recognise does that job, and a
   * six-word legal name does not. Revisit if Pearmo is ever incorporated, or
   * if these terms need to be enforceable against a specific individual.
   */
  operators: "Sanuth Mandepa and Chanka Dewmina Herath",
  location: "Colombo, Sri Lanka",
  contactEmail: "pearmo.app@gmail.com",
  /** Supabase project region — AWS ap-southeast-1. */
  hostingRegion: "Singapore",
  /** Sri Lankan SMS gateway behind the Supabase auth hook. */
  smsProvider: "Text.lk",
} as const;

export const LEGAL_LAST_UPDATED = "2026-08-04";

export const LEGAL_LAST_UPDATED_LABEL = "4 August 2026";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: readonly string[] };

export type LegalSection = {
  id: string;
  heading: string;
  blocks: readonly LegalBlock[];
};

/** Shown at the top of /privacy and /terms. Deliberately impossible to miss. */
export const DRAFT_NOTICE =
  "Pearmo has not publicly launched. These terms describe the closed beta and the service we are building. They have not been reviewed by a lawyer, and Pearmo is not yet a registered company. It is a project run by two people in Colombo. If anything here matters to a decision you're making, email us and ask.";

/** Shown at the top of /beta-terms. */
export const BETA_NOTICE =
  "These terms apply only to the invite-only closed beta. They sit on top of the privacy policy, which applies in full. If you are not in the beta, the ordinary terms of service apply to you instead.";

/* ────────────────────────────────────────────────────────────────────────── */
/*  PRIVACY POLICY                                                            */
/* ────────────────────────────────────────────────────────────────────────── */

export const privacyPolicy: readonly LegalSection[] = [
  {
    id: "summary",
    heading: "The short version",
    blocks: [
      {
        type: "p",
        text: "Pearmo is built so that you can date without putting your face or your personality profile on the internet. That principle drives how we handle data, so here is the summary before the detail:",
      },
      {
        type: "list",
        items: [
          "You appear to other people as an animal character, not a photo. There is no public photo grid and no public profile, so nothing about you is visible outside the app.",
          "Your personality trait scores are visible only to you. Matches never see them. Compatibility is calculated on our side and only the result affects who you are shown.",
          "Who you are open to dating is used for matching and is never shown to anyone, ever.",
          "Chat and photo sharing each stay locked until both people agree.",
          "We do not sell your personal data, we do not use it for advertising, and we do not use it to train AI models. There is no advertising tracker, no analytics SDK and no crash reporter anywhere in the app.",
          "Your data is stored on Supabase infrastructure in Singapore, which means it leaves Sri Lanka. That is explained in full below.",
          "You can request a copy of your data, correct it, or ask us to delete it, and you can delete your account from inside the app.",
        ],
      },
      {
        type: "p",
        text: "The rest of this page is the detail behind those points. It covers this website and the Pearmo mobile app, including the closed beta.",
      },
    ],
  },
  {
    id: "who-we-are",
    heading: "Who we are",
    blocks: [
      {
        type: "p",
        text: `Pearmo is not a company. It is a project built and run by ${legalFacts.operators}, two people in ${legalFacts.location}. There is no registered business behind it yet, and we would rather say that plainly than imply otherwise. If Pearmo is incorporated later, we will update this page and tell you before your data moves to a new controller.`,
      },
      {
        type: "p",
        text: `For the purposes of Sri Lanka's Personal Data Protection Act No. 9 of 2022, that means the two of us are personally the controllers of the data described here. Nobody else has access to it.`,
      },
      {
        type: "p",
        text: `For any question about this policy, or to exercise any of the rights described below, email ${legalFacts.contactEmail}. That address reaches both of us and nobody else.`,
      },
    ],
  },
  {
    id: "beta",
    heading: "What is different during the closed beta",
    blocks: [
      {
        type: "p",
        text: "Pearmo is currently an invite-only closed beta with a small group of testers. Several parts of the finished product are switched off, which changes what we collect:",
      },
      {
        type: "list",
        items: [
          "National identity document verification is disabled. We do not ask for, receive or store your NIC or any other government ID during the beta.",
          "There are no profile photos. You have an animal character and nothing else. There is no photo upload anywhere in the beta build.",
          "There is no audio introduction recording.",
          "There are no payments. Nothing in the beta costs money, and we hold no payment or card details of any kind.",
          "Beta signups are collected through a Google Form. Your first name, phone number, email address and answers are stored in Google's systems under Google's terms until we delete the responses, and only the two of us can open that sheet. The form also has email collection switched on, so it separately records the Google account address you are signed in with, which may not be the address you typed.",
          "When the closed beta ends, we delete the beta test data outright, including accounts, profiles, messages, connections, matches and any verification images. Nothing is carried over into a public launch; you would sign up again from scratch. We will tell you before we do it.",
        ],
      },
      {
        type: "p",
        text: "Everything else in this policy applies to the beta exactly as written.",
      },
    ],
  },
  {
    id: "what-we-collect",
    heading: "What we collect, and why",
    blocks: [
      { type: "h3", text: "Your phone number" },
      {
        type: "p",
        text: `Pearmo signs you in with your mobile number and a one-time SMS code. We do not ask for a password and we do not collect an email address inside the app. Your number is how your account is identified, and the code is delivered by ${legalFacts.smsProvider}, a Sri Lankan SMS gateway, which necessarily sees your number and the code in order to send the message. Your number is never shown to other users.`,
      },
      { type: "h3", text: "Your age" },
      {
        type: "p",
        text: "Your date of birth. Other people see your age as a number, never the date itself. We use it to enforce the 18+ rule and to honour the age range you and other people are open to.",
      },
      { type: "h3", text: "Who you are, and who you are open to" },
      {
        type: "p",
        text: "Your gender, the genders you are open to being matched with, the age range you are open to, and what kind of relationship you are looking for.",
      },
      {
        type: "p",
        text: "We want to be specific about this because it matters in Sri Lanka. Under the PDPA, information that reveals your sexual orientation is special-category personal data, and we treat it as the most sensitive thing on your account. Who you are open to is used for one thing only: deciding who to show you and who to show you to. It is never displayed on your profile, never shown to another user, never included in any export or report we generate, and never shared with anyone outside the two of us. It is deliberately excluded from the internal view the app uses to read other people's profiles, so it is not technically possible for one user's device to fetch it about another user.",
      },
      { type: "h3", text: "Personality questionnaire answers" },
      {
        type: "p",
        text: "You answer a short set of statements on a five-point scale. We do not store your individual answers. Your device converts them into six trait scores (openness, conscientiousness, extraversion, agreeableness, emotional stability and attachment security), and only those six numbers are saved. They are used to calculate compatibility, they are shown to you, and they are shown to nobody else. Like the field above, they are excluded from the view other users' devices can read.",
      },
      { type: "h3", text: "Profile content" },
      {
        type: "p",
        text: "The animal character you pick, a short piece of text about yourself, the province or area you choose from a list, your music genres, what you value in a partner, and the hours you would rather be shown to people. This is what other people in Pearmo see, so treat it as public within the app.",
      },
      {
        type: "p",
        text: "Your location is a region you choose from a list. Pearmo does not use GPS. The app requests no location permission at all, and we do not derive your position from your device.",
      },
      { type: "h3", text: "Verification: selfie and liveness check" },
      {
        type: "p",
        text: "If you choose to verify your account, the app asks you to centre your face, blink and turn your head, then take a single selfie. Under the PDPA the biometric processing involved here is sensitive personal data, so:",
      },
      {
        type: "list",
        items: [
          "The liveness check runs entirely on your own phone using on-device face detection. No video is recorded and nothing from that step is ever uploaded to us or to anyone else. All that leaves your device is a yes/no result.",
          "The selfie itself is uploaded to a private storage area that only you and we can read. It is not public and no other user can request it.",
          "One of us looks at it by hand to confirm you are a real person. There is no third-party verification vendor, no automated face matching, and no facial-recognition search against other users.",
          "Once we have approved or rejected it, a scheduled job deletes the image. We keep the outcome (approved or rejected, and when) as our record that a review happened. We do not keep the picture.",
          "It is never displayed on your profile. Other people see only that your account carries a verification badge, and the app states plainly what that badge does and does not mean.",
          "It is never used for advertising, and never used to train any machine-learning model.",
        ],
      },
      { type: "h3", text: "Messages and interactions" },
      {
        type: "p",
        text: "Messages you exchange once chat unlocks, icebreaker game contents, and the record of which consent gates you and a match have opened. We keep these to run the service, to help you if something goes wrong, and to investigate reports of abuse. We do not read your messages routinely, but we can technically read them. Pearmo is not end-to-end encrypted, and we would rather you know that than assume otherwise.",
      },
      { type: "h3", text: "Reports, ratings and trust score" },
      {
        type: "p",
        text: "If you report someone, we keep the report, who made it, and what it was about. After a connection ends you can rate it, and those ratings feed a trust score on the rated account. Ratings are anonymous to the person rated. They cannot query who rated them or how. The trust score is used internally to decide who gets shown to whom; it is not displayed on anyone's profile.",
      },
      { type: "h3", text: "Safety check-in" },
      {
        type: "p",
        text: "If you use the check-in feature, we store the time you set and the optional free-text note of who you would call. Read that carefully: Pearmo never contacts that person. The check-in is an alarm that sounds on your own phone and nothing more. We do not call, text or notify anyone on your behalf, and a missed check-in is simply marked as missed in the app.",
      },
      { type: "h3", text: "Technical data" },
      {
        type: "p",
        text: "Our hosting provider logs the usual things a server logs, including IP address, request times, device and app version, and we use those to keep the service running and to spot abuse. That is the extent of it. The app contains no analytics SDK, no advertising identifier, no crash-reporting service and no push-notification tokens; notifications in Pearmo are generated locally by your own phone, so nothing about them reaches us.",
      },
      { type: "h3", text: "This website" },
      {
        type: "p",
        text: "pearmo.com uses Vercel Analytics and Vercel Speed Insights to count page views and measure loading speed. Both are cookieless and neither builds a profile of you across websites, which is why this site shows no cookie banner. If you join the waitlist here, we collect your email address and use it only to tell you when Pearmo launches. There are no advertising trackers on this site.",
      },
    ],
  },
  {
    id: "lawful-basis",
    heading: "Our lawful basis for using your data",
    blocks: [
      {
        type: "list",
        items: [
          "Performance of our agreement with you, including creating and running your account, matching you with other people, and delivering the features you use.",
          "Your consent, for the selfie and liveness verification, for each photo reveal, and for waitlist emails. You can withdraw consent at any time. Withdrawing verification consent means we cannot verify your account, but you can still use Pearmo unverified.",
          "Our legitimate interests, including keeping the platform safe, preventing impersonation and abuse, fixing what is broken, and understanding in aggregate how the product is used, weighed against your privacy each time.",
          "Legal obligations, where Sri Lankan law requires us to keep or disclose something.",
        ],
      },
    ],
  },
  {
    id: "sharing",
    heading: "Who else touches your data",
    blocks: [
      {
        type: "p",
        text: "We do not sell your personal data and we do not share it with advertisers. There is no data broker, no ad network and no AI training partner in this list. These are the only parties involved:",
      },
      {
        type: "list",
        items: [
          "Other Pearmo users, but only the profile content described above, plus anything you specifically choose to reveal to one match.",
          "Supabase, the database, sign-in, file storage and server functions behind the app. Supabase runs our project on Amazon Web Services infrastructure in Singapore. This is where essentially all of your data lives.",
          `${legalFacts.smsProvider}, a Sri Lankan SMS gateway that delivers your sign-in code and so receives your phone number. This is the one provider in this list that is inside Sri Lanka.`,
          "Vercel, which hosts this website and the private page we use to review verification selfies.",
          "Google, during the closed beta only, because the signup form is a Google Form and its responses sit in a Google Sheet that only the two of us can open.",
          "Law enforcement or a regulator, where we are legally required to hand something over, or where we believe in good faith it is necessary to prevent serious harm to someone.",
        ],
      },
      {
        type: "p",
        text: "Each of these providers may use your data only to provide their service to us. If we ever add another one that touches personal data, we will name it here before it goes live.",
      },
      {
        type: "p",
        text: "Separately from all of that, we may use anonymised, aggregated patterns, such as “a third of new users stopped during onboarding”, to improve the product and in material we show investors. That is counts and percentages only. Your name, number, selfie, messages, profile and trait scores are never part of it, and nothing in it can be traced back to you.",
      },
    ],
  },
  {
    id: "international",
    heading: "Where your data is processed",
    blocks: [
      {
        type: "p",
        text: `Your data does not stay in Sri Lanka. Our Supabase project is hosted in ${legalFacts.hostingRegion}, on Amazon Web Services infrastructure, and that is where your profile, messages, trait scores and any verification image are stored and processed. Our website and the internal review page are served by Vercel from its global network.`,
      },
      {
        type: "p",
        text: "We rely on these providers' own contractual and technical safeguards to keep that data protected to the standard this policy describes, and we chose a regional host rather than a distant one deliberately. If you are not comfortable with your data being stored outside Sri Lanka, please do not create an account. This is the one thing we cannot offer an alternative to.",
      },
    ],
  },
  {
    id: "retention",
    heading: "How long we keep it",
    blocks: [
      {
        type: "list",
        items: [
          "We keep account and profile data for as long as your account exists.",
          "We keep verification selfies until a review decision is made, then a scheduled job deletes them. We keep only the decision and its date.",
          "We keep messages for the life of the connection they belong to. Deleting your account does not delete them from the other person's side; see below.",
          "We keep reports, ratings and trust score after account deletion, because a moderation record that vanishes when the reported person deletes their account is not a moderation record.",
          "We delete beta signup form responses when the closed beta ends, or sooner if you ask.",
          "We keep waitlist emails until launch, or until you ask us to remove you.",
        ],
      },
    ],
  },
  {
    id: "deletion",
    heading: "What deleting your account actually does",
    blocks: [
      {
        type: "p",
        text: "You can delete your account from inside the app, under Settings. We want to be precise about what happens, because 'delete' means different things in different apps and most of them are vaguer than this:",
      },
      {
        type: "list",
        items: [
          "Deleted immediately: every file you uploaded, including any verification selfie, any photo or any audio, is removed from storage, not just unlinked. Your display name, your text about yourself, your character, and your region are wiped, your profile is switched off, and your verification badge resets to unverified.",
          "Kept: your reports, the ratings others gave you, your trust score and your report count. This is deliberate. If deleting your account erased that, anyone could clear a record of harassment by deleting and signing up again with the same number.",
          "Kept: the messages you sent. Deleting your side of a conversation would also delete the other person's side of it, and we do not think one person should be able to erase someone else's history. Your old messages stay visible to whoever you were talking to, attached to a deleted account. This is how mainstream dating apps handle it too.",
          "You can sign up again with the same phone number afterwards and build a new profile. It will be a genuinely fresh profile, but it remains the same underlying account, so the moderation history above stays attached to it.",
        ],
      },
      {
        type: "p",
        text: `If you would rather we deleted everything by hand, including the messages, email ${legalFacts.contactEmail} and ask. We will do it, but we cannot do it silently from your side, because it affects someone else's conversation too.`,
      },
      {
        type: "p",
        text: "If you only want a break, Settings also has a pause switch that hides your profile without deleting anything, and is fully reversible.",
      },
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights",
    blocks: [
      {
        type: "p",
        text: "Under the Personal Data Protection Act No. 9 of 2022 you have the right to:",
      },
      {
        type: "list",
        items: [
          "Ask what personal data we hold about you and get a copy of it.",
          "Have anything inaccurate or incomplete corrected.",
          "Ask us to delete your personal data.",
          "Withdraw consent you gave earlier, including for verification or waitlist emails.",
          "Object to processing we carry out on the basis of our legitimate interests.",
          "Complain to Sri Lanka's data protection authority if you think we have handled your data unlawfully.",
        ],
      },
      {
        type: "p",
        text: `To exercise any of these, email ${legalFacts.contactEmail}. We will respond within the period the PDPA requires. We may need to check that you are who you say you are first, so that we do not hand your data to the wrong person. We have not appointed a Data Protection Officer; with two people and a closed beta there is no one to appoint, and the address above reaches both of us directly.`,
      },
    ],
  },
  {
    id: "security",
    heading: "Security",
    blocks: [
      {
        type: "p",
        text: "Data is encrypted in transit. Verification images and private files sit in storage areas that are not publicly readable, and access to them is restricted per user at the database level. Only the two of us hold administrative access, and nobody else has ever had it.",
      },
      {
        type: "p",
        text: "Pearmo is early software built by two people, and we would rather set your expectations honestly than claim a security posture we cannot back up. It is not end-to-end encrypted. It has not had an external security audit. If a breach affects your personal data, we will tell you and the relevant authority as the PDPA requires, and we will tell you what actually happened rather than the smallest true version of it.",
      },
    ],
  },
  {
    id: "age",
    heading: "Age requirement",
    blocks: [
      {
        type: "p",
        text: "Pearmo is strictly for people aged 18 and over. During the closed beta, age is what you tell us, since national ID checking is switched off, so we are relying on your word and on the selfie review to catch anything obviously wrong. We do not knowingly hold data about anyone under 18, and if we find an underage account we delete it and its data.",
      },
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    blocks: [
      {
        type: "p",
        text: "We will update this page when our practices change, and change the date at the top when we do. If a change materially affects your rights, we will tell you directly rather than relying on you noticing.",
      },
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    blocks: [
      {
        type: "p",
        text: `Anything about your data, this policy, or a request under the PDPA: ${legalFacts.contactEmail}.`,
      },
    ],
  },
];

/* ────────────────────────────────────────────────────────────────────────── */
/*  TERMS OF SERVICE                                                          */
/* ────────────────────────────────────────────────────────────────────────── */

export const termsOfService: readonly LegalSection[] = [
  {
    id: "agreement",
    heading: "This agreement",
    blocks: [
      {
        type: "p",
        text: "These terms govern your use of the Pearmo website at pearmo.com and, once released, the Pearmo mobile app. By joining the waitlist or using the service, you agree to them. If you do not agree, please do not use Pearmo.",
      },
      {
        type: "p",
        text: `Pearmo is not a company. It is built and run by ${legalFacts.operators} in ${legalFacts.location}, and this agreement is with us personally. If you are in the invite-only closed beta, the beta terms apply to you on top of these.`,
      },
    ],
  },
  {
    id: "pre-launch",
    heading: "Pearmo is pre-launch",
    blocks: [
      {
        type: "p",
        text: "Pearmo has not been publicly released. This website lets you join a waitlist, and there is a separate invite-only closed beta. We want to be straightforward about what that means:",
      },
      {
        type: "list",
        items: [
          "Joining the waitlist does not create an account and does not guarantee you access.",
          "We have not announced a launch date, and we may change the launch plan, the feature set, or the markets we launch in.",
          "We have not announced pricing. If Pearmo ever introduces paid features, we will set out those terms before you are asked to pay anything. Nothing costs money today.",
          "We may decide not to launch at all. If that happens, we will delete the waitlist and the beta data.",
        ],
      },
    ],
  },
  {
    id: "eligibility",
    heading: "Who can use Pearmo",
    blocks: [
      {
        type: "p",
        text: "You must be at least 18 years old. You must be legally permitted to use a dating service where you live, and you must not have been convicted of a violent or sexual offence. You may hold only one Pearmo account.",
      },
      {
        type: "p",
        text: "Verification is optional, but it changes who you can meet: unverified accounts are shown other unverified accounts, and sharing photos in a chat requires both people to be verified. If we believe a submission is not genuine, we may refuse or close the account.",
      },
    ],
  },
  {
    id: "conduct",
    heading: "How you must behave",
    blocks: [
      {
        type: "p",
        text: "Pearmo exists so people can meet without being harassed or deceived. The following will get your account removed:",
      },
      {
        type: "list",
        items: [
          "Harassing, threatening, stalking, or abusing anyone.",
          "Impersonating someone else, or verifying with someone else's face or documents.",
          "Being under 18, or continuing to interact with anyone you believe to be under 18.",
          "Sharing another person's photos, messages, identity or personal details outside Pearmo, including anything revealed to you behind a consent gate.",
          "Sending sexual content to someone who has not asked for it.",
          "Soliciting money, running scams, promoting investments, or advertising commercial services.",
          "Sex work, trafficking, or any illegal activity.",
          "Scraping, reverse-engineering, or automating access to the service, or trying to get around verification, consent gates or the reporting system.",
          "Uploading malware, or interfering with the operation of the service.",
        ],
      },
      {
        type: "p",
        text: "If you see any of this, report it in the app. We read every report. Reporting someone also removes them from your matches permanently, so it is currently the strongest way to make sure you never see an account again. If someone is simply not for you, ending the connection is enough, and that is also permanent.",
      },
    ],
  },
  {
    id: "consent-features",
    heading: "Consent and what stays private",
    blocks: [
      {
        type: "p",
        text: "Chat opens only when both people accept the connection. Sharing photos or video inside a chat opens only when both people have consented to it and both accounts are verified. Consent to one thing is not consent to another, and consent can be withdrawn.",
      },
      {
        type: "p",
        text: "Anything another person reveals to you, including a photo, a phone number, an address or their real name, was shared with you and you alone. Passing it on, publishing it, or reposting it elsewhere is a serious breach of these terms and may also break the law.",
      },
    ],
  },
  {
    id: "your-content",
    heading: "Your content",
    blocks: [
      {
        type: "p",
        text: "You keep ownership of what you upload. You grant us a licence to host, store and display it as needed to run the service, such as showing your profile to a match or delivering a photo you chose to share. That licence ends when you delete the content or your account, apart from copies we must keep for safety or legal reasons.",
      },
      {
        type: "p",
        text: "You are responsible for having the right to upload what you upload.",
      },
    ],
  },
  {
    id: "safety-disclaimer",
    heading: "Verification is not a guarantee",
    blocks: [
      {
        type: "p",
        text: "Verification confirms that an account is operated by a real, live person whose face matches the selfie we reviewed. That is all it confirms. It is not a criminal background check (we do not run any, on anyone), and it is not a judgement of character. We cannot vouch for how anybody will behave.",
      },
      {
        type: "p",
        text: "The safety check-in is an alarm on your own phone. Pearmo does not call, text or notify anyone if you miss it, including the contact you noted down. It is a reminder, not a safety net, and it is described that way in the app.",
      },
      {
        type: "p",
        text: "Meeting people from the internet carries risk. Meet in public, tell an actual human being where you are going, and trust your instincts. You are responsible for your own safety when you interact with other people, online or in person.",
      },
    ],
  },
  {
    id: "our-content",
    heading: "Our intellectual property",
    blocks: [
      {
        type: "p",
        text: "The Pearmo name, logo, character artwork, questionnaire, matching approach, software and site design belong to us or our licensors. You may not copy, resell or adapt them without our written permission.",
      },
    ],
  },
  {
    id: "third-party",
    heading: "Third-party services",
    blocks: [
      {
        type: "p",
        text: "Pearmo runs on other companies' infrastructure, including hosting, database, file storage and SMS delivery. Their outages or errors can break Pearmo, and their own terms may apply to those parts of the service. They are named in the privacy policy.",
      },
    ],
  },
  {
    id: "termination",
    heading: "Suspension and closing your account",
    blocks: [
      {
        type: "p",
        text: "You can delete your account at any time from inside the app; the privacy policy explains exactly what that removes and what it keeps. We may suspend or close an account if these terms are breached, if the law requires it, or if we believe an account puts other people at risk. Where it is safe and lawful to do so, we will tell you why.",
      },
    ],
  },
  {
    id: "liability",
    heading: "Disclaimers and limits on our liability",
    blocks: [
      {
        type: "p",
        text: "Pearmo is provided as it is. We do not promise that you will find a match, that the service will be uninterrupted, or that it will be free of bugs. It is early software and it is not finished.",
      },
      {
        type: "p",
        text: "To the extent the law allows, we are not liable for the conduct of other users, for anything that happens when you meet someone, or for indirect or consequential loss. Nothing here limits liability that cannot be limited under Sri Lankan law, including for death or personal injury caused by our negligence, or for fraud.",
      },
    ],
  },
  {
    id: "governing-law",
    heading: "Governing law",
    blocks: [
      {
        type: "p",
        text: "These terms are governed by the laws of Sri Lanka, and the courts of Sri Lanka have jurisdiction over any dispute arising from them.",
      },
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    blocks: [
      {
        type: "p",
        text: "We may update these terms as the service develops. We will change the date at the top, and for material changes we will notify you before they take effect. Continuing to use Pearmo after that means you accept the updated terms.",
      },
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    blocks: [
      {
        type: "p",
        text: `Questions about these terms, or about your data: ${legalFacts.contactEmail}.`,
      },
    ],
  },
];

/* ────────────────────────────────────────────────────────────────────────── */
/*  BETA TERMS                                                                */
/* ────────────────────────────────────────────────────────────────────────── */

export const betaTerms: readonly LegalSection[] = [
  {
    id: "what-this-is",
    heading: "What this is",
    blocks: [
      {
        type: "p",
        text: `Pearmo is a dating app being built in Sri Lanka. It is not finished. We are inviting a small group of people to test an early build and tell us what breaks and what feels wrong. It is free, and there is no company behind it, just ${legalFacts.operators}, two people in ${legalFacts.location}.`,
      },
      {
        type: "p",
        text: "This page is where you find out what you are signing up for. If you consent on the signup form, we email you an Android APK file to install by hand.",
      },
      {
        type: "p",
        text: "Read it properly before you tick anything. If something here is not acceptable to you, don't join. That is a completely fine outcome, and we would rather know now than after you have installed it.",
      },
      {
        type: "p",
        text: `Anything at all, including a bug, a question or a request to be removed: ${legalFacts.contactEmail}. It reaches both of us and nobody else.`,
      },
    ],
  },
  {
    id: "eligibility",
    heading: "Who can take part",
    blocks: [
      {
        type: "p",
        text: "You can take part only if all of these are true:",
      },
      {
        type: "list",
        items: [
          "You are 18 or older. This is a hard requirement with no exceptions, and it is the one thing on this list we cannot check. ID verification is switched off for this test, so we are trusting you.",
          "You are in Sri Lanka for the duration of the beta.",
          "You have an Android phone running Android 7.0 or newer. There is no iPhone build yet.",
          "You have a Sri Lankan mobile number that can receive an SMS, because that is how you sign in.",
          "You are joining as yourself, with real information about yourself, and one account only.",
        ],
      },
    ],
  },
  {
    id: "what-the-app-does",
    heading: "What the app does",
    blocks: [
      {
        type: "p",
        text: "Pearmo is a slow, curated dating app. There is no swiping.",
      },
      {
        type: "list",
        items: [
          "Sign in with your phone number. You get an SMS code, not a password.",
          "Onboarding: you answer a personality questionnaire, set who and what you are looking for, and pick an animal character.",
          "Daily matches: each day you get a small set of suggested people, scored against your questionnaire answers. There are no photos to look at.",
          "Connections: you send or receive a connection request. Nobody can message you unless you both agree.",
          "Icebreaker games such as would-you-rather, 20 questions and draw together, which you can play at any point in a connection. Early chat is capped at a small number of messages.",
          "Verification: optional, and in this test it is a selfie and a liveness check only. Verified accounts get a badge.",
          "Reporting and rating: you can report someone, and rate a connection after it ends. Ratings feed an internal trust score.",
          "A check-in you can set around a date. Read the limitations section before you rely on it. It does not do what the name suggests.",
        ],
      },
      {
        type: "p",
        text: "The beta is free. There are no payments, subscriptions or card details anywhere in it.",
      },
    ],
  },
  {
    id: "beta-scope",
    heading: "What is switched off for this test",
    blocks: [
      {
        type: "list",
        items: [
          "National identity document verification. We do not ask for your NIC, and we could not store it if you tried. ID verification comes after the beta.",
          "Profile photos. Your profile is an animal character, and there are no photos in this test at all, not on profiles and not in chat.",
          "Voice intro recordings.",
          "Payments of any kind.",
        ],
      },
      {
        type: "p",
        text: "So the only verification in this test is the selfie and liveness check. The liveness step, where you centre your face, blink and turn your head, runs entirely on your own phone. No video is recorded, and nothing from it is ever uploaded. The selfie is looked at by one of us, by hand, to confirm you are a real person, and is then deleted. We keep the decision, not the picture. There is no verification company involved and no automatic face matching anywhere.",
      },
    ],
  },
  {
    id: "what-we-collect",
    heading: "What we collect and why",
    blocks: [
      {
        type: "p",
        text: "None of this is collected silently. It all comes from you using the app.",
      },
      { type: "h3", text: "Needed to use the app at all" },
      {
        type: "list",
        items: [
          "Mobile number, which is your account and how you sign in.",
          "Date of birth, used for age matching and the 18+ rule. Other people see your age, never the date.",
          "Gender, the genders you are open to, and your age range, used for matching only.",
          "Personality questionnaire answers. Your individual answers are not stored. Your phone turns them into six trait scores, and only those are saved.",
          "A short free-text piece about yourself, shown to your matches.",
          "The province or area you pick from a list, so you are matched with people you could actually meet. Pearmo does not use GPS. The app requests no location permission and we never see your position.",
          "Your animal character, shown to your matches.",
        ],
      },
      { type: "h3", text: "Optional" },
      {
        type: "list",
        items: [
          "A selfie, for verification, plus the yes/no result of the on-device liveness check.",
          "Check-in times, and any contact number you type into the check-in note.",
        ],
      },
      { type: "h3", text: "Recorded as you use the app" },
      {
        type: "list",
        items: [
          "Messages you send, stored on our server so we can deliver them.",
          "Icebreaker game answers, used to run the game.",
          "Reports you file and ratings you give, used for moderation and trust scoring.",
          "Basic account activity, such as when you were last active and how many matches you have had.",
        ],
      },
      {
        type: "p",
        text: "We do not read your phone contacts, we do not track your location in the background, and we do not connect to any social account. There is no analytics SDK, no advertising identifier and no crash reporter in the app.",
      },
      {
        type: "p",
        text: "Separately, the signup form is a Google Form with email collection switched on, so it records your Google account address as well as the answers you type. Those responses sit in a Google Sheet only the two of us can open, and we delete them when the beta ends.",
      },
    ],
  },
  {
    id: "where-data-goes",
    heading: "Where your data goes, and who can see it",
    blocks: [
      {
        type: "p",
        text: `Everything is stored in our Supabase project, a hosted Postgres database with file storage. The servers are in ${legalFacts.hostingRegion}, on Amazon Web Services infrastructure, so your data leaves Sri Lanka.`,
      },
      {
        type: "list",
        items: [
          `Your sign-in code is sent by ${legalFacts.smsProvider}, a Sri Lankan SMS gateway, which sees your phone number. It is the only part of this chain physically inside Sri Lanka.`,
          "Verification selfies sit in private storage and are reached only through short-lived signed links.",
          "Messages are stored in our database in plain text. Pearmo is not end-to-end encrypted. Assume we can technically read them, because we can.",
          "The two of us can access the whole database, including chat contents. We open it to debug something, to look at a report, or to review a verification. We will not browse your data out of curiosity and we will not show it to anyone outside the two of us.",
          "Verification selfies are reviewed by a person, one of us, not by any automated system.",
          "We may use anonymised, aggregated patterns from the test, such as “x% of testers stopped during onboarding”, to improve the product and in material we show investors. Your name, number, selfie, messages and profile are never part of that.",
          "We may email you during the beta about new builds, bugs and feedback. Nothing else, and never marketing from anyone but us.",
        ],
      },
      {
        type: "p",
        text: "Other testers see your age, your character, your about text, the traits your questionnaire produced, and your general area. They never see your phone number, your exact date of birth, your individual questionnaire answers, who you are open to, or your selfie.",
      },
      {
        type: "p",
        text: "The trust score is used internally to decide who gets shown to whom. It is not displayed anywhere in the app.",
      },
    ],
  },
  {
    id: "limitations",
    heading: "Known limitations: please read this part",
    blocks: [
      {
        type: "p",
        text: "We would rather over-disclose than let you assume protections that do not exist yet. Every item here is something we know is missing.",
      },
      {
        type: "list",
        items: [
          "The app is installed outside the Play Store. You will have to allow installation from an unknown source, it will not update itself, and it has not been through Google's review. We will email you each new build.",
          "There is no automated harassment filtering in chat. The report button is the safety mechanism, and reports are read by a person when we see them, not instantly and not around the clock.",
          "There is no screenshot detection or blocking. Anything you send can be screenshotted or copied by the person you send it to. Treat everything as potentially permanent and send accordingly.",
          "There is no block button. Reporting someone removes them from your matches permanently, and ending a connection is also permanent. Those are your two options today. A proper block feature is not built yet.",
          "The check-in does not contact anyone. You can set a time and type in a number, but nothing calls, texts or alerts that person, and the alarm only sounds on your own phone. Do not rely on it as a safety net. Tell a real person where you are going, as you would anyway.",
          "Verification is not a background check. The badge means one of us looked at a selfie and believed a real person took it. It does not mean they are who they say they are (ID checking is off in this test), and it does not mean they are safe, single or honest. We do not check criminal records on anyone.",
          "Matching is experimental. The questionnaire and the algorithm are unproven. Bad matches are expected and are not a claim about you or anyone else.",
          "Expect bugs, crashes, failed uploads, missing notifications and lost messages. Some flows are half-built.",
          "We may reset the database during the test. Your profile, matches and chat history could be wiped without warning while we fix things. Do not keep anything in Pearmo that you would hate to lose.",
          "We cannot guarantee everyone here is who they say they are. The group is small and invite-only, which helps, but it is not a guarantee.",
        ],
      },
    ],
  },
  {
    id: "other-testers",
    heading: "The other testers are real people",
    blocks: [
      {
        type: "p",
        text: "This is not a demo with fake profiles. You will have a real profile, you will be matched with other real testers, and you can genuinely end up talking to someone. Harassment, impersonation, unsolicited sexual content, scams, and sharing other people's details outside the app will get you removed, and in a group this small, we will notice.",
      },
      {
        type: "p",
        text: "Because it is a small group, there is a real chance you will be matched with someone you know, or someone who knows someone you know. Please think about that before you join rather than after.",
      },
      {
        type: "p",
        text: "Report anything that needs reporting. We read every report and we will act on it even when it is inconvenient for the test.",
      },
    ],
  },
  {
    id: "safety",
    heading: "Your safety is still your own",
    blocks: [
      {
        type: "p",
        text: "Pearmo introduces people. What happens after that is outside our control and outside our responsibility. If you meet someone from the app:",
      },
      {
        type: "list",
        items: [
          "Meet somewhere public, the first few times at least.",
          "Tell a friend or a family member where you are going and who with. Tell an actual person, not the app.",
          "Arrange your own transport.",
          "Never send money to anyone, for any reason.",
          "Do not share your NIC number, bank details, home address or workplace early.",
          "If someone makes you uncomfortable, report them in the app and email us directly.",
        ],
      },
      {
        type: "p",
        text: "If you are ever in immediate danger, call the Sri Lanka Police on 119. Not us. We are two people with a laptop, and we cannot help you in an emergency.",
      },
    ],
  },
  {
    id: "feedback",
    heading: "Feedback",
    blocks: [
      {
        type: "p",
        text: "Telling us what broke is the job. We would rather have blunt feedback now than a polite version of it after launch.",
      },
      {
        type: "list",
        items: [
          "You give us permission to use your feedback to improve Pearmo, without owing you anything for it. Nothing you suggest creates a claim on the product.",
          "We will not quote you publicly, even anonymously, unless you ticked the box on the signup form saying we may. You can change your mind by emailing us.",
          "We will never attach your name, number or profile to anything we publish.",
        ],
      },
    ],
  },
  {
    id: "confidentiality",
    heading: "What you can and cannot share",
    blocks: [
      {
        type: "p",
        text: "This is not a secret project and we are not asking you to sign an NDA. You can tell people you are testing Pearmo and what you think of it.",
      },
      {
        type: "p",
        text: "Please do not forward the APK to anyone. The build is tied to this group, it is unreviewed software, and it spreading around is bad for everyone including you.",
      },
      {
        type: "p",
        text: "What you must not do is share anything about another tester, including their character, their messages, their identity, screenshots of a conversation, or anything they told you inside the app. In a group this small, one screenshot can identify someone. Please also hold off on posting screenshots of unreleased screens publicly, since they will be out of date and misleading by launch.",
      },
    ],
  },
  {
    id: "your-choices",
    heading: "Your choices",
    blocks: [
      {
        type: "p",
        text: "Taking part is voluntary. You can stop at any time, for any reason, without explaining yourself to us.",
      },
      { type: "h3", text: "Pause" },
      {
        type: "p",
        text: "Settings has a switch that hides your profile from matching without deleting anything. Fully reversible.",
      },
      { type: "h3", text: "Delete" },
      {
        type: "p",
        text: "Settings, then Delete account. Be clear about what that does: your selfie and every file you uploaded are permanently deleted from storage, and your character, your about text and your profile are wiped. What is kept is your chat history, any reports about you, your ratings and your trust score. We do that on purpose. A full delete would let someone with a bad record erase it and sign up again clean. Messages you already sent also stay visible to the person you sent them to, because deleting them would delete their side of the conversation too. If you are not comfortable with that, please don't sign up.",
      },
      { type: "h3", text: "Ask us anything" },
      {
        type: "p",
        text: `Email ${legalFacts.contactEmail} to get a copy of your data, ask what we hold, correct something, or ask us to erase what we are able to erase. We aim to reply within seven days and will not take longer than the Personal Data Protection Act allows.`,
      },
    ],
  },
  {
    id: "ending",
    heading: "When the beta ends",
    blocks: [
      {
        type: "p",
        text: "When the closed beta finishes, we delete the beta data. Accounts, profiles, messages, connections, matches and any verification images created during the test are removed, not archived and not carried over. If Pearmo launches publicly you would sign up again from scratch, and we will tell you before we delete anything so nothing disappears as a surprise.",
      },
      {
        type: "p",
        text: "We can also end the beta, or remove any account from it, at any time and without notice, most likely because a build has a serious problem or because someone breached these terms.",
      },
      {
        type: "p",
        text: `You can leave whenever you like. Delete your account in the app, or email ${legalFacts.contactEmail} and we will remove you and your data.`,
      },
      {
        type: "p",
        text: "Taking part does not entitle you to free or discounted access later, though we would think poorly of ourselves if we did not look after the people who tested it first.",
      },
    ],
  },
  {
    id: "liability",
    heading: "Liability and governing law",
    blocks: [
      {
        type: "p",
        text: "The beta is provided as it is, free of charge, and explicitly without any promise that it works. To the extent Sri Lankan law allows, we are not liable for lost data, for the conduct of other testers, for anything that happens during or after a meeting arranged through the app, or for indirect or consequential loss. Nothing here limits liability that cannot be limited by law, including for death or personal injury caused by our negligence, or for fraud.",
      },
      {
        type: "p",
        text: "These terms are governed by the laws of Sri Lanka. The privacy policy applies in full alongside them.",
      },
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    blocks: [
      {
        type: "p",
        text: `Anything at all: ${legalFacts.contactEmail}.`,
      },
    ],
  },
];

/* ────────────────────────────────────────────────────────────────────────── */
/*  DATA DELETION                                                             */
/*  Google Play requires a publicly reachable URL describing account and      */
/*  data deletion, reachable without installing the app.                      */
/* ────────────────────────────────────────────────────────────────────────── */

export const dataDeletion: readonly LegalSection[] = [
  {
    id: "in-app",
    heading: "Deleting your account in the app",
    blocks: [
      {
        type: "p",
        text: "Open Pearmo, go to Settings, scroll to the bottom, and choose Delete account. It takes effect immediately and does not need our approval.",
      },
      {
        type: "p",
        text: "If you only want a break, the same screen has a pause switch that hides your profile from matching without deleting anything. It is fully reversible.",
      },
    ],
  },
  {
    id: "what-goes",
    heading: "What is deleted",
    blocks: [
      {
        type: "list",
        items: [
          "Every file you uploaded, including any verification selfie, any photo or any audio recording, removed from storage, not just unlinked from your profile.",
          "Your display name, the text about yourself, your character and your region.",
          "Your profile is switched off, so it disappears from matching and from anyone's cards immediately.",
          "Your verification badge resets to unverified.",
          "The file paths recorded against any verification you submitted.",
        ],
      },
    ],
  },
  {
    id: "what-stays",
    heading: "What is kept, and why",
    blocks: [
      {
        type: "list",
        items: [
          "Messages you sent stay visible to the person you sent them to. Deleting your side would delete their side of the same conversation, and we do not think one person should be able to erase someone else's history.",
          "Reports about you, ratings others gave you, your trust score and report count. If deleting your account erased these, anyone could clear a record of harassment by deleting and signing up again.",
          "The outcome of any verification review, including whether it was approved or rejected, and when. The image itself is deleted; only the decision remains.",
          "Anything we are legally required to keep.",
        ],
      },
      {
        type: "p",
        text: `If you want the messages gone too, email ${legalFacts.contactEmail} and ask. We will do it by hand. We cannot make that automatic, because it changes someone else's conversation.`,
      },
    ],
  },
  {
    id: "same-number",
    heading: "Signing up again",
    blocks: [
      {
        type: "p",
        text: "You can sign up again with the same phone number and build a completely fresh profile. Under the surface it is the same account, so the moderation record above stays attached to it, and you will need to verify again.",
      },
    ],
  },
  {
    id: "without-app",
    heading: "Deleting without the app",
    blocks: [
      {
        type: "p",
        text: `If you cannot install or open the app, email ${legalFacts.contactEmail} from any address and tell us the phone number on the account. We will verify it is yours, delete it, and confirm when it is done. You do not need an account or the app to make this request.`,
      },
      {
        type: "p",
        text: "The same address handles every other request under Sri Lanka's Personal Data Protection Act No. 9 of 2022, including a copy of your data, a correction or a withdrawal of consent.",
      },
    ],
  },
  {
    id: "beta-and-waitlist",
    heading: "Beta testers and waitlist",
    blocks: [
      {
        type: "p",
        text: `If you filled in the closed beta signup form, your answers are in a private Google Sheet. Email ${legalFacts.contactEmail} and we will remove that row as well. Deleting your app account does not touch it, because it is a separate system.`,
      },
      {
        type: "p",
        text: "When the closed beta ends, we delete the beta test data outright: accounts, profiles, messages, connections and any remaining verification images.",
      },
      {
        type: "p",
        text: "If you joined the website waitlist, email us and we will delete your address. We use it for one message: telling you Pearmo has launched.",
      },
    ],
  },
];
