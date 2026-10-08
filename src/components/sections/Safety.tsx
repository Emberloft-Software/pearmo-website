import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { h2, lead, wrap } from "@/components/ui/styles";
import { safety } from "@/content/site-content";

/**
 * Each point carries the chip the app itself shows for it, so the claim and
 * the control that backs it sit side by side. Four colourways, two by two.
 */
const CARD_STYLE = [
  { card: "border border-line bg-white", chip: "bg-violet-soft text-violet-deep", body: "text-ink-2" },
  { card: "bg-ink text-paper", chip: "bg-lime text-ink", body: "text-[#d9d3e8]" },
  { card: "bg-lime", chip: "bg-ink text-lime", body: "text-ink-2" },
  { card: "bg-violet-soft", chip: "bg-violet text-white", body: "text-ink-2" },
] as const;

export function Safety() {
  return (
    <section id="safety" className="pb-16 lg:pb-24">
      <div className={wrap}>
        <Tag>{safety.kicker}</Tag>
        <h2 className={h2} data-split="">
          {safety.titleLead} <span className="mark-lime">{safety.titleMark}</span>
        </h2>
        <p className={`${lead} mt-4.5 text-ink-2`}>{safety.lead}</p>

        <ul className="mt-9 grid gap-3.5 md:grid-cols-2" data-stagger="0.1">
          {safety.cards.map((card, i) => {
            const s = CARD_STYLE[i % CARD_STYLE.length]!;
            return (
              <li key={card.title} className={`grid content-start gap-2.5 rounded-[30px] p-6 ${s.card}`}>
                <span
                  className={`inline-flex items-center gap-2 justify-self-start rounded-full px-3.25 py-1.75 text-[13px] leading-none font-bold ${s.chip}`}
                >
                  <Icon name={card.icon} className="h-3.75 w-3.75" strokeWidth={2.3} />
                  {card.chip}
                </span>
                <h3 className="font-display text-[22px] leading-[1.15] font-extrabold tracking-tight">
                  {card.title}
                </h3>
                <p className={`text-[16px] leading-[1.6] ${s.body}`}>{card.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
