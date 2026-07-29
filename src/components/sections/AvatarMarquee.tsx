import Image from "next/image";

import { avatars, marquee } from "@/content/site-content";

/**
 * Scrolling avatar strip.
 *
 * Server-rendered. The original built these 24 cards with client-side
 * `innerHTML`, so every avatar name, trait and alt attribute was invisible to
 * crawlers that don't execute JavaScript — including most AI crawlers.
 *
 * The list is rendered twice: the track translates -50%, so the second copy
 * is what makes the loop seamless. The duplicate is aria-hidden to stop
 * screen readers announcing all 16 avatars twice.
 */
export function AvatarMarquee() {
  return (
    <section aria-labelledby="marquee-label" className="pt-[30px] pb-2.5">
      <h2
        id="marquee-label"
        className="text-mute mb-[26px] text-center font-mono text-xs tracking-[0.22em] uppercase"
      >
        {marquee.label}
      </h2>

      <div className="marquee-mask relative overflow-hidden">
        <div className="marquee-track flex w-max gap-[18px]">
          {[false, true].map((isDuplicate) => (
            <div
              key={String(isDuplicate)}
              className="flex gap-[18px]"
              aria-hidden={isDuplicate || undefined}
            >
              {avatars.map((avatar) => (
                <figure
                  key={avatar.slug}
                  className="border-line hover:border-[#cfc6f5] hover:shadow-glow w-[132px] flex-none rounded-[22px] border bg-card px-3 pt-4 pb-3.5 text-center transition-all duration-300 hover:-translate-y-2 hover:-rotate-2"
                >
                  <Image
                    src={`/assets/avatars/${avatar.slug}.png`}
                    alt={isDuplicate ? "" : `${avatar.name} — Pearmo avatar`}
                    width={84}
                    height={84}
                    loading="lazy"
                    sizes="84px"
                    className="mx-auto mb-2.5 h-21 w-21 object-contain drop-shadow-[0_8px_14px_rgb(23_19_31/0.14)]"
                  />
                  <figcaption>
                    <b className="block text-[13px] tracking-[-0.01em]">
                      {avatar.name}
                    </b>
                    <span className="text-mute font-mono text-[10px] tracking-[0.08em] uppercase">
                      {avatar.trait}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
