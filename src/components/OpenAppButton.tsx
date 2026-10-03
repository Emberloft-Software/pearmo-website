"use client";

import { track } from "@vercel/analytics";
import { useEffect, useState } from "react";

import { site } from "@/lib/site";

/** iPhone/iPad in any browser. iPadOS Safari reports itself as a Mac. */
function isAppleMobile(): boolean {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return true;
  return ua.includes("Macintosh") && navigator.maxTouchPoints > 1;
}

/**
 * "Open Pearmo" for iPhone visitors, linking to the web app. Shown only on
 * iPhone/iPad and only once `site.webAppUrl` is set:
 * - Android visitors keep the waitlist: the Android beta is an APK emailed
 *   to invited testers, never a public download.
 * - One person on both the web app and the APK would get every
 *   notification twice, so each platform gets exactly one way in.
 *
 * Decided after mount, so the server-rendered page is the same for everyone
 * and hydration can't mismatch.
 */
export function OpenAppButton({ className }: { className?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Reading the user agent has to wait for the browser; this runs once.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (site.webAppUrl && isAppleMobile()) setShow(true);
  }, []);

  if (!show || !site.webAppUrl) return null;

  return (
    <a
      href={site.webAppUrl}
      onClick={() => track("open_web_app")}
      className={className}
    >
      Open Pearmo
    </a>
  );
}
