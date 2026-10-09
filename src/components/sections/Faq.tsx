import { FaqTabs } from "@/components/ui/FaqTabs";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { h2, lead, wrap } from "@/components/ui/styles";
import { faq } from "@/content/site-content";
import { site } from "@/lib/site";

/**
 * FAQ: equal-width topic tabs over equal-width rows.
 *
 * Rows are native <details>/<summary>: the answers are always in the DOM (so
 * crawlers and AI assistants index them), keyboard and screen-reader
 * behaviour comes for free, and in-page find still matches collapsed text.
 * The rows are rendered here on the server and handed to the tabs.
 *
 * The same items are emitted as FAQPage JSON-LD from the page. That markup
 * must match what's visible here, so both read from the one content source.
 */
export function Faq() {
  const [beforeEmail, afterEmail] = faq.lead.split(site.contactEmail);

  const panels = faq.groups.map((group) => ({
    id: group.id,
    label: group.label,
    content: (
      <div key={group.id} className="grid gap-2.5">
        {faq.items
          .filter((item) => item.group === group.id)
          .map((item) => (
            <details
              key={item.q}
              className="group rounded-[20px] border border-line bg-white transition-shadow open:shadow-[0_18px_40px_-28px_rgb(76_59_214/0.55)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4.5 text-[17px] leading-[1.35] font-semibold [&::-webkit-details-marker]:hidden">
                <h3>{item.q}</h3>
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 flex-none place-items-center rounded-full bg-violet-soft text-violet-deep transition-transform duration-300 group-open:rotate-45"
                >
                  <Icon name="plus" className="h-4.5 w-4.5" strokeWidth={2.4} />
                </span>
              </summary>
              <p className="px-5 pb-5 leading-[1.65] text-ink-2">{item.a}</p>
            </details>
          ))}
      </div>
    ),
  }));

  return (
    <section id="faq" className="pb-16 lg:pb-24">
      <div className={`${wrap} grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
        <div className="lg:sticky lg:top-30 lg:self-start">
          <Tag>{faq.kicker}</Tag>
          <h2 className={h2} data-split="">
            {faq.titleLead} <span className="serif-accent">{faq.titleEmphasis}</span>
          </h2>
          <p className={`${lead} mt-4.5 text-ink-2`}>
            {beforeEmail}
            <a href={`mailto:${site.contactEmail}`} className="font-semibold underline underline-offset-3">
              {site.contactEmail}
            </a>
            {afterEmail}
          </p>
        </div>

        <div data-reveal="">
          <FaqTabs panels={panels} />
        </div>
      </div>
    </section>
  );
}
