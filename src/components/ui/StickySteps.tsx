"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Desktop "How it works" (the layout from direction A, restyled in C): the
 * steps scroll by on the left while one phone stays put on the right, and
 * the step nearest the middle of the screen picks its screen. The panel
 * behind the phone takes that step's colour.
 *
 * Without JavaScript the first step is active and every step is still
 * there to read; the phone just doesn't change.
 */
const PANEL = [
  "border border-line bg-white",
  "bg-lime",
  "bg-violet",
  "bg-ink",
] as const;
const NUM_ACTIVE = [
  "bg-lime text-ink",
  "bg-ink text-lime",
  "bg-violet text-white",
  "bg-ink text-paper",
] as const;

export function StickySteps({
  steps,
  shots,
}: {
  steps: readonly { title: string; body: string }[];
  shots: readonly ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = list.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items?.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number(entry.target.getAttribute("data-step")));
        }
      },
      // A thin band across the middle of the screen.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mt-6 hidden grid-cols-[1fr_440px] gap-20 lg:grid">
      <ol ref={list}>
        {steps.map((step, i) => (
          <li
            key={step.title}
            data-step={i}
            className="flex min-h-[62vh] max-w-[480px] flex-col justify-center"
          >
            <span
              className={`font-display mb-4 grid h-11 w-11 place-items-center rounded-full text-[19px] font-extrabold transition-colors duration-300 ${
                i === active ? NUM_ACTIVE[i % NUM_ACTIVE.length] : "bg-violet-soft text-violet-deep"
              }`}
            >
              {i + 1}
            </span>
            <h3 className="font-display mb-3 text-[32px] leading-[1.05] font-extrabold tracking-[-0.035em]">
              {step.title}
            </h3>
            <p className="text-[18px] leading-[1.6] text-ink-2">{step.body}</p>
          </li>
        ))}
      </ol>

      <div>
        <div
          className={`sticky top-[calc(50vh-330px)] grid h-165 place-items-center rounded-block transition-colors duration-500 ${PANEL[active % PANEL.length]}`}
        >
          <div className="relative w-[300px] overflow-hidden rounded-[42px] border-[10px] border-ink bg-ink shadow-[0_40px_70px_-40px_rgb(23_16_31/0.6)]">
            {shots.map((shot, i) => (
              <div
                key={i}
                aria-hidden={i !== active}
                className={`overflow-hidden rounded-[32px] transition-opacity duration-500 ${
                  i === 0 ? "relative" : "absolute inset-0"
                } ${i === active ? "opacity-100" : "opacity-0"}`}
              >
                {shot}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
