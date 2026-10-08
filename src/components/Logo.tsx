import { LOGO_P_PATH, LOGO_PEAR_PATH, LOGO_VIEWBOX } from "@/lib/logo-paths";

/**
 * The Pearmo mark: a coral pear outline wrapped around an indigo "p".
 *
 * `tone` swaps only the "p": indigo on light grounds, paper on dark ones, ink
 * where indigo would read as a second brand colour. The coral pear never
 * changes. Decorative by default; the surrounding link carries the name.
 */
const P_FILL = {
  brand: "#291450",
  light: "#faf8ff",
  ink: "#17101f",
} as const;

export function LogoMark({
  tone = "brand",
  className = "",
}: {
  tone?: keyof typeof P_FILL;
  className?: string;
}) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path fill="#ef4c56" fillRule="evenodd" d={LOGO_PEAR_PATH} />
      <path fill={P_FILL[tone]} fillRule="evenodd" d={LOGO_P_PATH} />
    </svg>
  );
}

/** Mark plus the lowercase wordmark, set in the display face. */
export function Wordmark({
  tone = "brand",
  className = "",
}: {
  tone?: keyof typeof P_FILL;
  className?: string;
}) {
  return (
    <span
      className={`font-display inline-flex items-center gap-2 font-extrabold tracking-[-0.04em] ${className}`}
    >
      <LogoMark tone={tone} className="h-[1.3em] w-auto" />
      pearmo
    </span>
  );
}
