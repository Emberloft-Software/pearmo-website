import type { Metadata } from "next";

import { LegalDocument } from "@/components/LegalDocument";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema, WebPageSchema } from "@/components/seo/JsonLd";
import { BETA_NOTICE, LEGAL_LAST_UPDATED, betaTerms } from "@/content/legal";
import { buildAlternates } from "@/lib/site";

const title = "Beta terms";
const description =
  "Terms for the Pearmo invite-only closed beta: what is switched off, what will break, how your data is handled, and how to leave.";

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates("/beta-terms"),
  openGraph: {
    title: `${title} · Pearmo`,
    description,
    url: "/beta-terms",
    type: "article",
  },
};

export default function BetaTermsPage() {
  return (
    <>
      <LegalDocument
        title={title}
        intro="The Pearmo closed beta is a small, invite-only test of an unfinished dating app. This page is the agreement for taking part: what you are signing up for, what is switched off, what will probably break, and what happens to your data when the test ends."
        sections={betaTerms}
        notice={BETA_NOTICE}
        noticeLabel="Closed beta only."
      />
      <Footer />

      <WebPageSchema
        title={title}
        description={description}
        path="/beta-terms"
        datePublished={LEGAL_LAST_UPDATED}
        dateModified={LEGAL_LAST_UPDATED}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: title, path: "/beta-terms" },
        ]}
      />
    </>
  );
}
