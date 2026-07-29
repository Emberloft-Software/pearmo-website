import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { showcase } from "@/content/site-content";

export function Showcase() {
  return (
    <section id="showcase" className="py-[100px]">
      <div className="mx-auto w-[min(1160px,92vw)]">
        <div className="max-w-[640px]">
          <Reveal as="p" className="kicker">
            {showcase.kicker}
          </Reveal>
          <Reveal
            as="h2"
            delay={0.08}
            className="mt-[18px] mb-4 text-[clamp(30px,4.6vw,52px)] leading-[1.04] font-extrabold tracking-[-0.025em]"
          >
            {showcase.titleLead}{" "}
            <span className="serif-accent">{showcase.titleEmphasis}</span>{" "}
            {showcase.titleTrail}
          </Reveal>
          <Reveal
            as="p"
            delay={0.16}
            className="text-mute max-w-[56ch] text-[clamp(16px,1.6vw,19px)] leading-[1.6]"
          >
            {showcase.lead}
          </Reveal>
        </div>

        {/* The featured card spans both rows of the left column on desktop. */}
        <ul className="mt-[52px] grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:grid-rows-2">
          {showcase.cards.map((card, i) => (
            <Reveal
              key={card.title}
              as="li"
              delay={i * 0.08}
              className={`border-line hover:shadow-glow group flex flex-col overflow-hidden rounded-card border bg-card transition-all duration-400 hover:-translate-y-1.5 ${
                card.featured ? "lg:col-start-1 lg:row-span-2" : "lg:col-start-2"
              }`}
            >
              <div
                className={`bg-violet-wash overflow-hidden ${
                  card.featured ? "aspect-4/3.1 lg:flex-1 lg:aspect-auto" : "aspect-4/3.1"
                }`}
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={card.width}
                  height={card.height}
                  loading="lazy"
                  sizes={
                    card.featured
                      ? "(max-width: 1024px) 92vw, 640px"
                      : "(max-width: 1024px) 92vw, 470px"
                  }
                  className="h-full w-full object-cover transition-transform duration-600 group-hover:scale-[1.035]"
                />
              </div>
              <div className="px-[26px] pt-[22px] pb-[26px]">
                <h3 className="mb-[7px] text-[18.5px] font-bold tracking-[-0.02em]">
                  {card.title}
                </h3>
                <p className="text-mute text-sm leading-[1.6]">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
