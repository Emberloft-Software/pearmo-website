import { QrCode } from "@/components/QrCode";
import { TrackedLink } from "@/components/TrackedLink";
import { Icon } from "@/components/ui/Icon";
import { actions } from "@/content/site-content";
import { getUrlLabel, site } from "@/lib/site";

/**
 * The "open the app" controls. Server-only: the QR code is generated here,
 * and the QR library must never end up in a client bundle. ("Join the beta"
 * is BetaLink.tsx, which client components can import.)
 *
 * The rules, all in one place:
 * - Anything that opens the web app renders only when `site.webAppUrl` is
 *   set. While it's null these return nothing, so no QR or app button can
 *   leak out before launch.
 * - Phones and tablets get a button; a desktop with a mouse gets a QR card.
 *   That split is CSS (`touch:` / `desk:` variants in globals.css), never
 *   user-agent sniffing, so the server HTML is the same for everyone.
 * - These are links, not install prompts. A page can only prompt to install
 *   its own manifest, and the installable app is app.pearmo.com.
 */

/** "Already invited? Open Pearmo →" for phones and tablets. */
export function OpenAppLine({
  event,
  className = "",
  linkClassName = "font-semibold underline underline-offset-3",
}: {
  event: string;
  className?: string;
  linkClassName?: string;
}) {
  if (!site.webAppUrl) return null;
  return (
    <p className={`touch:block hidden text-[15.5px] ${className}`}>
      {actions.invited}{" "}
      <TrackedLink href={site.webAppUrl} event={event} className={linkClassName}>
        {actions.openApp}
        <Icon name="arrow" className="ml-1 inline h-4 w-4 align-[-2px]" />
      </TrackedLink>
      <small className="mt-0.5 block text-[13.5px] opacity-85">
        {actions.noStore}
      </small>
    </p>
  );
}

/** The desktop QR card: "Already invited? Scan with your phone". */
export function QrCard({ className = "" }: { className?: string }) {
  if (!site.webAppUrl) return null;
  return (
    <div
      className={`desk:grid hidden grid-cols-[auto_1fr] items-center gap-4.5 rounded-[24px] bg-paper py-3 pr-5 pl-3 text-ink ${className}`}
    >
      <QrCode px={164} />
      <div>
        <b className="font-display block text-[21px] leading-[1.1] font-extrabold tracking-[-0.03em]">
          {actions.invited}
          <br />
          {actions.scan}
        </b>
        <p className="mt-1.5 mb-2 font-semibold text-violet-deep">{getUrlLabel}</p>
        <p className="text-[14px] text-ink-2">
          or{" "}
          <TrackedLink
            href={site.webAppUrl}
            event="open_app_desktop_link"
            className="font-semibold underline underline-offset-3"
          >
            {actions.openHere}
          </TrackedLink>
        </p>
      </div>
    </div>
  );
}

/**
 * Desktop nav: a "Get Pearmo" disclosure holding the QR. Native <details>,
 * so it opens with the keyboard and works with JavaScript off.
 */
export function NavGetApp() {
  if (!site.webAppUrl) return null;
  return (
    <details className="desk:block group relative hidden">
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full bg-violet-soft px-4 text-[15px] font-semibold text-violet-deep [&::-webkit-details-marker]:hidden">
        <Icon name="qr" className="h-4.5 w-4.5" />
        {actions.getApp}
      </summary>
      <div className="absolute top-14 right-0 grid w-60 justify-items-center gap-1 rounded-[24px] bg-violet p-4 text-center text-white shadow-[0_24px_50px_-24px_rgb(23_16_31/0.6)]">
        <QrCode px={180} className="mb-2" />
        <b className="font-display text-[17px] font-extrabold">{actions.invited}</b>
        <span className="text-[14px] text-on-violet">{actions.scan}</span>
        <span className="font-bold text-lime">{getUrlLabel}</span>
        <TrackedLink
          href={site.webAppUrl}
          event="open_app_nav"
          className="mt-1.5 text-[14px] text-white underline underline-offset-3"
        >
          or {actions.openHere}
        </TrackedLink>
      </div>
    </details>
  );
}
