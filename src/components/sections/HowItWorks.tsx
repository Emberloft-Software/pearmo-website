import Image from "next/image";

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

/**
 * Four steps, each with the real app screen peeking up from the bottom of its
 * block. The screens drift slightly on scroll (data-parallax) inside a
 * clipped frame, so they never overlap the copy.
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

        <ol className="mt-9 grid gap-3.5 md:grid-cols-2" data-stagger="0.1">
          {how.steps.map((step, i) => {
            const s = STEP_STYLE[i % STEP_STYLE.length]!;
            return (
              <li
                key={step.title}
                data-parallax-scope=""
                className={`grid gap-5 overflow-hidden rounded-4xl p-5.5 md:min-h-95 md:grid-cols-2 md:items-end ${s.card}`}
              >
                <div className="self-start md:self-auto md:pb-5">
                  <span
                    className={`font-display mb-2.5 grid h-10 w-10 place-items-center rounded-full text-[18px] font-extrabold ${s.num}`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-display mb-2 text-[22px] leading-[1.15] font-extrabold tracking-tight">
                    {step.title}
                  </h3>
                  <p className={`text-[16px] leading-[1.55] ${s.body}`}>{step.body}</p>
                </div>
                {/* Peeks up from the bottom edge; the status bar is cropped. */}
                <div
                  className={`-mb-5.5 h-85 w-full max-w-75 justify-self-center overflow-hidden rounded-t-[22px] border-[6px] border-b-0 ${s.frame}`}
                >
                  <div data-parallax="-0.06">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      width={how.shotWidth}
                      height={how.shotHeight}
                      sizes="(min-width: 768px) 300px, 80vw"
                      className="shot-crop h-auto w-full"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div
          className="mt-3.5 grid items-center gap-5 rounded-4xl bg-violet-soft p-5.5 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:py-7 lg:pr-12 lg:pl-7"
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
