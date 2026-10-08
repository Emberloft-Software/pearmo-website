"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Direction A, desktop "How it works": the step nearest the middle of the
 * screen picks which screenshot the sticky phone shows.
 */
export function StickySteps({
  steps,
  shots,
}: {
  steps: ReactNode[];
  shots: ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = list.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number(e.target.getAttribute("data-step")));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  return (
    <div className="how-desk">
      <div className="steps-list" ref={list}>
        {steps.map((step, i) => (
          <article key={i} data-step={i} className={i === active ? "on" : undefined}>
            {step}
          </article>
        ))}
      </div>
      <div>
        <div className="sticky">
          <div className="phone">
            {shots.map((shot, i) => (
              <div
                key={i}
                aria-hidden={i !== active}
                style={{ opacity: i === active ? 1 : 0, position: i ? "absolute" : "relative", inset: 0, transition: "opacity .45s" }}
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
