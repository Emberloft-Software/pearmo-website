import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BetaLink } from "@/components/BetaLink";
import { Wordmark } from "@/components/Logo";
import { button } from "@/components/ui/styles";

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 must never be indexed, even though Next already returns a 404 status.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-svh flex-col items-center justify-center px-4 py-12 text-center"
    >
      <Link href="/" aria-label="Pearmo home" className="mb-10 text-[25px]">
        <Wordmark />
      </Link>

      <div className="grid w-full max-w-[640px] justify-items-center rounded-block bg-lime px-6 py-10 lg:px-12">
        <Image
          src="/assets/avatars/hedgehog-m.png"
          alt=""
          width={128}
          height={128}
          priority
          sizes="112px"
          className="mb-5 h-28 w-28 rounded-full border-4 border-paper bg-violet-soft"
        />
        <p className="text-[14px] font-semibold tracking-[0.18em] text-ink-2 uppercase">
          Error 404
        </p>
        <h1 className="font-display mt-3 max-w-[16ch] text-[clamp(34px,6vw,56px)] leading-[0.98] font-extrabold tracking-tighter text-balance">
          This page is playing <span className="serif-accent">hard to get.</span>
        </h1>
        <p className="mt-4 max-w-[44ch] text-[17px] leading-[1.6] text-ink-2">
          We couldn&apos;t find what you were looking for. It may have moved,
          or it may never have existed. Pearmo is still in closed beta, after
          all.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className={button.ink}>
            Back to the homepage
          </Link>
          <BetaLink event="beta_form_404" className={button.paper} />
        </div>
      </div>
    </main>
  );
}
