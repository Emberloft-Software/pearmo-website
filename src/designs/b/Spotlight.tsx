"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Direction B's reveal: a soft circular spotlight opening between the two
 * faces, turning the avatars into people. `mode="load"` plays once after
 * load (the hero); `mode="scroll"` ties the radius to the section's position
 * on screen. Reduced motion shows the people straight away.
 */
export function Spotlight({
  className,
  mode,
  children,
}: {
  className: string;
  mode: "load" | "scroll";
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const over = el?.querySelector<HTMLElement>(".over");
    if (!el || !over) return;
    const set = (r: number) => over.style.setProperty("--r", `${r}%`);

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(160);
      return;
    }

    if (mode === "load") {
      let frame = 0;
      const timer = setTimeout(() => {
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / 2400);
          set((1 - (1 - t) ** 3) * 160);
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      }, 1100);
      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(frame);
      };
    }

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const k = Math.max(0, Math.min(1, ((vh - r.top) / (vh + r.height * 0.2) - 0.25) / 0.55));
        set(k * 160);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [mode]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
