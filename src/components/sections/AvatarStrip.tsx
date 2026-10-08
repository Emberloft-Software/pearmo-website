import { wrap } from "@/components/ui/styles";
import { avatars, strip } from "@/content/site-content";

const CHIP = ["bg-paper text-ink", "bg-ink text-paper", "bg-violet text-white"] as const;

/**
 * Avatar marquee on a lime band. Server-rendered so the names and traits are
 * in the HTML. The faces come from one sprite (public/assets/avatars/
 * strip.webp, 16 square crops in the same order as `avatars`): one 30 KB
 * request instead of sixteen, which matters on the phones most people use.
 * The track is duplicated so translating it by -50% loops seamlessly; the
 * copy is aria-hidden. CSS runs the loop until Motion.tsx
 * takes over and ties its speed to scroll velocity.
 */
export function AvatarStrip() {
  const chips = (copy: boolean) =>
    avatars.map((a, i) => (
      <li
        key={`${a.slug}${copy ? "-copy" : ""}`}
        className={`inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 font-semibold whitespace-nowrap ${CHIP[i % 3]}`}
      >
        <span
          aria-hidden="true"
          className="h-9.5 w-9.5 flex-none rounded-full bg-violet-soft bg-[url(/assets/avatars/strip.webp)] bg-size-[1600%_100%]"
          style={{ backgroundPosition: `${(i / (avatars.length - 1)) * 100}% 0` }}
        />
        {a.name} · {a.trait}
      </li>
    ));

  return (
    // content-visibility keeps the sprite from downloading during the first
    // paint on phones, where the strip starts just below the screen.
    <section
      aria-labelledby="strip-label"
      className="mt-11 overflow-hidden bg-lime py-4.5 [contain-intrinsic-size:auto_150px] [content-visibility:auto]"
    >
      <p
        id="strip-label"
        className={`${wrap} font-display mb-3.5 text-[clamp(22px,2.4vw,30px)] leading-[1.1] font-extrabold tracking-[-0.03em]`}
      >
        {strip.label}
      </p>
      {/* With reduced motion the strip doesn't move, so it wraps into rows
          instead of hiding most of the animals off the edge. */}
      <div className="flex w-max motion-safe:animate-marquee motion-reduce:w-auto motion-reduce:px-4" data-marquee="">
        <ul className="flex gap-3.5 pr-3.5 motion-reduce:flex-wrap motion-reduce:gap-2.5">{chips(false)}</ul>
        <ul className="flex gap-3.5 pr-3.5 motion-reduce:hidden" aria-hidden="true">
          {chips(true)}
        </ul>
      </div>
    </section>
  );
}
