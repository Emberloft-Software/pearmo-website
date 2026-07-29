"use client";

import { useEffect, useRef } from "react";

/**
 * Counts up to `value` once scrolled into view.
 *
 * `value` is what React renders, so the real number is in the server HTML — a
 * crawler or a JS-less reader sees "93", not "0". The animation then drives
 * `textContent` directly: React never re-renders this node, so mutating it is
 * safe, and it avoids ~40 state updates per counter.
 *
 * Skipped entirely under prefers-reduced-motion, which leaves the final value
 * on screen.
 */
export function CountUp({
  value,
  durationMs = 1400,
}: {
  value: number;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") return;

    el.textContent = "0";

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
            el.textContent = String(
              Math.round(value * (1 - Math.pow(1 - p, 3))),
            );
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
      // Restore the true value if this unmounts mid-animation.
      el.textContent = String(value);
    };
  }, [value, durationMs]);

  return <span ref={ref}>{value}</span>;
}
