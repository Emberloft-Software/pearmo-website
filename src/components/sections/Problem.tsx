import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { problem } from "@/content/site-content";

export function Problem() {
  return (
    <section id="why" className="pt-[110px] pb-[60px]">
      <div className="mx-auto w-[min(1160px,92vw)]">
        <div className="grid items-start gap-[60px] lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal as="p" className="kicker">
              {problem.kicker}
            </Reveal>
            <Reveal
              as="h2"
              delay={0.08}
              className="mt-[18px] mb-4 text-[clamp(30px,4.6vw,52px)] leading-[1.04] font-extrabold tracking-[-0.025em]"
            >
              {problem.titleLead}{" "}
              <span className="serif-accent">{problem.titleEmphasis}</span>{" "}
              {problem.titleTrail}
            </Reveal>
            <Reveal
              as="p"
              delay={0.16}
              className="text-mute max-w-[56ch] text-[clamp(16px,1.6vw,19px)] leading-[1.6]"
            >
              {problem.lead}
            </Reveal>

            <dl className="mt-[46px] grid grid-cols-2 gap-4 sm:grid-cols-3">
              {problem.stats.map((stat, i) => (
                <Reveal
                  key={stat.label}
                  delay={i * 0.08}
                  className="border-line rounded-panel border bg-card px-[22px] py-6"
                >
                  <dd className="block text-[clamp(34px,3.6vw,46px)] font-extrabold tracking-[-0.04em]">
                    <span className="text-gradient">
                      {stat.countUp ? <CountUp value={stat.value} /> : stat.value}
                    </span>
                  </dd>
                  <dt className="text-mute mt-1.5 block text-[13px] leading-[1.45]">
                    {stat.label}
                  </dt>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal delay={0.16}>
            <figure className="relative overflow-hidden rounded-card bg-ink px-9 py-[38px] text-[#f3f0fa]">
              <div
                aria-hidden="true"
                className="brand-gradient absolute -right-[60px] -bottom-[80px] h-60 w-60 rounded-full opacity-55 blur-[70px]"
              />
              <blockquote className="relative z-1 font-serif text-[clamp(19px,2vw,24px)] leading-[1.45] italic">
                {problem.quote}
              </blockquote>
              <figcaption className="relative z-1 mt-[22px] font-mono text-[11px] tracking-[0.16em] text-[#9d95b8] uppercase">
                {problem.quoteSource}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
