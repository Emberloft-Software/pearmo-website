import type { Metadata } from "next";

import { DesignSwitcher } from "@/designs/DesignSwitcher";
import { HomeA } from "@/designs/a/HomeA";
import { bricolage, schibstedA } from "@/designs/a/fonts";

// PREVIEW ONLY. Delete src/app/design and src/designs together when done.
export const metadata: Metadata = {
  title: "Design A preview",
  robots: { index: false, follow: false },
};

export default function DesignAPage() {
  return (
    <>
      {/* Outside the design wrapper so its styles can't restyle the bar. */}
      <DesignSwitcher current="a" />
      <div className={`design-a ${bricolage.variable} ${schibstedA.variable}`}>
        <HomeA />
      </div>
    </>
  );
}
