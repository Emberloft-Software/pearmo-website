"use client";

import { useEffect, useState } from "react";

import { LogoMark } from "@/components/Logo";
import { nav } from "@/content/site-content";

/**
 * Floating nav pill.
 *
 * The original hid the links entirely below 760px with no alternative, leaving
 * mobile visitors — the majority of the audience — with no way to navigate.
 * This adds a proper disclosure menu.
 */
export function Nav() {
  const [open, setOpen] = useState(false);

  // Close on Escape, and lock scroll while the sheet is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
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
    <header className="pointer-events-none fixed inset-x-0 top-3.5 z-50 flex justify-center px-3">
      <nav
        aria-label="Main"
        className="border-line/90 pointer-events-auto flex w-full max-w-[1100px] items-center gap-6 rounded-full border bg-white/72 py-2.5 pr-3 pl-5 shadow-pill backdrop-blur-[14px] md:w-auto"
      >
        <a
          href="#top"
          aria-label={nav.logoLabel}
          className="flex flex-1 items-center gap-2.5 text-[19px] font-extrabold tracking-[-0.02em] md:flex-none"
        >
          <LogoMark gradientId="logo-nav" className="h-6 w-6" />
          pearmo
        </a>

        <ul className="text-ink-2 hidden gap-[22px] text-sm font-medium lg:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="group relative block py-1">
                {link.label}
                <span className="brand-gradient absolute bottom-0 left-0 h-0.5 w-0 rounded-sm transition-[width] duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={nav.cta.href}
          className="brand-gradient hidden items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
        >
          {nav.cta.label}
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? nav.menuCloseLabel : nav.menuOpenLabel}
          className="border-line text-ink grid h-10 w-10 place-items-center rounded-full border bg-white lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="border-line pointer-events-auto fixed inset-x-3 top-[76px] rounded-card border bg-white p-5 shadow-glow lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-ink-2 hover:bg-violet-wash block rounded-panel px-4 py-3 text-base font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={nav.cta.href}
            onClick={() => setOpen(false)}
            className="brand-gradient mt-3 block rounded-full px-5 py-3.5 text-center text-sm font-semibold text-white"
          >
            {nav.cta.label}
          </a>
        </div>
      )}
    </header>
  );
}
