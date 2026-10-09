"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

/**
 * Equal-width topic tabs over the FAQ.
 *
 * Every panel is in the HTML whichever tab is showing (so the FAQPage markup
 * always matches the page, and in-page find still works). Which panel shows
 * is CSS: under `scripting: enabled` the inactive ones are hidden; without
 * JavaScript the tab bar disappears and the groups stack with their titles.
 * Keyboard: arrow keys, Home and End move between tabs (WAI-ARIA tabs).
 */
export function FaqTabs({
  panels,
}: {
  panels: readonly { id: string; label: string; content: ReactNode }[];
}) {
  const [active, setActive] = useState(panels[0]?.id ?? "");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = panels.length - 1;
    const next =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    const panel = panels[next];
    if (!panel) return;
    setActive(panel.id);
    tabs.current[next]?.focus();
  };

  return (
    <div className="faq-tabs">
      <div
        role="tablist"
        aria-label="Question topics"
        className="faq-tablist mb-4 grid grid-cols-3 gap-1.5 rounded-[22px] bg-violet-soft p-1.5"
      >
        {panels.map((panel, i) => {
          const selected = panel.id === active;
          return (
            <button
              key={panel.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`faq-tab-${panel.id}`}
              aria-selected={selected}
              aria-controls={`faq-panel-${panel.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(panel.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`min-h-12 rounded-[16px] px-2 text-[14.5px] leading-tight font-semibold transition-colors ${
                selected ? "bg-ink text-lime" : "text-violet-deep hover:bg-white/70"
              }`}
            >
              {panel.label}
            </button>
          );
        })}
      </div>

      {panels.map((panel) => (
        <div
          key={panel.id}
          role="tabpanel"
          id={`faq-panel-${panel.id}`}
          aria-labelledby={`faq-tab-${panel.id}`}
          data-active={panel.id === active ? "true" : "false"}
          className="faq-panel"
        >
          <p className="faq-group-title mb-2.5 text-[13px] font-semibold tracking-[0.14em] text-mute uppercase">
            {panel.label}
          </p>
          {panel.content}
        </div>
      ))}
    </div>
  );
}
