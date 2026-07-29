"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger, in seconds — matches the original d1–d4 delay classes. */
  delay?: number;
  className?: string;
  as?: ElementType;
  id?: string;
};

/**
 * Fades content up as it scrolls into view, then stops observing.
 *
 * The revealed class is toggled on the element directly rather than held in
 * state: this is a one-way DOM effect with no bearing on React's output, so
 * driving it through state would only cost an extra render per element (and
 * there are ~50 of them on the page).
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      // rootMargin nudges the trigger slightly early so content isn't still
      // fading in by the time it's fully on screen.
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
