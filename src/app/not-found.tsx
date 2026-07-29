import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 must never be indexed, even though Next already returns a 404 status.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-clip px-6 text-center"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1">
        <div className="absolute -top-[120px] -left-[120px] h-[420px] w-[420px] animate-drift rounded-full bg-[#b9aef7] opacity-40 blur-[90px]" />
        <div className="absolute -right-[140px] bottom-[10%] h-[380px] w-[380px] animate-drift-slow rounded-full bg-[#f2b2dd] opacity-40 blur-[90px]" />
      </div>

      <Link
        href="/"
        className="mb-10 flex items-center gap-2.5 text-[19px] font-extrabold tracking-[-0.02em]"
      >
        <LogoMark gradientId="logo-404" className="h-6 w-6" />
        pearmo
      </Link>

      <Image
        src="/assets/avatars/hedgehog-m.png"
        alt=""
        width={140}
        height={186}
        priority
        sizes="140px"
        className="mb-6 h-auto w-[110px] object-contain drop-shadow-[0_14px_24px_rgb(23_19_31/0.18)]"
      />

      <p className="text-gradient font-mono text-sm tracking-[0.2em] uppercase">
        Error 404
      </p>
      <h1 className="mt-4 max-w-[18ch] text-[clamp(34px,6vw,60px)] leading-[1.02] font-extrabold tracking-[-0.03em]">
        This page is playing{" "}
        <span className="serif-accent">hard to get.</span>
      </h1>
      <p className="text-mute mt-4 max-w-[46ch] text-[17px] leading-[1.6]">
        We couldn&apos;t find what you were looking for. It may have moved, or it
        may never have existed — Pearmo is still pre-launch, after all.
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="brand-gradient inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
        >
          Back to the homepage
        </Link>
        <Link
          href="/#waitlist"
          className="bg-lime text-lime-ink inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
        >
          Join the waitlist
        </Link>
      </div>
    </main>
  );
}
