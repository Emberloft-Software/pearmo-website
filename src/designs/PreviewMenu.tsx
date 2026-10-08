"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";

/**
 * Phone menu for the A and B previews: a disclosure with Escape to close and
 * focus returned to the button. Styling comes from each design's stylesheet
 * through the class names passed in.
 */
export function PreviewMenu({
  buttonClass,
  sheetClass,
  children,
}: {
  buttonClass: string;
  sheetClass: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    sheet.current?.querySelector("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        ref={button}
        type="button"
        className={buttonClass}
        aria-expanded={open}
        aria-controls="preview-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name={open ? "close" : "menu"} />
      </button>
      {open && (
        <div
          id="preview-menu"
          ref={sheet}
          className={sheetClass}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}
