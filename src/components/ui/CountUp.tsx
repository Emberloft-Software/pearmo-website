"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `value` once scrolled into view.
 *
 * Renders `value` as the initial text rather than 0, so the correct number is
 * in the server HTML — a crawler or a JS-less reader sees "93", not "0". The
 * animation resets to 0 only at the moment it starts.
 *
 * Respects prefers-reduced-motion by skipping the animation entirely.
 */
export function CountUp({
  value,
  durationMs = 1400,
}: {
  value: number;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") return;

    // Drop to 0 as soon as we know the animation will run. Doing this here
    // rather than in initial state keeps the real number in the server HTML.
    setDisplay(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);

          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / durationMs, 1);
            // Ease-out cubic — fast then settling, same curve as the original.
            setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
            if (p < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  return <span ref={ref}>{display}</span>;
}
