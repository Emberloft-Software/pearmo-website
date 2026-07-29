import { Reveal } from "@/components/ui/Reveal";
import { safety } from "@/content/site-content";

const ICONS = {
  shield: (
    <>
      <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  "eye-off": (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="m3 3 18 18" />
    </>
  ),
  lock: (
    <>
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <rect x="4" y="11" width="16" height="10" rx="2" />
    </>
  ),
} as const;

/** Each card gets its own tint, matching the original nth-child styling. */
const TINTS = [
  { bg: "bg-violet-wash", stroke: "text-violet" },
  { bg: "bg-magenta-wash", stroke: "text-magenta" },
  { bg: "bg-lime-wash", stroke: "text-[#6a8a00]" },
] as const;

export function Safety() {
  return (
    <section id="safety" className="py-[100px]">
      <div className="mx-auto w-[min(1160px,92vw)]">
        <div className="max-w-[640px]">
          <Reveal as="p" className="kicker">
            {safety.kicker}
          </Reveal>
          <Reveal
            as="h2"
            delay={0.08}
            className="mt-[18px] mb-4 text-[clamp(30px,4.6vw,52px)] leading-[1.04] font-extrabold tracking-[-0.025em]"
          >
            {safety.titleLead}{" "}
            <span className="serif-accent">{safety.titleEmphasis}</span>{" "}
            {safety.titleTrail}
          </Reveal>
          <Reveal
            as="p"
            delay={0.16}
            className="text-mute max-w-[56ch] text-[clamp(16px,1.6vw,19px)] leading-[1.6]"
          >
            {safety.lead}
          </Reveal>
        </div>

        <ul className="mt-[52px] grid gap-5 md:grid-cols-3">
          {safety.cards.map((card, i) => {
            const tint = TINTS[i % TINTS.length]!;
            return (
              <Reveal
                key={card.title}
                as="li"
                delay={i * 0.08}
                className="border-line hover:shadow-glow relative overflow-hidden rounded-card border bg-card px-7 py-[30px] transition-all duration-400 hover:-translate-y-1.5"
              >
                <span
                  className={`${tint.bg} mb-[18px] grid h-[46px] w-[46px] place-items-center rounded-[14px]`}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`${tint.stroke} h-[22px] w-[22px]`}
                  >
                    {ICONS[card.icon]}
                  </svg>
                </span>
                <h3 className="mb-2 text-[19px] font-bold tracking-[-0.02em]">
                  {card.title}
                </h3>
                <p className="text-mute text-[14.5px] leading-[1.6]">{card.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
