"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll motion for the whole site: Lenis smooth scrolling plus GSAP
 * ScrollTrigger animations, driven by data attributes in the markup.
 *
 * Rules this follows, and why:
 * - Nothing loads until the visitor first scrolls, touches, moves the mouse
 *   or presses a key, and then only when the browser is idle. Scroll effects
 *   aren't needed before anyone scrolls, and loading them during page load
 *   cost ~300 ms of main-thread blocking on a throttled phone (measured).
 *   GSAP and Lenis (~45 KB gzipped together) never compete with the LCP.
 * - Reveals fade with opacity only, never visibility (GSAP's autoAlpha):
 *   hidden elements can't take focus, so keyboard users would skip whole
 *   sections that hadn't been scrolled to yet. Focusing something scrolls it
 *   into view, which triggers its reveal.
 * - Content is never hidden by CSS. Animations start from the final, visible
 *   state in the HTML, and an element only animates in if it is below the
 *   fold when this runs, so nothing on screen at load ever blinks out. With
 *   JavaScript off, or before this loads, the page is simply static.
 * - `prefers-reduced-motion: reduce` gets no Lenis and no animations at all.
 * - Lenis only for a mouse or trackpad. Phones keep native touch scrolling,
 *   which is already smooth and is what iOS gestures expect.
 *
 * Attributes:
 *   data-reveal              fade up once when scrolled into view
 *   data-stagger="0.08"      children fade up one after another
 *   data-split               heading words rise in, then the split is undone
 *   data-parallax="0.12"     drift on scroll (negative moves up); scope is the
 *                            nearest [data-parallax-scope], else the element
 *   data-marquee             the moving track of a marquee; speeds up with
 *                            scroll velocity
 *   data-spotlight           a scene whose .spotlight-over layer opens with
 *                            scroll (avatars -> people); the nearest
 *                            [data-pin] is pinned on desktop meanwhile
 *   data-radar="cx cy"       an SVG group that grows from that point
 */

type Libs = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  SplitText: typeof import("gsap/SplitText").SplitText;
};

const DESK = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

let libsPromise: Promise<Libs> | null = null;
function loadLibs(): Promise<Libs> {
  libsPromise ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("gsap/SplitText"),
  ]).then(([g, st, sp]) => {
    g.gsap.registerPlugin(st.ScrollTrigger, sp.SplitText);
    return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger, SplitText: sp.SplitText };
  });
  return libsPromise;
}

function whenIdle(fn: () => void): () => void {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(fn, { timeout: 600 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(fn, 100);
  return () => clearTimeout(id);
}

const ENGAGE_EVENTS = ["scroll", "wheel", "touchstart", "pointermove", "pointerdown", "keydown"] as const;
let engaged = false;

/** Runs `fn` (when idle) after the first sign of a person using the page. */
function whenEngaged(fn: () => void): () => void {
  if (engaged) return whenIdle(fn);
  let cancelIdle = () => {};
  const onEngage = () => {
    engaged = true;
    remove();
    cancelIdle = whenIdle(fn);
  };
  const remove = () => {
    for (const type of ENGAGE_EVENTS) window.removeEventListener(type, onEngage);
  };
  for (const type of ENGAGE_EVENTS) {
    window.addEventListener(type, onEngage, { passive: true, once: true });
  }
  return () => {
    remove();
    cancelIdle();
  };
}

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setup({ gsap, ScrollTrigger, SplitText }: Libs) {
  const fold = window.innerHeight * 0.92;
  const belowFold = (el: Element) => el.getBoundingClientRect().top > fold;
  const all = <T extends Element = HTMLElement>(sel: string) =>
    gsap.utils.toArray<T>(sel);

  for (const el of all("[data-reveal]")) {
    if (!belowFold(el)) continue;
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: Number(el.dataset.delay ?? 0),
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  }

  for (const group of all("[data-stagger]")) {
    if (!belowFold(group)) continue;
    gsap.from(group.children, {
      y: 44,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: Number(group.dataset.stagger || 0.09),
      scrollTrigger: { trigger: group, start: "top 85%", once: true },
    });
  }

  for (const heading of all("[data-split]")) {
    if (!belowFold(heading)) continue;
    // aria: "auto" labels the heading with its full text and hides the word
    // fragments from screen readers; revert() restores the original markup.
    const split = SplitText.create(heading, { type: "words", aria: "auto" });
    gsap.from(split.words, {
      yPercent: 70,
      opacity: 0,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.045,
      scrollTrigger: { trigger: heading, start: "top 88%", once: true },
      onComplete: () => split.revert(),
    });
  }

  for (const el of all("[data-parallax]")) {
    const amount = Number(el.dataset.parallax) || 0.1;
    const scope = el.closest("[data-parallax-scope]") ?? el;
    gsap.fromTo(
      el,
      { yPercent: 0 },
      {
        yPercent: amount * 100,
        ease: "none",
        // clamp() keeps progress at 0 for anything already on screen at
        // load, so above-the-fold elements don't jump when this kicks in.
        scrollTrigger: { trigger: scope, start: "clamp(top bottom)", end: "bottom top", scrub: true },
      },
    );
  }

  for (const track of all("[data-marquee]")) {
    // Take over from the CSS animation so speed can follow scroll velocity.
    track.style.animation = "none";
    const loop = gsap.to(track, { xPercent: -50, duration: 60, ease: "none", repeat: -1 });
    const settle = gsap.to(loop, { timeScale: 1, duration: 0.8, ease: "power2.out", paused: true });
    ScrollTrigger.create({
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
        loop.timeScale(boost);
        settle.invalidate().restart();
      },
    });
    track.addEventListener("pointerenter", () => loop.pause());
    track.addEventListener("pointerleave", () => loop.resume());
  }

  for (const svgGroup of all<SVGGElement>("[data-radar]")) {
    const svg = svgGroup.ownerSVGElement;
    if (!svg || !belowFold(svg)) continue;
    gsap.from(svgGroup, {
      scale: 0.15,
      opacity: 0,
      // The chart centre in SVG units, from data-radar="cx cy".
      svgOrigin: svgGroup.dataset.radar || undefined,
      duration: 1.2,
      ease: "back.out(1.5)",
      scrollTrigger: { trigger: svg, start: "top 80%", once: true },
    });
  }

  const mm = gsap.matchMedia();
  for (const scene of all("[data-spotlight]")) {
    const over = scene.querySelector<HTMLElement>(".spotlight-over");
    // Already on screen: leave it open rather than snapping it shut.
    if (!over || !belowFold(scene)) continue;
    const state = { r: 0 };
    const apply = () => over.style.setProperty("--r", `${state.r}%`);
    apply();
    const pinTarget = scene.closest<HTMLElement>("[data-pin]");

    // Desktop: hold the section in place while the avatars become people.
    mm.add(DESK, () => {
      gsap.to(state, {
        r: 160,
        ease: "none",
        onUpdate: apply,
        scrollTrigger: pinTarget
          ? { trigger: pinTarget, start: "top top", end: "+=90%", pin: true, scrub: 0.6 }
          : { trigger: scene, start: "top 70%", end: "bottom 30%", scrub: 0.6 },
      });
    });
    // Touch: no pinning; the spotlight follows the scene through the screen.
    mm.add(`not all and ${DESK}`, () => {
      gsap.to(state, {
        r: 160,
        ease: "none",
        onUpdate: apply,
        scrollTrigger: { trigger: scene, start: "top 75%", end: "bottom 40%", scrub: 0.6 },
      });
    });
  }

  return () => mm.revert();
}

export function Motion() {
  const pathname = usePathname();

  // Lenis: once per visit, mouse and trackpad only.
  useEffect(() => {
    if (reducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    let dead = false;
    let teardown = () => {};
    const cancel = whenEngaged(async () => {
      const [{ gsap, ScrollTrigger }, { default: Lenis }] = await Promise.all([
        loadLibs(),
        import("lenis"),
      ]);
      if (dead) return;
      const lenis = new Lenis({
        lerp: 0.11,
        // Lenis handles in-page anchor links itself; the offset clears the
        // sticky nav, matching scroll-padding-top in globals.css.
        anchors: { offset: -84 },
        autoRaf: false,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      teardown = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });
    return () => {
      dead = true;
      cancel();
      teardown();
    };
  }, []);

  // Scroll animations: rebuilt for every page, since client-side navigation
  // swaps the DOM underneath.
  useEffect(() => {
    if (reducedMotion()) return;
    let dead = false;
    let teardown = () => {};
    const cancel = whenEngaged(async () => {
      const libs = await loadLibs();
      if (dead) return;
      let undoMedia = () => {};
      const ctx = libs.gsap.context(() => {
        undoMedia = setup(libs);
      });
      // Font swaps change heights, so trigger positions need a recount.
      void document.fonts?.ready.then(() => {
        if (!dead) libs.ScrollTrigger.refresh();
      });
      teardown = () => {
        undoMedia();
        ctx.revert();
      };
    });
    return () => {
      dead = true;
      cancel();
      teardown();
    };
  }, [pathname]);

  return null;
}
