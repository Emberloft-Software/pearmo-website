import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { hero } from "@/content/site-content";

/** Decorative twinkling specks over the hero image. */
const SPARKS = [
  { top: "14%", left: "12%", size: 8, delay: "0s" },
  { top: "26%", left: "34%", size: 5, delay: "-1.3s" },
  { top: "10%", left: "58%", size: 6, delay: "-2.2s" },
  { top: "38%", left: "80%", size: 7, delay: "-3.1s" },
  { top: "55%", left: "22%", size: 5, delay: "-0.7s" },
] as const;

export function Hero() {
  return (
    <section id="top" className="relative overflow-clip pt-[130px] pb-[90px]">
      {/* Blurred colour blobs. aria-hidden — purely decorative. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-[140px] -left-[140px] h-[520px] w-[520px] animate-drift rounded-full bg-[#b9aef7] opacity-50 blur-[90px]" />
        <div className="absolute top-[10%] -right-[160px] h-[460px] w-[460px] animate-drift rounded-full bg-[#f2b2dd] opacity-50 blur-[90px] [animation-direction:reverse] [animation-duration:19s]" />
        <div className="absolute -bottom-[120px] left-[34%] h-[360px] w-[360px] animate-drift-slow rounded-full bg-[#dff59e] opacity-45 blur-[90px]" />
      </div>

      <div className="relative z-1 mx-auto grid w-[min(1160px,92vw)] items-center gap-14 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
        <div>
          <Reveal as="span" className="border-line text-ink-2 inline-flex items-center gap-2.5 rounded-full border bg-white px-4 py-2 font-mono text-[11px] tracking-[0.16em] uppercase shadow-[0_6px_18px_-10px_rgb(76_59_214/0.35)]">
            <i className="bg-magenta h-2 w-2 animate-pulse-ring rounded-full" aria-hidden="true" />
            {hero.badge}
          </Reveal>

          <Reveal as="h1" delay={0.08} className="mt-[22px] mb-5 text-[clamp(42px,6.4vw,82px)] leading-[0.98] font-extrabold tracking-[-0.035em]">
            {hero.titleLead}{" "}
            <span className="serif-accent text-gradient">{hero.titleEmphasis}</span>
            ,
            <br />
            {hero.titleMid}{" "}
            <span className="relative whitespace-nowrap">
              {hero.titleStruck}
              <svg
                viewBox="0 0 300 40"
                preserveAspectRatio="none"
                className="absolute top-[54%] -left-[2%] h-[0.42em] w-[104%] overflow-visible"
                aria-hidden="true"
              >
                <path
                  className="strike-path"
                  d="M4 24 C 60 10, 120 34, 170 20 S 270 16, 296 22"
                />
              </svg>
            </span>
            .
          </Reveal>

          <Reveal as="p" delay={0.16} className="text-mute mb-[30px] max-w-[56ch] text-[clamp(16px,1.6vw,19px)] leading-[1.6]">
            {hero.lead}
          </Reveal>

          <Reveal delay={0.24} className="flex flex-wrap items-center gap-3.5">
            <a
              href={hero.primaryCta.href}
              className="brand-gradient inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="bg-lime text-lime-ink inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
            >
              {hero.secondaryCta.label}
            </a>
          </Reveal>

          <Reveal delay={0.32} className="text-mute mt-[18px] flex items-center gap-2 text-[13px]">
            <span className="flex" aria-hidden="true">
              {hero.noteAvatars.map((slug, i) => (
                <Image
                  key={slug}
                  src={`/assets/avatars/${slug}.png`}
                  alt=""
                  width={26}
                  height={26}
                  className="border-bg -ml-2 h-[26px] w-[26px] rounded-full border-2 bg-white object-cover first:ml-0"
                  style={{ zIndex: hero.noteAvatars.length - i }}
                />
              ))}
            </span>
            {hero.note}
          </Reveal>
        </div>

        <Reveal delay={0.16} className="relative">
          <div className="shadow-chip absolute -top-[26px] right-[8%] z-2 flex animate-bob items-center gap-2.5 rounded-[18px] bg-white px-4 py-3">
            <Image
              src={`/assets/avatars/${hero.chipTop.avatar}.png`}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl bg-[#f0edfa] object-cover"
            />
            <div>
              <b className="block text-sm tracking-[-0.01em]">{hero.chipTop.name}</b>
              <span className="text-mute text-xs">{hero.chipTop.meta}</span>
            </div>
            <span className="bg-lime text-lime-ink rounded-[10px] px-2.5 py-1.5 font-mono text-[13px] font-medium">
              {hero.chipTop.match}
            </span>
          </div>

          <div className="shadow-glow relative rotate-2 overflow-hidden rounded-card transition-transform duration-500 hover:rotate-0 hover:scale-[1.01]">
            <div className="aspect-16/10 overflow-hidden">
              {/*
                The LCP element. `priority` preloads it; `sizes` stops Next
                serving a 1920px-wide file into a ~560px slot on mobile.
              */}
              <Image
                src={hero.image}
                alt={hero.imageAlt}
                width={hero.imageWidth}
                height={hero.imageHeight}
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 92vw, 550px"
                className="h-full w-full animate-kenburns object-cover"
              />
            </div>
            <div className="sheen-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
            {SPARKS.map((s, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="spark pointer-events-none absolute"
                style={{
                  top: s.top,
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  animationDelay: s.delay,
                }}
              />
            ))}
            <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-ink/72 px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] text-white uppercase backdrop-blur-[8px]">
              <i className="bg-lime inline-block h-[7px] w-[7px] rounded-full" aria-hidden="true" />
              {hero.imageTag}
            </span>
          </div>

          <div className="shadow-chip absolute -bottom-6 -left-[4%] z-2 flex animate-bob items-center gap-2.5 rounded-[18px] bg-white px-4 py-3 [animation-delay:-2.5s]">
            <Image
              src={`/assets/avatars/${hero.chipBottom.avatar}.png`}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl bg-[#f0edfa] object-cover"
            />
            <div>
              <b className="block text-sm tracking-[-0.01em]">{hero.chipBottom.name}</b>
              <span className="text-mute text-xs">{hero.chipBottom.meta}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
