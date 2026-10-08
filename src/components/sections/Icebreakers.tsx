import { Compare } from "@/components/ui/Compare";
import { ScenePicture } from "@/components/ui/ScenePicture";
import { Tag } from "@/components/ui/Tag";
import { h2, lead, wrap } from "@/components/ui/styles";
import { hero, icebreakers } from "@/content/site-content";

const GAME_STYLE = [
  "bg-lime text-ink",
  "bg-violet text-white",
  "bg-ink text-paper",
  "bg-pink-soft text-magenta",
] as const;

/**
 * The sofa scene. On scroll the split sweeps from the avatars to the people
 * (Motion.tsx, data-compare-scrub); on desktop the section holds still while
 * it does (data-pin). Dragging the slider takes over at any point.
 */
export function Icebreakers() {
  return (
    <section id="icebreakers" data-pin="" className="bg-paper py-10 lg:flex lg:min-h-svh lg:items-center lg:py-0">
      <div className={`${wrap} grid items-center gap-5.5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14`}>
        <div>
          <Tag>{icebreakers.kicker}</Tag>
          <h2 className={h2}>
            {icebreakers.titleLead}{" "}
            <span className="mark-lime">{icebreakers.titleMark}</span>
            {icebreakers.titleTrail}
          </h2>
          <p className={`${lead} mt-4.5 text-ink-2`}>{icebreakers.body}</p>
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
          <p className="text-[15px] text-ink-2">{icebreakers.note}</p>
        </div>

        <Compare
          scrub
          label={hero.compareLabel}
          beforeLabel={hero.compareAvatar}
          afterLabel={hero.comparePerson}
          className="aspect-4/5 rounded-block bg-[#3a2a5a] sm:aspect-1678/937"
          before={
            <ScenePicture scene="sofa" who="avatar" sizes="(min-width: 1024px) 60vw, 100vw" />
          }
          after={
            <ScenePicture scene="sofa" who="person" sizes="(min-width: 1024px) 60vw, 100vw" />
          }
        />
      </div>
    </section>
  );
}
