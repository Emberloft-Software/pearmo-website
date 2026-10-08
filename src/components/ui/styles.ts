/**
 * Class strings shared by several sections. Kept as plain strings rather
 * than components so they compose with any element (a, button, summary).
 */

const buttonBase =
  "inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full px-6.5 text-[17px] leading-none font-semibold transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-px active:translate-y-0";

export const button = {
  /** Ink with lime text: the main call to action on paper and lime. */
  ink: `${buttonBase} bg-ink text-lime hover:shadow-[0_10px_24px_-12px_rgb(23_16_31/0.6)]`,
  lime: `${buttonBase} bg-lime text-ink hover:bg-lime-press`,
  paper: `${buttonBase} bg-paper text-ink`,
  violet: `${buttonBase} bg-violet text-white`,
} as const;

export const buttonSmall = "min-h-11 px-5 text-[15px]";

/** Page gutter and max width, shared by every section. */
export const wrap = "mx-auto w-[min(1320px,100%-32px)]";

/** Section headings: Funnel Display at 800. */
export const h2 =
  "font-display text-[clamp(36px,5.4vw,80px)] leading-[0.95] font-extrabold tracking-[-0.045em] text-balance";

export const lead = "max-w-[56ch] text-[clamp(17px,1.3vw,19px)] leading-[1.6]";

/** A big rounded colour block, the layout unit of this design. */
export const block = "rounded-block px-5.5 py-7 lg:p-12";
