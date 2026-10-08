"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes } from "react";

/**
 * A plain link that records one Vercel Analytics event when it's followed.
 * One event name per placement (hero, nav, final CTA, …) so the dashboard
 * shows which button people actually use, not one blended number.
 */
export function TrackedLink({
  event,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { event: string }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event);
        onClick?.(e);
      }}
    />
  );
}
