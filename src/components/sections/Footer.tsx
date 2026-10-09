import Link from "next/link";

import { Wordmark } from "@/components/Logo";
import { QrCode } from "@/components/QrCode";
import { wrap } from "@/components/ui/styles";
import { footer } from "@/content/site-content";
import { getUrlLabel, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 bg-ink pt-12 pb-10 text-paper">
      <div className={wrap}>
        <div className="grid gap-6.5 lg:grid-cols-[1.3fr_1.2fr_1fr] lg:items-start">
          <div>
            <Link href="/" aria-label="Pearmo home" className="text-[22px]">
              <Wordmark tone="light" />
            </Link>
            <p className="mt-2 max-w-[36ch] text-[14.5px] text-[#cfc8df]">{footer.tagline}</p>
          </div>

          <div className="grid gap-3.5">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-5.5 gap-y-2.5 text-[15px]">
                {footer.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[#e4dfef] transition-colors hover:text-lime">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="text-[15px]">
              {footer.contactLabel}:{" "}
              <a href={`mailto:${site.contactEmail}`} className="font-semibold text-lime underline underline-offset-3">
                {site.contactEmail}
              </a>
            </p>
          </div>

          {/* The small QR: desktop only, and only once the web app is live. */}
          {site.webAppUrl && (
            <div className="desk:grid hidden grid-cols-[auto_1fr] items-center gap-3 text-[13.5px] text-[#cfc8df]">
              <QrCode px={112} className="rounded-[10px]" />
              <p>
                <b className="block text-[14.5px] text-paper">{footer.qrLabel}</b>
                {getUrlLabel}
              </p>
            </div>
          )}
        </div>
        <div className="mt-7.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[13px] text-[#cfc8df]">
          <p>{footer.copyright}</p>
          {/* Temporary, for comparing design directions; see site-content. */}
          <p>
            {footer.designPreviews.label}:{" "}
            {footer.designPreviews.links.map((link, i) => (
              <span key={link.href}>
                {i > 0 && " · "}
                <Link
                  href={link.href}
                  prefetch={false}
                  rel="nofollow"
                  className="text-[#e4dfef] underline underline-offset-3 hover:text-lime"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
