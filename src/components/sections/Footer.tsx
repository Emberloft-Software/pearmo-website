import Link from "next/link";

import { LogoMark } from "@/components/Logo";
import { footer } from "@/content/site-content";

export function Footer() {
  return (
    <footer className="border-line border-t pt-[34px] pb-11">
      <div className="mx-auto flex w-[min(1160px,92vw)] flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <a
            href="#top"
            className="flex items-center gap-2.5 text-base font-extrabold tracking-[-0.02em]"
          >
            <LogoMark gradientId="logo-footer" className="h-5 w-5" />
            pearmo
          </a>
          <p className="text-mute hidden text-[13px] sm:block">{footer.tagline}</p>
        </div>

        <nav aria-label="Footer" className="flex items-center gap-5">
          {footer.links.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                href={link.href}
                className="text-mute hover:text-ink text-[13px] transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-mute hover:text-ink text-[13px] transition-colors"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <span className="text-mute font-mono text-[11px] tracking-[0.14em] uppercase">
          {footer.copyright}
        </span>
      </div>
    </footer>
  );
}
