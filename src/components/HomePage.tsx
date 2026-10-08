import { NavGetApp } from "@/components/AppLinks";
import { AvatarStrip } from "@/components/sections/AvatarStrip";
import { Beta } from "@/components/sections/Beta";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { GetPearmo } from "@/components/sections/GetPearmo";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Icebreakers } from "@/components/sections/Icebreakers";
import { Nav } from "@/components/sections/Nav";
import { Personality } from "@/components/sections/Personality";
import { Safety } from "@/components/sections/Safety";
import { Why } from "@/components/sections/Why";
import { FaqSchema, MobileApplicationSchema } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

/**
 * The home page in design C ("Duet"). Order: the promise, who it's for and
 * why, how it works, the parts that reassure (personality privacy, safety,
 * FAQ), then the ask. The FAQ sits right before the beta section so doubts
 * are answered just before someone is asked for their number.
 */
export function HomePage() {
  return (
    <>
      <Nav getApp={<NavGetApp />} webAppUrl={site.webAppUrl} />
      <main id="main">
        <Hero />
        <AvatarStrip />
        <Why />
        <HowItWorks />
        <Icebreakers />
        <Personality />
        <Safety />
        <Faq />
        <Beta />
        <GetPearmo />
      </main>
      <Footer />

      <MobileApplicationSchema />
      <FaqSchema />
    </>
  );
}
