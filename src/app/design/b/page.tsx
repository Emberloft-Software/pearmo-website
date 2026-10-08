import type { Metadata } from "next";

import { DesignSwitcher } from "@/designs/DesignSwitcher";
import { HomeB } from "@/designs/b/HomeB";
import { instrumentSerifB, schibstedB } from "@/designs/b/fonts";

// PREVIEW ONLY. Delete src/app/design and src/designs together when done.
export const metadata: Metadata = {
  title: "Design B preview",
  robots: { index: false, follow: false },
};

export default function DesignBPage() {
  return (
    <>
      {/* Outside the design wrapper so its styles can't restyle the bar. */}
      <DesignSwitcher current="b" />
      <div className={`design-b ${instrumentSerifB.variable} ${schibstedB.variable}`}>
        <HomeB />
      </div>
    </>
  );
}
