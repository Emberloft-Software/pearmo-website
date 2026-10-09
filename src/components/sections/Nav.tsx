"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { BetaLink } from "@/components/BetaLink";
import { Wordmark } from "@/components/Logo";
import { TrackedLink } from "@/components/TrackedLink";
import { Icon } from "@/components/ui/Icon";
import { button, buttonSmall, wrap } from "@/components/ui/styles";
import { actions, nav } from "@/content/site-content";

/**
 * Sticky top bar. Below 1024px the links move into a disclosure menu: Escape
 * closes it, focus moves into it on open and back to the button on close,
 * and the page behind stops scrolling.
 *
 * `getApp` is the desktop QR disclosure, rendered on the server (the QR
 * library never ships to the browser) and passed in. `webAppUrl` adds the
 * "Open Pearmo" line to the phone menu; both are absent until launch.
 */
export function Nav({
  getApp,
  webAppUrl,
}: {
  getApp?: ReactNode;
  webAppUrl: string | null;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // The desktop "Get Pearmo" QR panel is a native <details> (works without
  // JS). With JS it also closes on scroll, Escape or a click elsewhere, so it
  // never floats over the page while someone reads on.
  useEffect(() => {
    const closePanels = (e?: Event) => {
      document.querySelectorAll<HTMLDetailsElement>("header details[open]").forEach((d) => {
        if (e?.target instanceof Node && d.contains(e.target)) return;
        d.open = false;
      });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanels();
    };
    const onScroll = () => closePanels();
    document.addEventListener("click", closePanels);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", closePanels);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    sheetRef.current?.querySelector("a")?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-paper/94 backdrop-blur-md">
      <nav aria-label="Main" className={`${wrap} flex h-17 items-center gap-3.5`}>
        <a href="#top" aria-label={nav.logoLabel} className="mr-auto text-[22px] min-[400px]:text-[25px]">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-6 text-[15px] font-medium text-ink-2 lg:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="py-2 transition-colors hover:text-violet-deep">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {getApp}

        <BetaLink
          event="beta_form_nav"
          className={`${button.ink} ${buttonSmall} whitespace-nowrap max-[399px]:px-4 max-[399px]:text-[14px]`}
        />

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? nav.menuCloseLabel : nav.menuOpenLabel}
          className="grid h-11 w-11 place-items-center rounded-full bg-lime text-ink lg:hidden"
        >
          <Icon name={open ? "close" : "menu"} strokeWidth={2.4} />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          ref={sheetRef}
          className="absolute inset-x-0 top-17 max-h-[calc(100dvh-68px)] overflow-y-auto bg-paper px-4 pt-2 pb-6 shadow-[0_30px_40px_-30px_rgb(23_16_31/0.35)] lg:hidden"
        >
          <ul>
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display block border-b border-line px-1 py-3.5 text-[22px] font-extrabold tracking-[-0.03em]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <BetaLink event="beta_form_menu" className={`${button.ink} mt-5 w-full`} />
          {webAppUrl && (
            <p className="mt-3.5 text-center text-[15px]">
              {actions.invited}{" "}
              <TrackedLink
                href={webAppUrl}
                event="open_app_nav"
                className="font-semibold underline underline-offset-3"
              >
                {actions.openApp}
              </TrackedLink>
            </p>
          )}
        </div>
      )}
    </header>
  );
}
