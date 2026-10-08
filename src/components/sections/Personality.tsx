import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { block, h2, lead, wrap } from "@/components/ui/styles";
import { personality } from "@/content/site-content";
import {
  RADAR,
  axisLines,
  labelPositions,
  ringPolygons,
  scorePolygon,
} from "@/lib/radar";

/**
 * The personality radar, server-rendered: the geometry is computed at build
 * time and the values are in the SVG's <desc>, so the chart exists for
 * crawlers and screen readers without JavaScript. The score shape grows out
 * of the centre on scroll (data-radar).
 */
function Radar() {
  const traits = personality.traits;
  const count = traits.length;
  const rings = ringPolygons(count);
  const axes = axisLines(count);
  const labels = labelPositions(count);
  const { points, dots } = scorePolygon(
    traits.map((t) => t.score),
    personality.scoreMax,
  );

  return (
    <svg
      viewBox={RADAR.viewBox}
      role="img"
      aria-label={personality.radarLabel}
      className="mx-auto block h-auto w-full max-w-100 overflow-visible"
    >
      <desc>
        {traits
          .map((t) => `${t.name}: ${t.score} out of ${personality.scoreMax}`)
          .join(". ")}
      </desc>
      <g stroke="var(--color-line)" fill="none">
        {rings.map((ring, i) => (
          <polygon key={i} points={ring} />
        ))}
        {axes.map((axis, i) => (
          <line key={i} x1={RADAR.cx} y1={RADAR.cy} x2={axis.x2} y2={axis.y2} />
        ))}
      </g>
      <g data-radar={`${RADAR.cx} ${RADAR.cy}`}>
        <polygon
          points={points}
          fill="rgb(108 76 241 / 0.18)"
          stroke="var(--color-violet)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {dots.map((dot, i) => (
          <circle key={i} cx={dot.x.toFixed(1)} cy={dot.y.toFixed(1)} r="4.5" fill="var(--color-violet)" />
        ))}
      </g>
      {traits.map((trait, i) => {
        const pos = labels[i];
        if (!pos) return null;
        return (
          <g key={trait.name} textAnchor={pos.anchor}>
            <text x={pos.x} y={pos.y - 6} className="fill-ink-2 text-[13px] font-semibold">
              {trait.short}
            </text>
            <text x={pos.x} y={pos.y + 11} className="fill-mute text-[12.5px]">
              {trait.score.toFixed(1)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Personality() {
  return (
    <section id="personality" className={`${wrap} pb-16 lg:pb-24`}>
      <div className={`${block} grid items-start gap-7 bg-violet text-white lg:grid-cols-[0.9fr_1.1fr] lg:gap-14`}>
        <div>
          <Tag className="text-on-violet" dot="bg-lime">
            {personality.kicker}
          </Tag>
          <h2 className={h2} data-split="">
            {personality.titleLead}{" "}
            <span className="serif-accent text-lime">{personality.titleEmphasis}</span>
          </h2>
          <p className={`${lead} mt-4.5 text-on-violet`}>{personality.lead}</p>
          <p className="mt-6 flex max-w-115 items-start gap-3 rounded-[20px] bg-lime px-4 py-3.5 font-medium text-ink">
            <Icon name="lock" className="mt-0.5 h-5 w-5" />
            {personality.privacyNote}
          </p>
        </div>

        <div className="rounded-panel bg-paper p-5 text-ink">
          <p className="text-[12px] font-semibold tracking-[0.16em] text-mute uppercase">
            {personality.exampleLabel}
          </p>
          <Radar />
          {/* The numbers are already in the radar's <desc>; this list is the
              readable version of the same thing for sighted readers. */}
          <ul className="mt-1.5 grid gap-2 lg:grid-cols-2" data-stagger="0.05">
            {personality.traits.map((trait) => (
              <li
                key={trait.name}
                className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5 rounded-2xl border border-line bg-white px-3.5 py-3"
              >
                <b className="font-semibold">{trait.name}</b>
                <span className="font-display row-span-2 self-center text-[22px] font-extrabold text-violet-deep tabular-nums">
                  {trait.score.toFixed(1)}
                </span>
                <span className="text-[14px] text-mute">{trait.blurb}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
