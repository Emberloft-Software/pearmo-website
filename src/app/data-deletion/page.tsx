import type { Metadata } from "next";

import { LegalDocument } from "@/components/LegalDocument";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema, WebPageSchema } from "@/components/seo/JsonLd";
import { LEGAL_LAST_UPDATED, dataDeletion } from "@/content/legal";
import { buildAlternates } from "@/lib/site";

const title = "Deleting your data";
const description =
  "Delete your Pearmo account and data from the app or by email. See exactly what's removed, what's kept and why.";

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates("/data-deletion"),
  openGraph: {
    title: `${title} · Pearmo`,
    description,
    url: "/data-deletion",
    type: "article",
  },
};

/**
 * Google Play requires a publicly reachable account-deletion URL that works
 * without installing the app, so this must stay a plain indexable page — never
 * behind a login, and never merged into /privacy as an anchor.
 */
export default function DataDeletionPage() {
  return (
    <>
      <LegalDocument
        title={title}
        intro="You can delete your Pearmo account yourself, at any time, without asking us. This page explains how, exactly what disappears, and the few things that stay behind, along with the reason for each one."
        sections={dataDeletion}
        notice={null}
      />
      <Footer />

      <WebPageSchema
        title={title}
        description={description}
        path="/data-deletion"
        datePublished={LEGAL_LAST_UPDATED}
        dateModified={LEGAL_LAST_UPDATED}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: title, path: "/data-deletion" },
        ]}
      />
    </>
  );
}
