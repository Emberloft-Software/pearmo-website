import Link from "next/link";

import { LogoMark } from "@/components/Logo";
import {
  DRAFT_NOTICE,
  LEGAL_LAST_UPDATED_LABEL,
  type LegalSection,
} from "@/content/legal";

/**
 * Shared shell for /privacy and /terms.
 *
 * Includes a table of contents built from the section list — genuinely useful
 * on a long document, and it gives search engines in-page anchors to surface.
 */
export function LegalDocument({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: readonly LegalSection[];
}) {
  return (
    <>
      <header className="border-line border-b bg-white/60">
        <div className="mx-auto flex w-[min(880px,92vw)] items-center justify-between py-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[19px] font-extrabold tracking-[-0.02em]"
          >
            <LogoMark gradientId="logo-legal" className="h-6 w-6" />
            pearmo
          </Link>
          <Link
            href="/"
            className="text-mute hover:text-ink text-sm transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <main id="main" className="mx-auto w-[min(880px,92vw)] py-16">
        <p className="kicker">Legal</p>
        <h1 className="mt-4 text-[clamp(34px,5vw,54px)] leading-[1.05] font-extrabold tracking-[-0.03em]">
          {title}
        </h1>
        <p className="text-mute mt-3 font-mono text-xs tracking-[0.14em] uppercase">
          Last updated {LEGAL_LAST_UPDATED_LABEL}
        </p>

        {/* Unmissable, because it's a draft and readers deserve to know. */}
        <aside
          role="note"
          className="border-magenta/25 bg-magenta-wash mt-8 rounded-panel border px-6 py-5"
        >
          <p className="text-ink flex items-start gap-2.5 text-[14.5px] leading-[1.6]">
            <span aria-hidden="true" className="text-base leading-none">
              ⚠️
            </span>
            <span>
              <b className="font-semibold">Draft — under legal review.</b>{" "}
              {DRAFT_NOTICE}
            </span>
          </p>
        </aside>

        <p className="text-mute mt-8 text-[17px] leading-[1.7]">{intro}</p>

        <nav aria-label="On this page" className="border-line mt-10 rounded-panel border bg-card px-6 py-5">
          <h2 className="text-mute mb-3 font-mono text-[11px] tracking-[0.16em] uppercase">
            On this page
          </h2>
          <ol className="grid gap-1.5 sm:grid-cols-2">
            {sections.map((section, i) => (
              <li key={section.id} className="text-[14.5px]">
                <a
                  href={`#${section.id}`}
                  className="text-ink-2 hover:text-violet transition-colors"
                >
                  <span className="text-mute mr-2 font-mono text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-14 flex flex-col gap-12">
          {sections.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-[clamp(22px,2.6vw,30px)] font-extrabold tracking-[-0.025em]">
                <span className="text-gradient mr-2.5 font-mono text-base">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {section.blocks.map((block, bi) => {
                  if (block.type === "h3") {
                    return (
                      <h3
                        key={bi}
                        className="text-ink mt-2 text-[17px] font-bold tracking-[-0.01em]"
                      >
                        {block.text}
                      </h3>
                    );
                  }
                  if (block.type === "list") {
                    return (
                      <ul key={bi} className="flex flex-col gap-2.5 pl-1">
                        {block.items.map((item) => (
                          <li
                            key={item}
                            className="text-mute flex gap-3 text-[15.5px] leading-[1.65]"
                          >
                            <span
                              aria-hidden="true"
                              className="bg-violet mt-2.5 h-1.5 w-1.5 flex-none rounded-full"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p
                      key={bi}
                      className="text-mute text-[15.5px] leading-[1.7]"
                    >
                      {block.text}
                    </p>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="border-line mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
          <Link
            href="/"
            className="brand-gradient inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            ← Back to pearmo.com
          </Link>
          <span className="text-mute font-mono text-[11px] tracking-[0.14em] uppercase">
            {title} · {LEGAL_LAST_UPDATED_LABEL}
          </span>
        </div>
      </main>
    </>
  );
}
