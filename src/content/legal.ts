/**
 * Privacy policy and terms of service content.
 *
 * ⚠️  DRAFT — NOT LEGAL ADVICE. Written to describe what Pearmo actually does
 * (avatar-only profiles, national ID + selfie liveness verification, Big Five
 * personality data, mutual-consent gates) and to name the obligations that
 * follow from that under Sri Lanka's Personal Data Protection Act No. 9 of
 * 2022. A qualified lawyer must review both documents before launch, and
 * before the app is submitted to Google Play or the App Store.
 *
 * Known gaps a lawyer or the team must close:
 *   - The registered legal entity name and business address.
 *   - The identity of the ID/liveness verification vendor (a data processor
 *     handling sensitive biometric data — it must be named).
 *   - The biometric-data retention period, once decided.
 *   - Whether personal data leaves Sri Lanka, and on what transfer basis.
 *   - Whether a Data Protection Officer is appointed under the PDPA.
 *   - Confirmation of pricing/subscription terms before any are described.
 */

export const LEGAL_LAST_UPDATED = "2026-07-30";

export const LEGAL_LAST_UPDATED_LABEL = "30 July 2026";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: readonly string[] };

export type LegalSection = {
  id: string;
  heading: string;
  blocks: readonly LegalBlock[];
};

/** Shown at the top of both documents. Deliberately impossible to miss. */
export const DRAFT_NOTICE =
  "This is a pre-launch draft, published for transparency while Pearmo is in development. It has not yet been reviewed by a lawyer and is not a final legal agreement. If anything here matters to a decision you're making, email us and ask.";

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
          "You appear to other users as an animal avatar. We do not publish your photos, and there is no public photo grid.",
          "We verify your identity with a government ID and a selfie liveness check. That data is used to confirm you are real and over 18 — it is never shown on your profile.",
          "Your personality trait scores are visible only to you. Matches never see them. Compatibility is calculated on our side.",
          "Chat, photo reveals, calls, location and contact details are each locked until both people agree.",
          "We do not sell your personal data, and we do not use it for advertising.",
          "You can request a copy of your data, correct it, or ask us to delete it.",
        ],
      },
      {
        type: "p",
        text: "The rest of this page is the detail behind those points. It covers both this website and the Pearmo mobile app.",
      },
    ],
  },
  {
    id: "who-we-are",
    heading: "Who we are",
    blocks: [
      {
        type: "p",
        text: "Pearmo is a dating service published by Emberloft Software, operating from Colombo, Sri Lanka, and launching first in Sri Lanka. For the purposes of Sri Lanka's Personal Data Protection Act No. 9 of 2022, we are the controller of the personal data described here.",
      },
      {
        type: "p",
        text: "For any question about this policy, or to exercise any of the rights described below, contact privacy@pearmo.com.",
      },
    ],
  },
  {
    id: "what-we-collect",
    heading: "What we collect, and why",
    blocks: [
      { type: "h3", text: "Account information" },
      {
        type: "p",
        text: "Your email address, and a phone number if you sign in with one. We need this to create your account, sign you in, and contact you about the service. If you join the waitlist on this website, we collect only your email address, and only to tell you when Pearmo launches.",
      },
      { type: "h3", text: "Identity and age verification" },
      {
        type: "p",
        text: "A photograph or scan of a government-issued identity document, and a short selfie video or image used for a liveness check. Under the PDPA, the biometric data derived from the liveness check is sensitive personal data, and we treat it accordingly:",
      },
      {
        type: "list",
        items: [
          "It is used for one purpose only — confirming that you are a real, living person and that you are at least 18 years old.",
          "It is never displayed on your profile, and never shared with other users. Other users see only whether your account is verified.",
          "It is not used for facial recognition against other users, for advertising, or for training machine-learning models.",
          "It is processed by a specialist verification provider acting on our instructions. Once verification completes, we retain the verification result and keep the underlying document and biometric images only for as long as we are required to.",
        ],
      },
      { type: "h3", text: "Personality questionnaire responses" },
      {
        type: "p",
        text: "Your answers to the Pearmo questionnaire, and the six trait scores derived from them (openness, conscientiousness, extraversion, agreeableness, emotional stability and attachment security). These are used to calculate compatibility with other users. Your scores are shown to you and to no one else — matches never see them, and we do not publish them.",
      },
      { type: "h3", text: "Profile content" },
      {
        type: "p",
        text: "The avatar you choose, your display name, age, the city or area you are in, what you are looking for, the age range you are open to, what you value in a partner, your music preferences, and anything else you choose to add. This is the information other users see, so treat it as public within Pearmo.",
      },
      { type: "h3", text: "Private photos" },
      {
        type: "p",
        text: "Photos you upload for a possible reveal. These are stored privately and are not visible to anyone until you choose to share them with a specific match and that match consents to the reveal.",
      },
      { type: "h3", text: "Messages and interactions" },
      {
        type: "p",
        text: "Messages you exchange after chat unlocks, icebreaker game results, and records of which consent gates you and a match have opened. We keep these to operate the service, to support you if something goes wrong, and to investigate reports of abuse.",
      },
      { type: "h3", text: "Safety information" },
      {
        type: "p",
        text: "If you use the date safety check-in, the emergency contact details you provide and the check-in details you choose to share. This is used only for that feature.",
      },
      { type: "h3", text: "Technical and usage data" },
      {
        type: "p",
        text: "Device type, operating system, app version, approximate location derived from your IP address, crash reports, and how you use the app. We use this to keep the service working, to fix bugs, and to detect fraudulent or abusive accounts.",
      },
      { type: "h3", text: "This website" },
      {
        type: "p",
        text: "pearmo.com uses Vercel Analytics and Vercel Speed Insights to count page views and measure loading performance. Both are cookieless and do not build a profile of you across sites, which is why this site shows no cookie banner. We do not run advertising trackers here.",
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
          "Performance of our agreement with you — creating and running your account, matching you with other users, and delivering the features you use.",
          "Your consent — for identity and biometric verification, for each photo reveal or contact-detail exchange, and for waitlist emails. You can withdraw consent at any time, though we cannot verify your account without the verification data.",
          "Our legitimate interests — keeping the platform safe, preventing fraud and impersonation, and improving the service, weighed against your privacy in each case.",
          "Legal obligations — where we are required to retain or disclose data by Sri Lankan law.",
        ],
      },
    ],
  },
  {
    id: "sharing",
    heading: "Who we share data with",
    blocks: [
      {
        type: "p",
        text: "We do not sell your personal data. We do not share it with advertisers. We share it only in these circumstances:",
      },
      {
        type: "list",
        items: [
          "Other users — but only the information described as profile content above, plus anything you consent to reveal to a specific match.",
          "Service providers acting on our instructions — identity verification, cloud hosting and storage, crash reporting, analytics, and email delivery. They may use your data only to provide their service to us.",
          "Law enforcement or regulators — where we are legally required to, or where we believe in good faith that disclosure is necessary to prevent serious harm.",
          "A successor — if the business is transferred, your data may transfer with it, subject to this policy.",
        ],
      },
    ],
  },
  {
    id: "retention",
    heading: "How long we keep it",
    blocks: [
      {
        type: "p",
        text: "We keep your account data for as long as your account is active. If you delete your account, we delete or irreversibly anonymise your personal data, except where we must keep something longer — for example, a record of a serious safety report, or data we are legally required to retain. Verification documents and biometric data are kept only as long as necessary for verification and any legal retention requirement, and are deleted after that.",
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
          "Have inaccurate or incomplete data corrected.",
          "Ask us to delete your personal data.",
          "Withdraw consent you previously gave, including for verification or waitlist emails.",
          "Object to processing we carry out on the basis of legitimate interests.",
          "Complain to Sri Lanka's data protection authority if you think we have handled your data unlawfully.",
        ],
      },
      {
        type: "p",
        text: "To exercise any of these, email privacy@pearmo.com. We will respond within the period the PDPA requires. We may need to verify who you are first, so that we do not disclose someone else's data to the wrong person.",
      },
    ],
  },
  {
    id: "security",
    heading: "Security",
    blocks: [
      {
        type: "p",
        text: "We encrypt data in transit, restrict internal access to personal data to the people who need it, and store verification and private photo data separately from profile data. No system is perfectly secure, and we will not pretend otherwise — but if a breach affects your personal data, we will notify you and the relevant authority as the PDPA requires.",
      },
    ],
  },
  {
    id: "age",
    heading: "Age requirement",
    blocks: [
      {
        type: "p",
        text: "Pearmo is strictly for people aged 18 and over. We verify age during identity verification. We do not knowingly collect data from anyone under 18, and if we discover an underage account we delete it and the associated data.",
      },
    ],
  },
  {
    id: "international",
    heading: "Where your data is processed",
    blocks: [
      {
        type: "p",
        text: "Some of our service providers process data outside Sri Lanka. Where that happens, we take steps to ensure the data remains protected to the standard this policy describes. We will name the countries and safeguards involved here before launch.",
      },
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    blocks: [
      {
        type: "p",
        text: "We will update this page when our practices change, and we will change the date at the top. If a change materially affects your rights, we will tell you directly rather than relying on you noticing.",
      },
    ],
  },
];

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
        text: "Pearmo is published by Emberloft Software, based in Colombo, Sri Lanka.",
      },
    ],
  },
  {
    id: "pre-launch",
    heading: "Pearmo is pre-launch",
    blocks: [
      {
        type: "p",
        text: "Pearmo has not been publicly released. Right now this website lets you join a waitlist, and nothing more. We want to be straightforward about what that means:",
      },
      {
        type: "list",
        items: [
          "Joining the waitlist does not create an account and does not guarantee you access.",
          "We have not announced a launch date, and we may change the launch plan, the feature set, or the markets we launch in.",
          "We have not announced pricing. If Pearmo introduces paid features, we will set out the terms before you are asked to pay anything.",
          "We may decide not to launch at all. If that happens, we will delete waitlist data.",
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
        text: "You must complete identity and liveness verification before you can match with anyone. If verification fails, or if we believe your documents are not genuine, we may refuse or close your account.",
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
          "Impersonating someone else, or using another person's identity documents.",
          "Being under 18, or interacting with anyone you believe to be under 18.",
          "Sharing another user's photos, messages, identity or personal details outside Pearmo, including anything revealed to you under a consent gate.",
          "Sending sexual content to someone who has not asked for it.",
          "Soliciting money, running scams, promoting investments, or advertising commercial services.",
          "Sex work, trafficking, or any illegal activity.",
          "Scraping, reverse-engineering, or automating access to the service, or attempting to circumvent verification or consent gates.",
          "Uploading malware, or interfering with the operation of the service.",
        ],
      },
      {
        type: "p",
        text: "If you see any of this, report it in the app. We investigate reports and act on them.",
      },
    ],
  },
  {
    id: "consent-features",
    heading: "Consent, reveals and what stays private",
    blocks: [
      {
        type: "p",
        text: "Chat, photo reveals, calls, location and contact details each unlock only when both people agree. Consent to one thing is not consent to another, and consent can be withdrawn.",
      },
      {
        type: "p",
        text: "Anything another user reveals to you — a photo, a phone number, an address, their real name — is shared with you and you alone. Passing it on, publishing it, or screenshotting it elsewhere is a serious breach of these terms and may also break the law.",
      },
    ],
  },
  {
    id: "your-content",
    heading: "Your content",
    blocks: [
      {
        type: "p",
        text: "You keep ownership of what you upload. You grant us a licence to host, store and display it as needed to operate the service — for example, showing your profile to a match, or delivering a photo you chose to reveal. That licence ends when you delete the content or your account, apart from copies we must keep for safety or legal reasons.",
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
        text: "Identity verification confirms that an account belongs to a real person of the stated age. It is not a criminal background check, and it is not a judgement of character. We cannot vouch for how anyone will behave.",
      },
      {
        type: "p",
        text: "Meeting people from the internet carries risk. Meet in public, tell someone where you are going, use the date safety check-in, and trust your instincts. You are responsible for your own safety when you interact with other users, online or in person.",
      },
    ],
  },
  {
    id: "our-content",
    heading: "Our intellectual property",
    blocks: [
      {
        type: "p",
        text: "The Pearmo name, logo, avatar artwork, questionnaire, matching approach, software and site design belong to us or our licensors. You may not copy, resell or adapt them without our written permission.",
      },
    ],
  },
  {
    id: "third-party",
    heading: "Third-party services",
    blocks: [
      {
        type: "p",
        text: "Some features rely on other companies — identity verification, cloud hosting, and music data among them. Their outages or errors can affect Pearmo, and their own terms may apply to your use of those parts of the service.",
      },
    ],
  },
  {
    id: "termination",
    heading: "Suspension and closing your account",
    blocks: [
      {
        type: "p",
        text: "You can delete your account at any time. We may suspend or close an account if these terms are breached, if we are required to by law, or if we believe an account puts other users at risk. Where it is safe and lawful to do so, we will tell you why.",
      },
    ],
  },
  {
    id: "liability",
    heading: "Disclaimers and limits on our liability",
    blocks: [
      {
        type: "p",
        text: "Pearmo is provided as it is. We do not promise that you will find a match, that the service will be uninterrupted, or that it will be free of bugs.",
      },
      {
        type: "p",
        text: "To the extent the law allows, we are not liable for the conduct of other users, for anything that happens when you meet someone, or for indirect or consequential loss. Nothing here limits liability that cannot be limited under Sri Lankan law — including for death or personal injury caused by our negligence, or for fraud.",
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
        text: "Questions about these terms: hello@pearmo.com. Questions about your data: privacy@pearmo.com.",
      },
    ],
  },
];
