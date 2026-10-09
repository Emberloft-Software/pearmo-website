import Image from "next/image";

import { StickySteps } from "@/components/ui/StickySteps";
import { Tag } from "@/components/ui/Tag";
import { h2, lead, wrap } from "@/components/ui/styles";
import { how } from "@/content/site-content";

/** One colourway per step, so the four read as distinct beats. */
const STEP_STYLE = [
  { card: "border border-line bg-white text-ink", num: "bg-lime text-ink", frame: "border-ink", body: "text-ink-2" },
  { card: "bg-lime text-ink", num: "bg-ink text-lime", frame: "border-ink", body: "text-ink-2" },
  { card: "bg-violet text-white", num: "bg-paper text-violet-deep", frame: "border-[#2b1c6e]", body: "text-on-violet" },
  { card: "bg-ink text-paper", num: "bg-violet text-white", frame: "border-[#3b3350]", body: "text-[#d9d3e8]" },
] as const;

function Shot({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={how.shotWidth}
      height={how.shotHeight}
      sizes={sizes}
      className="shot-crop h-auto w-full"
    />
  );
}

/**
 * How it works (the layout from direction A, restyled in C).
 *
 * Phones and tablets swipe through four cards, one colourway per step, each
 * led by its real app screen. Desktop gets the sticky phone (StickySteps).
 *
 * `content-visibility: auto` on the swipe row and the showcase: on slow
 * connections Chrome fetches "lazy" images up to 2500px ahead, so these
 * screenshots used to download during the first paint and push LCP back on
 * phones. Skipped content isn't laid out, so they now wait until it's near.
 */
export function HowItWorks() {
  return (
    <section id="how" className="pb-16 lg:pb-24">
      <div className={wrap}>
        <Tag>{how.kicker}</Tag>
        <h2 className={h2} data-split="">
          {how.titleLead} <span className="serif-accent">{how.titleEmphasis}</span>
        </h2>
        <p className={`${lead} mt-4.5 text-ink-2`}>{how.lead}</p>

        <div
          role="region"
          aria-label={`${how.kicker}, step by step`}
          tabIndex={0}
          className="-mx-4 mt-8 overflow-x-auto px-4 pb-2 [contain-intrinsic-size:auto_720px] [content-visibility:auto] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
        >
          <ol className="flex snap-x snap-mandatory scroll-px-4 gap-3.5">
            {how.steps.map((step, i) => {
              const s = STEP_STYLE[i % STEP_STYLE.length]!;
              return (
                <li
                  key={step.title}
                  className={`flex w-[82%] max-w-95 flex-none snap-start flex-col rounded-4xl p-5 ${s.card}`}
                >
                  <div
                    className={`mx-auto mb-5 h-75 w-full max-w-55 overflow-hidden rounded-[30px] border-[7px] ${s.frame}`}
                  >
                    <Shot src={step.image} alt={step.alt} sizes="220px" />
                  </div>
                  <span
                    className={`font-display mb-2.5 grid h-10 w-10 place-items-center rounded-full text-[18px] font-extrabold ${s.num}`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-display mb-2 text-[22px] leading-[1.15] font-extrabold tracking-tight">
                    {step.title}
                  </h3>
                  <p className={`text-[16px] leading-[1.55] ${s.body}`}>{step.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
        <p className="mt-2 text-[13.5px] text-mute lg:hidden" aria-hidden="true">
          Swipe for the next step →
        </p>

        <StickySteps
          steps={how.steps.map((s) => ({ title: s.title, body: s.body }))}
          shots={how.steps.map((s) => (
            <Shot key={s.image} src={s.image} alt={s.alt} sizes="280px" />
          ))}
        />

        <div
          className="mt-6 grid items-center gap-5 rounded-4xl bg-violet-soft p-5.5 [contain-intrinsic-size:auto_600px] [content-visibility:auto] lg:mt-14 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:py-7 lg:pr-12 lg:pl-7"
          data-reveal=""
        >
          <Image
            src={how.showcase.image}
            alt={how.showcase.alt}
            width={how.showcase.width}
            height={how.showcase.height}
            sizes="(min-width: 1024px) 720px, 92vw"
            className="h-auto w-full rounded-[22px]"
          />
          <div>
            <Tag>{how.showcase.kicker}</Tag>
            <h3 className="font-display mb-3 text-[30px] leading-[1.05] font-extrabold tracking-[-0.035em]">
              {how.showcase.title}
            </h3>
            <p className={`${lead} text-ink-2`}>{how.showcase.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
