import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/content/site-content";

/**
 * FAQ accordion.
 *
 * Built on native <details>/<summary> rather than a JS disclosure widget: the
 * answers are always present in the DOM (so crawlers and AI crawlers index
 * them), keyboard and screen-reader behaviour comes for free, and the browser's
 * in-page find still matches collapsed text.
 *
 * The same items are emitted as FAQPage JSON-LD from the page, which is what
 * makes them eligible for rich results — that markup must match what's visible
 * here, so both read from the one content source.
 */
export function Faq() {
  return (
    <section id="faq" className="py-[100px]">
      <div className="mx-auto w-[min(880px,92vw)]">
        <div className="max-w-[640px]">
          <Reveal as="p" className="kicker">
            {faq.kicker}
          </Reveal>
          <Reveal
            as="h2"
            delay={0.08}
            className="mt-[18px] mb-4 text-[clamp(30px,4.6vw,52px)] leading-[1.04] font-extrabold tracking-[-0.025em]"
          >
            {faq.titleLead}{" "}
            <span className="serif-accent">{faq.titleEmphasis}</span>
          </Reveal>
          <Reveal
            as="p"
            delay={0.16}
            className="text-mute max-w-[56ch] text-[clamp(16px,1.6vw,19px)] leading-[1.6]"
          >
            {faq.lead}
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {faq.items.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i, 4) * 0.05}>
              <details className="border-line group rounded-panel border bg-card open:shadow-glow">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-[16.5px] font-semibold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[inherit] font-[inherit]">{item.q}</h3>
                  <span
                    className="bg-violet-wash text-violet grid h-7 w-7 flex-none place-items-center rounded-full transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="h-3.5 w-3.5"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="text-mute px-6 pb-5 text-[15px] leading-[1.65]">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
