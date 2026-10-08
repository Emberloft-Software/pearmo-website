import { Tag } from "@/components/ui/Tag";
import { h2, wrap } from "@/components/ui/styles";
import { why } from "@/content/site-content";

const STAT_SURFACE = ["bg-lime", "bg-violet-soft", "border border-line bg-white"] as const;

/** "What we heard" and "What we built", as two halves of a conversation. */
export function Why() {
  return (
    <section id="why" className="py-16 lg:py-24">
      <div className={wrap}>
        <Tag>{why.kicker}</Tag>
        <h2 className={h2} data-split="">
          {why.titleLead} <span className="mark-lime">{why.titleMark}</span>{" "}
          {why.titleTrail}
        </h2>

        <div className="mt-9 grid gap-3.5 lg:grid-cols-2 lg:items-end" data-stagger="0.12">
          <figure className="m-0 rounded-[30px] rounded-bl-lg bg-ink px-6.5 py-6 text-paper">
            <figcaption className="mb-3 text-[12.5px] font-semibold tracking-[0.14em] uppercase opacity-80">
              {why.heardLabel}
            </figcaption>
            <blockquote className="font-serif text-[clamp(22px,2.2vw,30px)] leading-[1.22] italic">
              “{why.quote}”
            </blockquote>
            <p className="mt-3.5 text-[14px] opacity-85">{why.quoteSource}</p>
          </figure>
          <div className="rounded-[30px] rounded-br-lg bg-violet px-6.5 py-6 text-white">
            <p className="mb-3 text-[12.5px] font-semibold tracking-[0.14em] uppercase opacity-85">
              {why.builtLabel}
            </p>
            <p className="text-[clamp(18px,1.5vw,20px)] leading-normal font-medium">
              {why.lead}
            </p>
          </div>
        </div>

        <dl className="mt-3.5 grid gap-2.5 sm:grid-cols-3" data-stagger="0.1">
          {why.stats.map((stat, i) => (
            <div
              key={stat.value}
              className={`grid grid-cols-[auto_1fr] items-center gap-3.5 rounded-[26px] px-4 py-4.5 sm:grid-cols-1 sm:content-start sm:gap-1.5 ${STAT_SURFACE[i % 3]}`}
            >
              <dt className="font-display text-[clamp(40px,5vw,64px)] leading-[0.9] font-extrabold tracking-tighter tabular-nums">
                {stat.value}
              </dt>
              <dd className="text-[14px] leading-[1.35]">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
