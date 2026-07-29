"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger, in seconds — matches the original d1–d4 delay classes. */
  delay?: number;
  className?: string;
  as?: ElementType;
  /** Extra class applied once revealed, e.g. to trigger child animations. */
  id?: string;
};

/**
 * Fades content up as it scrolls into view, then stops observing.
 *
 * The hidden pre-reveal state lives in CSS behind `@media (scripting: enabled)`
 * so content is never invisible when JS doesn't run. Elements also reveal
 * immediately if IntersectionObserver is missing.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    // Already in view on mount (above the fold) — reveal without waiting for
    // a scroll event, otherwise the hero sits blank until the user moves.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${revealed ? "is-revealed" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
