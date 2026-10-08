import type { Metadata } from "next";

import { HomePage } from "@/components/HomePage";
import { buildAlternates, site } from "@/lib/site";

export const metadata: Metadata = {
  // The homepage keeps the default title from the layout rather than the
  // "%s · Pearmo" template — no reason to say Pearmo twice.
  alternates: buildAlternates("/"),
  description: site.metaDescription,
};

export default function Page() {
  return <HomePage />;
}
