import Image from "next/image";

import { WaitlistForm } from "@/components/WaitlistForm";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/content/site-content";

export function WaitlistCta() {
  return (
    <section id="waitlist" className="pt-[60px] pb-[110px]">
      <div className="mx-auto w-[min(1160px,92vw)]">
        <div className="relative overflow-hidden rounded-[36px] bg-ink px-[clamp(26px,6vw,80px)] py-[clamp(46px,7vw,90px)] text-center text-white">
          <div
            aria-hidden="true"
            className="brand-gradient absolute -top-[260px] left-1/2 h-[560px] w-[560px] -translate-x-1/2 animate-glow-pulse rounded-full blur-[120px]"
          />

          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
            {cta.floatingAvatars.map((slug, i) => (
              <Image
                key={slug}
                src={`/assets/avatars/${slug}.png`}
                alt=""
                width={74}
                height={74}
                loading="lazy"
                sizes="74px"
                className="absolute h-[74px] w-[74px] animate-bob-slow object-contain drop-shadow-[0_10px_20px_rgb(0_0_0/0.4)]"
                style={{
                  ...(i === 0 ? { left: "3%", top: "10%" } : {}),
                  ...(i === 1 ? { right: "3%", top: "12%", animationDelay: "-2s" } : {}),
                  ...(i === 2 ? { left: "5%", bottom: "8%", animationDelay: "-4s" } : {}),
                  ...(i === 3 ? { right: "5%", bottom: "10%", animationDelay: "-1s" } : {}),
                }}
              />
            ))}
          </div>

          {/* relative z-1 keeps the kicker above the blurred glow — without it
              the glow paints over the lime text and destroys its contrast. */}
          <Reveal as="p" className="kicker kicker-centered relative z-1 !text-lime [&::before]:!bg-lime">
            {cta.kicker}
          </Reveal>
          <Reveal
            as="h2"
            delay={0.08}
            className="relative z-1 mt-[18px] mb-4 text-[clamp(30px,4.6vw,52px)] leading-[1.04] font-extrabold tracking-[-0.025em] text-white"
          >
            {cta.titleLead}{" "}
            <span className="serif-accent text-gradient-lime">
              {cta.titleEmphasis}
            </span>
          </Reveal>
          <Reveal
            as="p"
            delay={0.16}
            className="relative z-1 mx-auto mb-[34px] max-w-[56ch] text-[clamp(16px,1.6vw,19px)] leading-[1.6] text-[#c9c2e0]"
          >
            {cta.lead}
          </Reveal>

          <Reveal delay={0.24} className="relative z-1">
            <WaitlistForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
