import Link from "next/link";
import type { ReactNode } from "react";

import { Wordmark } from "@/components/Logo";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { button } from "@/components/ui/styles";
import {
  DRAFT_NOTICE,
  LEGAL_LAST_UPDATED_LABEL,
  type LegalSection,
} from "@/content/legal";

/**
 * Shared shell for /privacy, /terms, /beta-terms and /data-deletion.
 *
 * Restyled only: every word comes from `legal.ts`, untouched. Includes a
 * table of contents built from the section list, which is genuinely useful
 * on a long document and gives search engines in-page anchors.
 *
 * `notice` defaults to the pre-launch draft banner. Pass a different string to
 * change it, or `null` to drop the banner entirely — /data-deletion is a set of
 * instructions rather than an agreement, so a "not legally reviewed" warning
 * above it would only obscure the one thing the reader came for.
 *
 * `cta` adds an action under the document (the beta terms end with the
 * sign-up button, since that's where people read them from).
 */
export function LegalDocument({
  title,
  intro,
  sections,
  notice = DRAFT_NOTICE,
  noticeLabel = "Pre-launch draft.",
  cta,
}: {
  title: string;
  intro: string;
  sections: readonly LegalSection[];
  notice?: string | null;
  noticeLabel?: string;
  cta?: ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/94 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-[min(820px,100%-32px)] items-center justify-between">
          <Link href="/" aria-label="Pearmo home" className="text-[23px]">
            <Wordmark />
          </Link>
          <Link
            href="/"
            className="text-[15px] font-semibold text-ink-2 underline-offset-3 hover:underline"
          >
            Back to pearmo.com
          </Link>
        </div>
      </header>

      <main id="main" className="mx-auto w-[min(820px,100%-32px)] pt-12 pb-4 lg:pt-16">
        <Tag>Legal</Tag>
        <h1 className="font-display text-[clamp(38px,6vw,64px)] leading-[0.98] font-extrabold tracking-tighter text-balance">
          {title}
        </h1>
        <p className="mt-3.5 text-[14px] font-semibold text-mute">
          Last updated {LEGAL_LAST_UPDATED_LABEL}
        </p>

        {/* Unmissable, because it's a draft and readers deserve to know. */}
        {notice && (
          <aside role="note" className="mt-8 rounded-[22px] bg-pink-soft px-5.5 py-4.5">
            <p className="flex items-start gap-3 text-[15px] leading-[1.6] text-ink">
              <Icon name="flag" className="mt-0.5 h-5 w-5 text-magenta" />
              <span>
                <b className="font-semibold">{noticeLabel}</b> {notice}
              </span>
            </p>
          </aside>
        )}

        <p className="mt-8 text-[18px] leading-[1.65] text-ink-2">{intro}</p>

        <nav aria-label="On this page" className="mt-10 rounded-panel bg-violet-soft p-5.5 lg:p-7">
          <h2 className="mb-3.5 text-[12.5px] font-semibold tracking-[0.16em] text-violet-deep uppercase">
            On this page
          </h2>
          <ol className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {sections.map((section, i) => (
              <li key={section.id} className="text-[15px]">
                <a
                  href={`#${section.id}`}
                  className="grid grid-cols-[28px_1fr] gap-1.5 text-ink-2 transition-colors hover:text-violet-deep"
                >
                  <span className="font-semibold text-violet-deep tabular-nums">{i + 1}.</span>
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-14 flex flex-col gap-12">
          {sections.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-display flex items-start gap-3 text-[clamp(24px,3vw,32px)] leading-[1.1] font-extrabold tracking-tight">
                <span className="mt-0.5 grid h-9 min-w-9 place-items-center rounded-full bg-lime px-2 text-[16px] tabular-nums">
                  {i + 1}
                </span>
                <span>{section.heading}</span>
              </h2>
              <div className="mt-4.5 flex flex-col gap-4">
                {section.blocks.map((block, bi) => {
                  if (block.type === "h3") {
                    return (
                      <h3 key={bi} className="mt-2 text-[18px] font-semibold text-ink">
                        {block.text}
                      </h3>
                    );
                  }
                  if (block.type === "list") {
                    return (
                      <ul key={bi} className="flex flex-col gap-2.5">
                        {block.items.map((item) => (
                          <li key={item} className="flex gap-3 text-[16px] leading-[1.65] text-ink-2">
                            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-violet" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={bi} className="text-[16px] leading-[1.7] text-ink-2">
                      {block.text}
                    </p>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          <div className="flex flex-wrap gap-3">
            {cta}
            <Link href="/" className={`${button.paper} border border-line`}>
              Back to pearmo.com
            </Link>
          </div>
          <span className="text-[13px] font-semibold text-mute">
            {title} · {LEGAL_LAST_UPDATED_LABEL}
          </span>
        </div>
      </main>
    </>
  );
}
