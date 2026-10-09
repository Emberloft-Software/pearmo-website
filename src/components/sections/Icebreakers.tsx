import { ScenePicture } from "@/components/ui/ScenePicture";
import { Tag } from "@/components/ui/Tag";
import { h2, lead, wrap } from "@/components/ui/styles";
import { icebreakers } from "@/content/site-content";

/** Pills read on the dark scrim, so no ink-on-ink. */
const GAME_STYLE = [
  "bg-lime text-ink",
  "bg-violet text-white",
  "bg-paper text-ink",
  "bg-pink-soft text-magenta",
] as const;

/**
 * Icebreakers, full-bleed (the layout from direction B, restyled in C).
 *
 * The sofa scene fills the width; as you scroll, a spotlight opens between
 * the two faces and the avatars become the people (Motion.tsx,
 * data-spotlight). On a desktop the section holds still while it opens
 * (data-pin). Phones get the 4:5 crop with the copy underneath; from 1024px
 * the copy sits over the scene on an ink scrim, which keeps it AA-legible.
 */
export function Icebreakers() {
  return (
    <section id="icebreakers" data-pin="" className="relative overflow-hidden bg-ink text-paper">
      <div
        data-spotlight=""
        className="relative aspect-4/5 overflow-hidden bg-[#3a2a5a] sm:aspect-1678/937 lg:aspect-auto lg:h-[min(100svh,920px)] lg:min-h-170"
      >
        <ScenePicture scene="sofa" who="avatar" sizes="100vw" />
        <ScenePicture scene="sofa" who="person" sizes="100vw" className="spotlight-over" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_0%,rgb(23_16_31/0)_34%),linear-gradient(to_bottom,rgb(23_16_31/0.5),rgb(23_16_31/0)_16%)] lg:bg-[linear-gradient(to_top,var(--color-ink)_0%,rgb(23_16_31/0.92)_30%,rgb(23_16_31/0.5)_46%,rgb(23_16_31/0)_62%),linear-gradient(to_bottom,rgb(23_16_31/0.55),rgb(23_16_31/0)_16%)]"
        />
      </div>

      <div className="relative pb-14 lg:absolute lg:inset-x-0 lg:bottom-0 lg:pb-16">
        <div className={wrap}>
          <div className="max-w-165">
            <Tag className="text-[#d9d3e8]" dot="bg-lime">
              {icebreakers.kicker}
            </Tag>
            <h2 className={h2}>
              {icebreakers.titleLead}{" "}
              <span className="mark-lime text-ink">{icebreakers.titleMark}</span>
              {icebreakers.titleTrail}
            </h2>
            <p className={`${lead} mt-4.5 text-[#d9d3e8]`}>{icebreakers.body}</p>
            <ul className="my-5.5 flex flex-wrap gap-2">
              {icebreakers.games.map((game, i) => (
                <li
                  key={game}
                  className={`rounded-full px-4.5 py-2.5 text-[15.5px] font-bold ${GAME_STYLE[i % GAME_STYLE.length]}`}
                >
                  {game}
                </li>
              ))}
            </ul>
            <p className="text-[15px] text-[#d9d3e8]">{icebreakers.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
