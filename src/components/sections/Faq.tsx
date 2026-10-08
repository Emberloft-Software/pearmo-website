import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { h2, lead, wrap } from "@/components/ui/styles";
import { faq } from "@/content/site-content";
import { site } from "@/lib/site";

/**
 * FAQ as a chat: your question on the right, the answer on the left.
 *
 * Built on native <details>/<summary>: the answers are always in the DOM (so
 * crawlers and AI assistants index them), keyboard and screen-reader
 * behaviour comes for free, and in-page find still matches collapsed text.
 *
 * The same items are emitted as FAQPage JSON-LD from the page. That markup
 * must match what's visible here, so both read from the one content source.
 */
export function Faq() {
  const [beforeEmail, afterEmail] = faq.lead.split(site.contactEmail);

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

        <div className="grid gap-2.5" data-stagger="0.04">
          {faq.items.map((item) => (
            <details key={item.q} className="group grid">
              <summary className="flex max-w-[88%] cursor-pointer list-none items-center gap-3 justify-self-end rounded-3xl rounded-br-md bg-ink px-4.5 py-3.5 text-[16.5px] leading-[1.35] font-semibold text-paper [&::-webkit-details-marker]:hidden">
                <h3>{item.q}</h3>
                <Icon
                  name="plus"
                  className="h-5 w-5 text-lime transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="mt-2 mb-1.5 max-w-[88%] justify-self-start rounded-3xl rounded-bl-md border border-line bg-white px-4.5 py-3.5 leading-[1.6] text-ink-2">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
