import type { Metadata } from "next";

import { AvatarMarquee } from "@/components/sections/AvatarMarquee";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { IcebreakerScene } from "@/components/sections/IcebreakerScene";
import { Nav } from "@/components/sections/Nav";
import { Personality } from "@/components/sections/Personality";
import { Problem } from "@/components/sections/Problem";
import { Safety } from "@/components/sections/Safety";
import { Showcase } from "@/components/sections/Showcase";
import { WaitlistCta } from "@/components/sections/WaitlistCta";
import { FaqSchema, MobileApplicationSchema } from "@/components/seo/JsonLd";
import { buildAlternates, site } from "@/lib/site";

export const metadata: Metadata = {
  // The homepage keeps the default title from the layout rather than the
  // "%s · Pearmo" template — no reason to say Pearmo twice.
  alternates: buildAlternates("/"),
  description: site.metaDescription,
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <AvatarMarquee />
        <Problem />
        <HowItWorks />
        <IcebreakerScene />
        <Personality />
        <Safety />
        <Showcase />
        <Faq />
        <WaitlistCta />
      </main>
      <Footer />

      <MobileApplicationSchema />
      <FaqSchema />
    </>
  );
}
