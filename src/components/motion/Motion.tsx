"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll motion for the whole site: Lenis smooth scrolling plus GSAP
 * ScrollTrigger animations, driven by data attributes in the markup.
 *
 * Rules this follows, and why:
 * - Nothing loads until the browser is idle after first paint, so GSAP and
 *   Lenis (~45 KB gzipped together) never compete with the LCP.
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
 *   data-compare-scrub       a Compare slider whose split follows scroll; the
 *                            nearest [data-pin] is pinned on desktop meanwhile
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
    const id = window.requestIdleCallback(fn, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(fn, 200);
  return () => clearTimeout(id);
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
      autoAlpha: 0,
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
      autoAlpha: 0,
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
      autoAlpha: 0,
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
      autoAlpha: 0,
      // The chart centre in SVG units, from data-radar="cx cy".
      svgOrigin: svgGroup.dataset.radar || undefined,
      duration: 1.2,
      ease: "back.out(1.5)",
      scrollTrigger: { trigger: svg, start: "top 80%", once: true },
    });
  }

  const mm = gsap.matchMedia();
  for (const cmp of all("[data-compare-scrub]")) {
    const input = cmp.querySelector("input");
    const state = { x: 88 };
    const apply = () => {
      if (cmp.dataset.touched) return;
      cmp.style.setProperty("--x", `${state.x}%`);
      if (input) input.value = String(Math.round(state.x));
    };
    apply();
    const pinTarget = cmp.closest<HTMLElement>("[data-pin]");

    // Desktop: hold the section in place while the avatars turn into people.
    mm.add(DESK, () => {
      gsap.to(state, {
        x: 12,
        ease: "none",
        onUpdate: apply,
        scrollTrigger: pinTarget
          ? { trigger: pinTarget, start: "top top", end: "+=90%", pin: true, scrub: 0.6 }
          : { trigger: cmp, start: "top 75%", end: "bottom 25%", scrub: 0.6 },
      });
    });
    // Touch: no pinning; the split follows the section through the screen.
    mm.add(`not all and ${DESK}`, () => {
      gsap.to(state, {
        x: 12,
        ease: "none",
        onUpdate: apply,
        scrollTrigger: { trigger: cmp, start: "top 80%", end: "bottom 35%", scrub: 0.6 },
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
    const cancel = whenIdle(async () => {
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
    const cancel = whenIdle(async () => {
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
