import type { Metadata } from "next";

import { HomePage } from "@/components/HomePage";
import { DesignSwitcher } from "@/designs/DesignSwitcher";

// PREVIEW ONLY: the live home page (design C) with the switcher on top.
export const metadata: Metadata = {
  title: "Design C preview",
  robots: { index: false, follow: false },
};

export default function DesignCPage() {
  return (
    <>
      <DesignSwitcher current="c" />
      <HomePage />
    </>
  );
}
