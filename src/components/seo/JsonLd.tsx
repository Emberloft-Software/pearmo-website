import { faq } from "@/content/site-content";
import { absoluteUrl, site, socialProfiles } from "@/lib/site";

/**
 * Structured data (JSON-LD).
 *
 * Nodes are given stable @ids so they can reference each other, which is how
 * search engines resolve the site into a single entity (the organization
 * publishes the website, the website is about the app) instead of three
 * unrelated blobs.
 */

const ORG_ID = absoluteUrl("/#organization");
const SITE_ID = absoluteUrl("/#website");
const APP_ID = absoluteUrl("/#app");

/**
 * `</script>` inside a JSON string would otherwise close the tag early. The
 * content here is static, but escaping keeps this safe if any copy later
 * comes from an untrusted source.
 */
function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORG_ID,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        description: site.description,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/icon.svg"),
          caption: `${site.name} logo`,
        },
        parentOrganization: {
          "@type": "Organization",
          name: site.publisher,
        },
        // Geo signals: the strongest available substitute for a ccTLD when
        // launching a single-country product on a .com.
        areaServed: {
          "@type": "Country",
          name: site.country,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressCountry: site.countryCode,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: site.contactEmail,
          areaServed: site.countryCode,
          availableLanguage: ["English"],
        },
        ...(socialProfiles.length > 0 ? { sameAs: socialProfiles } : {}),
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": SITE_ID,
        name: site.name,
        alternateName: `${site.name} — ${site.tagline}`,
        url: site.url,
        description: site.metaDescription,
        inLanguage: site.lang,
        publisher: { "@id": ORG_ID },
        about: { "@id": APP_ID },
        // No site search exists, so SearchAction is deliberately omitted —
        // declaring one that doesn't work is worse than declaring none.
      }}
    />
  );
}

/**
 * The app itself. `MobileApplication` is the specific type search engines use
 * for app rich results; once the store listings exist, add `installUrl` and
 * `downloadUrl` here.
 */
export function MobileApplicationSchema() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "MobileApplication",
        "@id": APP_ID,
        name: site.name,
        applicationCategory: "SocialNetworkingApplication",
        applicationSubCategory: "Dating",
        operatingSystem: "Android, iOS",
        description: site.description,
        url: site.url,
        inLanguage: site.lang,
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        countriesSupported: site.country,
        isFamilyFriendly: false,
        contentRating: `${site.minimumAge}+`,
        // Pre-launch: no aggregateRating and no offers. Both would be
        // fabricated, and fabricated review markup is a manual-action risk.
        featureList: [
          "Anonymous animal avatars instead of public photos",
          "Big Five personality matching with reverse-scored items",
          "A few curated matches a day, no swiping",
          "Selfie liveness and national ID verification",
          "Mutual-consent gates for chat, photos, calls and location",
          "Icebreaker games that unlock messaging",
          "Shared music-taste matching",
          "Date safety check-in with an emergency contact",
        ],
      }}
    />
  );
}

/** Emitted alongside the on-page FAQ so the two never drift apart. */
export function FaqSchema() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": absoluteUrl("/#faq"),
        inLanguage: site.lang,
        isPartOf: { "@id": SITE_ID },
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: readonly { name: string; path: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

/** Used on the legal pages, which are documents rather than marketing pages. */
export function WebPageSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name: title,
        description,
        inLanguage: site.lang,
        isPartOf: { "@id": SITE_ID },
        publisher: { "@id": ORG_ID },
        datePublished,
        dateModified,
      }}
    />
  );
}
