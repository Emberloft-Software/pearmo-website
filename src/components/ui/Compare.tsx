"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";

/**
 * Drag-to-compare: the avatar scene underneath, the person scene clipped on
 * top, split at `--x`.
 *
 * The control is a real `<input type="range">` stretched over the image, so
 * it works with a keyboard (arrow keys), a screen reader (it's a slider) and
 * touch, where `touch-action: pan-y` keeps vertical page scrolling free. With
 * JavaScript off it renders at the halfway split.
 *
 * `nudge` plays one small hint movement so people see it moves.
 */
export function Compare({
  before,
  after,
  beforeLabel,
  afterLabel,
  label,
  caption,
  nudge = false,
  className = "",
}: {
  before: ReactNode;
  after: ReactNode;
  beforeLabel: string;
  afterLabel: string;
  label: string;
  caption?: string;
  nudge?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!nudge || !el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        if (el.dataset.touched) return;
        const t = Math.min(1, (now - start) / 1400);
        // Out to 34% and back, eased: one clear "this moves" gesture.
        const v = 50 - 16 * Math.sin(Math.PI * t) ** 2;
        el.style.setProperty("--x", `${v}%`);
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, 1200);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [nudge]);

  return (
    <div ref={ref} className={`compare ${className}`}>
      {before}
      <div className="compare-over absolute inset-0">{after}</div>

      <span
        aria-hidden="true"
        className="compare-bar pointer-events-none absolute inset-y-0 z-1 -ml-[1.5px] w-[3px] bg-paper"
      />
      <span className="pointer-events-none absolute top-4 left-4 z-1 rounded-full bg-ink/80 px-3.5 py-2 text-[13.5px] leading-none font-semibold text-paper">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute top-4 right-4 z-1 rounded-full bg-paper px-3.5 py-2 text-[13.5px] leading-none font-semibold text-ink">
        {afterLabel}
      </span>
      {caption && (
        <p className="pointer-events-none absolute right-3.5 bottom-3.5 left-3.5 z-1 max-w-[380px] rounded-[18px] bg-ink/85 px-4 py-3 text-[14.5px] leading-[1.4] text-paper">
          {caption}
        </p>
      )}

      <input
        type="range"
        min={0}
        max={100}
        defaultValue={50}
        aria-label={label}
        onInput={(e) => {
          const el = ref.current;
          if (!el) return;
          el.dataset.touched = "1";
          el.style.setProperty("--x", `${e.currentTarget.value}%`);
        }}
        className="absolute inset-0 z-2 m-0 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
      />
      <span
        aria-hidden="true"
        className="compare-knob pointer-events-none absolute top-1/2 z-1 -mt-7.25 -ml-7.25 grid h-14.5 w-14.5 place-items-center rounded-full bg-paper text-violet shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)]"
      >
        <Icon name="swap" className="h-6.5 w-6.5" strokeWidth={2.4} />
      </span>
    </div>
  );
}
