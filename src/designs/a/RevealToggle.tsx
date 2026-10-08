"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";

/**
 * Direction A's reveal: an Avatar / Photo segmented control, like the app's
 * own tabs, that wipes the person layer over the avatar layer. Plays once on
 * its own (on load for the hero, on scroll-in otherwise) unless the visitor
 * prefers reduced motion.
 */
export function RevealToggle({
  children,
  sceneClass,
  auto,
  photoLocked = false,
}: {
  children: ReactNode;
  sceneClass: string;
  auto: "load" | "view";
  photoLocked?: boolean;
}) {
  const scene = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [showing, setShowing] = useState<0 | 1>(0);

  const go = (to: 0 | 1) => {
    setShowing(to);
    const el = scene.current?.querySelector<HTMLElement>(".over");
    if (!el) return;
    const from = progress.current;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      progress.current = to;
      el.style.setProperty("--p", String(to));
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 1100);
      const k = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
      progress.current = from + (to - from) * k;
      el.style.setProperty("--p", String(progress.current));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = scene.current;
    if (!el) return;
    if (auto === "load") {
      const t = setTimeout(() => go(1), 1400);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTimeout(() => go(1), 400);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [auto]);

  return (
    <>
      <div ref={scene} className={sceneClass}>
        {children}
      </div>
      <div className="seg" role="group" aria-label="Show the scene as">
        <button type="button" aria-pressed={showing === 0} onClick={() => go(0)}>
          Avatar
        </button>
        <button type="button" aria-pressed={showing === 1} onClick={() => go(1)}>
          {photoLocked && <Icon name="lock" className="h-3.5 w-3.5" strokeWidth={2.4} />}
          Photo
        </button>
      </div>
    </>
  );
}
