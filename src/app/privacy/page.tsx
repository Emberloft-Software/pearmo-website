import type { Metadata } from "next";

import { LegalDocument } from "@/components/LegalDocument";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema, WebPageSchema } from "@/components/seo/JsonLd";
import { LEGAL_LAST_UPDATED, privacyPolicy } from "@/content/legal";
import { buildAlternates } from "@/lib/site";

const title = "Privacy policy";
const description =
  "How Pearmo handles your data: avatar-only profiles, ID and liveness verification, private personality scores, and consent gates. Your rights under Sri Lanka's PDPA.";

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates("/privacy"),
  openGraph: {
    title: `${title} · Pearmo`,
    description,
    url: "/privacy",
    type: "article",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <LegalDocument
        title={title}
        intro="Pearmo is a dating app built on the idea that you shouldn't have to make your face, or your personality profile, public to meet someone. This page explains exactly what we collect, why, who sees it, and what you can ask us to do about it."
        sections={privacyPolicy}
      />
      <Footer />

      <WebPageSchema
        title={title}
        description={description}
        path="/privacy"
        datePublished={LEGAL_LAST_UPDATED}
        dateModified={LEGAL_LAST_UPDATED}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: title, path: "/privacy" },
        ]}
      />
    </>
  );
}
