import Image from "next/image";

/**
 * The Pearmo mark: a coral pear outline wrapped around an indigo "p".
 *
 * `tone` swaps only the "p": indigo on light grounds, paper on dark ones, ink
 * where indigo would read as a second brand colour. The coral pear never
 * changes. Decorative by default; the surrounding link carries the name.
 *
 * Served as static SVG files (public/assets/brand/, generated from
 * src/lib/logo-paths.ts) rather than inline paths: the outlines are ~3 KB,
 * and inline they were repeated in the HTML and again in Next's hydration
 * data for every logo on the page. As files they're fetched once and cached.
 * The share-image renderer still draws from logo-paths.ts.
 */
const SRC = {
  brand: "/assets/brand/pearmo-mark.svg",
  light: "/assets/brand/pearmo-mark-light.svg",
  ink: "/assets/brand/pearmo-mark-ink.svg",
} as const;

export function LogoMark({
  tone = "brand",
  className = "",
}: {
  tone?: keyof typeof SRC;
  className?: string;
}) {
  return (
    <Image
      src={SRC[tone]}
      alt=""
      width={24}
      height={32}
      unoptimized
      className={className}
    />
  );
}

/** Mark plus the lowercase wordmark, set in the display face. */
export function Wordmark({
  tone = "brand",
  className = "",
}: {
  tone?: keyof typeof SRC;
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
