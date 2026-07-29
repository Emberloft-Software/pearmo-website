import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { how } from "@/content/site-content";

export function HowItWorks() {
  return (
    <section id="how" className="py-[100px]">
      <div className="mx-auto w-[min(1160px,92vw)]">
        <div className="max-w-[640px]">
          <Reveal as="p" className="kicker">
            {how.kicker}
          </Reveal>
          <Reveal
            as="h2"
            delay={0.08}
            className="mt-[18px] mb-4 text-[clamp(30px,4.6vw,52px)] leading-[1.04] font-extrabold tracking-[-0.025em]"
          >
            {how.titleLead}{" "}
            <span className="serif-accent">{how.titleEmphasis}</span>
          </Reveal>
          <Reveal
            as="p"
            delay={0.16}
            className="text-mute max-w-[56ch] text-[clamp(16px,1.6vw,19px)] leading-[1.6]"
          >
            {how.lead}
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-[22px] md:grid-cols-2">
          {how.steps.map((step, i) => (
            <Reveal
              key={step.num}
              as="li"
              delay={(i % 2) * 0.08}
              className="border-line hover:shadow-glow group flex flex-col overflow-hidden rounded-card border bg-card px-[30px] pt-[34px] transition-all duration-400 hover:-translate-y-1.5"
            >
              <div>
                <span className="text-magenta mb-3.5 block font-mono text-xs tracking-[0.2em]">
                  {step.num}
                </span>
                <h3 className="mb-2.5 text-[clamp(20px,2vw,25px)] tracking-[-0.02em] font-bold">
                  {step.title}
                </h3>
                <p className="text-mute max-w-[44ch] text-[15px] leading-[1.6]">
                  {step.body}
                </p>
              </div>

              <div className="phone-frame mx-auto mt-[26px] w-[min(250px,72%)] translate-y-3.5 transition-transform duration-500 ease-[cubic-bezier(0.2,0.65,0.25,1)] group-hover:translate-y-0.5">
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={how.shotWidth}
                  height={how.shotHeight}
                  loading="lazy"
                  sizes="250px"
                />
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
