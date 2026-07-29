import type { Metadata } from "next";

import { LegalDocument } from "@/components/LegalDocument";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema, WebPageSchema } from "@/components/seo/JsonLd";
import { LEGAL_LAST_UPDATED, termsOfService } from "@/content/legal";
import { buildAlternates } from "@/lib/site";

const title = "Terms of service";
const description =
  "The rules for using Pearmo: who can join, how you must treat other people, what consent gates mean, and what we do and don't promise while the app is pre-launch.";

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates("/terms"),
  openGraph: {
    title: `${title} · Pearmo`,
    description,
    url: "/terms",
    type: "article",
  },
};

export default function TermsPage() {
  return (
    <>
      <LegalDocument
        title={title}
        intro="Plain-language terms for a service that hasn't launched yet. The short version: be 18 or older, be who you say you are, treat people decently, and don't pass on anything someone reveals to you in confidence."
        sections={termsOfService}
      />
      <Footer />

      <WebPageSchema
        title={title}
        description={description}
        path="/terms"
        datePublished={LEGAL_LAST_UPDATED}
        dateModified={LEGAL_LAST_UPDATED}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: title, path: "/terms" },
        ]}
      />
    </>
  );
}
