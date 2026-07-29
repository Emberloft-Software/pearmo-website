import { Reveal } from "@/components/ui/Reveal";
import { personality } from "@/content/site-content";
import {
  RADAR,
  axisLines,
  labelPositions,
  ringPolygons,
  scorePolygon,
} from "@/lib/radar";

export function Personality() {
  const traits = personality.traits;
  const count = traits.length;

  // All geometry resolved at build time — the chart ships in the HTML.
  const rings = ringPolygons(count);
  const axes = axisLines(count);
  const labels = labelPositions(count);
  const { points, dots } = scorePolygon(
    traits.map((t) => t.score),
    personality.scoreMax,
  );

  return (
    <section id="personality" className="relative overflow-clip py-[100px]">
      <div className="mx-auto grid w-[min(1160px,92vw)] items-center gap-[70px] lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <div className="border-line shadow-glow relative rounded-card border bg-card p-9">
            <svg
              viewBox={RADAR.viewBox}
              role="img"
              aria-label={personality.radarLabel}
              className="block h-auto w-full overflow-visible"
            >
              {/* Screen readers get the numbers, not just the shape. */}
              <desc>
                {traits
                  .map((t) => `${t.name}: ${t.score} out of ${personality.scoreMax}`)
                  .join(". ")}
              </desc>

              <g>
                {rings.map((ring, i) => (
                  <polygon
                    key={i}
                    points={ring}
                    fill="none"
                    stroke="#e4dff3"
                  />
                ))}
                {axes.map((axis, i) => (
                  <line
                    key={i}
                    x1={RADAR.cx}
                    y1={RADAR.cy}
                    x2={axis.x2}
                    y2={axis.y2}
                    stroke="#e4dff3"
                  />
                ))}
              </g>

              {/* Scales up from the centre once scrolled into view. */}
              <g className="radar-figure">
                <polygon
                  points={points}
                  fill="rgb(108 92 231 / 0.16)"
                  stroke="var(--color-violet)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                {dots.map((dot, i) => (
                  <circle
                    key={i}
                    cx={dot.x.toFixed(1)}
                    cy={dot.y.toFixed(1)}
                    r="4.5"
                    fill="var(--color-violet)"
                  />
                ))}
              </g>

              <g>
                {traits.map((trait, i) => {
                  const pos = labels[i];
                  if (!pos) return null;
                  return (
                    <g key={trait.name}>
                      <text
                        x={pos.x}
                        y={pos.y - 6}
                        textAnchor={pos.anchor}
                        className="fill-mute font-mono text-[10.5px] tracking-[0.06em]"
                      >
                        {trait.short}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 10}
                        textAnchor={pos.anchor}
                        className="fill-ink text-[13px] font-bold"
                      >
                        {trait.score.toFixed(1)}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>

            <p className="bg-violet-wash text-ink-2 mt-[18px] flex items-start gap-2.5 rounded-[14px] px-[18px] py-3.5 text-[13px] leading-[1.5]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-violet mt-0.5 h-4 w-4 flex-none"
                aria-hidden="true"
              >
                <rect x="4" y="10" width="16" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
              {personality.privacyNote}
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal as="p" className="kicker">
            {personality.kicker}
          </Reveal>
          <Reveal
            as="h2"
            delay={0.08}
            className="mt-[18px] mb-4 text-[clamp(30px,4.6vw,52px)] leading-[1.04] font-extrabold tracking-[-0.025em]"
          >
            {personality.titleLead}{" "}
            <span className="serif-accent">{personality.titleEmphasis}</span>
          </Reveal>
          <Reveal
            as="p"
            delay={0.16}
            className="text-mute max-w-[56ch] text-[clamp(16px,1.6vw,19px)] leading-[1.6]"
          >
            {personality.lead}
          </Reveal>

          <Reveal delay={0.24} className="mt-[30px] flex flex-col gap-3">
            {traits.map((trait) => (
              <div
                key={trait.name}
                className="border-line grid grid-cols-[auto_1fr_auto] items-center gap-3.5 rounded-2xl border bg-card px-[18px] py-3.5"
                style={
                  {
                    "--bar-w": `${(trait.score / personality.scoreMax) * 100}%`,
                  } as React.CSSProperties
                }
              >
                <span
                  className="bg-violet-wash grid h-9 w-9 place-items-center rounded-[11px] text-base"
                  aria-hidden="true"
                >
                  {trait.icon}
                </span>
                <div>
                  <b className="block text-[15px] tracking-[-0.01em]">
                    {trait.name}
                  </b>
                  <small className="text-mute text-[12.5px]">{trait.blurb}</small>
                </div>
                {/* Meter is decorative here — the number is already in the
                    radar's <desc>, so this is aria-hidden to avoid repetition. */}
                <span
                  className="trait-bar h-1.5 w-[120px] overflow-hidden rounded-md bg-[#ece8f8]"
                  aria-hidden="true"
                >
                  <i />
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
