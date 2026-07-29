"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger, in seconds — matches the original d1–d4 delay classes. */
  delay?: number;
  className?: string;
  as?: ElementType;
  id?: string;
  /**
   * For above-the-fold content. Uses a CSS-only transform entrance that keeps
   * `opacity: 1`, so the element paints on the first frame instead of waiting
   * for hydration and the observer.
   *
   * Anything that could be the Largest Contentful Paint element must set this —
   * the hero paragraph measured a 4.3s LCP without it.
   */
  eager?: boolean;
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
  eager = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Eager elements animate purely in CSS — nothing to observe.
    if (eager) return;

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
  }, [eager]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${eager ? "reveal-eager" : "reveal"} ${className}`.trim()}
      style={
        delay
          ? eager
            ? { animationDelay: `${delay}s` }
            : { transitionDelay: `${delay}s` }
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
