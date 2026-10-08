import Link from "next/link";

import { BetaLink } from "@/components/BetaLink";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { block, button, h2, lead, wrap } from "@/components/ui/styles";
import { actions, beta } from "@/content/site-content";
import { site } from "@/lib/site";

/**
 * The closing section and the target of /get before launch (#beta).
 *
 * Written for someone deciding whether to hand over their number: what
 * happens next, who it's for, what it's like, and where their answers go,
 * all before the button, in plain words. Every fact is from the beta terms.
 */
export function Beta() {
  const who: string[] = [...beta.who];
  who.splice(3, 0, site.webAppUrl ? beta.deviceWithWebApp : beta.deviceAndroidOnly);

  return (
    <section id="beta" className={`${wrap} scroll-mt-20`}>
      <div className={`${block} bg-lime text-ink`}>
        <div className="grid items-end gap-5.5 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
          <div>
            <Tag>{beta.kicker}</Tag>
            <h2 className={h2} data-split="">
              {beta.titleLead} <span className="serif-accent">{beta.titleEmphasis}</span>
            </h2>
            <p className={`${lead} mt-4.5 text-ink-2`}>{beta.lead}</p>
          </div>
          <div className="grid gap-2 lg:justify-items-start">
            <BetaLink event="beta_form_section" className={`${button.ink} min-h-14.5`} />
            <p className="text-center text-[13.5px] text-ink-2 lg:text-left">{actions.joinBetaNote}</p>
          </div>
        </div>

        {/* The three steps read like messages arriving. */}
        <ol className="mt-9 grid gap-2.5 lg:grid-cols-3 lg:items-stretch" data-stagger="0.18">
          {beta.steps.map((step, i) => (
            <li
              key={step.title}
              className={
                i === 1
                  ? "grid max-w-[560px] grid-cols-[44px_1fr] gap-x-3.5 gap-y-0.5 justify-self-end rounded-[26px] rounded-br-lg bg-ink px-4.5 py-4 text-paper lg:max-w-none lg:translate-y-5.5 lg:justify-self-stretch"
                  : "grid max-w-[560px] grid-cols-[44px_1fr] gap-x-3.5 gap-y-0.5 rounded-[26px] rounded-bl-lg bg-paper px-4.5 py-4 lg:max-w-none"
              }
            >
              <span className="font-display row-span-2 grid h-10 w-10 place-items-center rounded-full bg-violet text-[18px] font-extrabold text-white">
                {i + 1}
              </span>
              <b className="font-display text-[19px] leading-[1.25] font-extrabold tracking-[-0.02em]">
                {step.title}
              </b>
              <span className={`text-[15.5px] ${i === 1 ? "text-[#d9d3e8]" : "text-ink-2"}`}>{step.body}</span>
            </li>
          ))}
        </ol>

        <div className="mt-11 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-panel bg-paper p-5.5">
            <h3 className="font-display mb-3 text-[22px] font-extrabold tracking-tight">{beta.whoTitle}</h3>
            <ul className="grid gap-2.5">
              {who.map((line) => (
                <li key={line} className="grid grid-cols-[26px_1fr] gap-2.5">
                  <span className="grid h-5.5 w-5.5 place-items-center rounded-full bg-ink text-lime">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-panel bg-paper p-5.5">
            <h3 className="font-display mb-3 text-[22px] font-extrabold tracking-tight">{beta.expectTitle}</h3>
            <dl className="grid gap-3 sm:grid-cols-2">
              {beta.expect.map((item) => (
                <div key={item.title}>
                  <dt className="font-semibold">{item.title}</dt>
                  <dd className="text-[15.5px] text-ink-2">{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p className="mt-3 flex items-start gap-3 rounded-[22px] bg-ink px-5 py-4 text-[15.5px] text-paper">
          <Icon name="lock" className="mt-0.5 h-5 w-5 text-lime" />
          <span>
            {beta.data}{" "}
            <Link href="/beta-terms" className="font-semibold text-lime underline underline-offset-3">
              {beta.termsLink}
            </Link>
          </span>
        </p>
        <p className="mt-3.5 text-[15.5px] text-ink-2">{beta.team}</p>
      </div>
    </section>
  );
}
