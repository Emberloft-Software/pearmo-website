import Image from "next/image";

import { wrap } from "@/components/ui/styles";
import { avatars, strip } from "@/content/site-content";

const CHIP = ["bg-paper text-ink", "bg-ink text-paper", "bg-violet text-white"] as const;

/**
 * Avatar marquee on a lime band. Server-rendered so the names and traits are
 * in the HTML. The track is duplicated so translating it by -50% loops
 * seamlessly; the copy is aria-hidden. CSS runs the loop until Motion.tsx
 * takes over and ties its speed to scroll velocity.
 */
export function AvatarStrip() {
  const chips = (copy: boolean) =>
    avatars.map((a, i) => (
      <li
        key={`${a.slug}${copy ? "-copy" : ""}`}
        className={`inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 font-semibold whitespace-nowrap ${CHIP[i % 3]}`}
      >
        <Image
          src={`/assets/avatars/${a.slug}.png`}
          alt={copy ? "" : `${a.name} avatar`}
          width={40}
          height={40}
          sizes="40px"
          className="h-9.5 w-9.5 rounded-full bg-violet-soft"
        />
        {a.name} · {a.trait}
      </li>
    ));

  return (
    <section aria-labelledby="strip-label" className="mt-11 overflow-hidden bg-lime py-4.5">
      <p
        id="strip-label"
        className={`${wrap} font-display mb-3.5 text-[clamp(22px,2.4vw,30px)] leading-[1.1] font-extrabold tracking-[-0.03em]`}
      >
        {strip.label}
      </p>
      <div className="flex w-max motion-safe:animate-marquee" data-marquee="">
        <ul className="flex gap-3.5 pr-3.5">{chips(false)}</ul>
        <ul className="flex gap-3.5 pr-3.5" aria-hidden="true">
          {chips(true)}
        </ul>
      </div>
    </section>
  );
}
