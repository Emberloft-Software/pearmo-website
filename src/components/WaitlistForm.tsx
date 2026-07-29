"use client";

import { track } from "@vercel/analytics";
import { useState } from "react";

import { cta } from "@/content/site-content";

/**
 * ⚠️  NOT YET PERSISTED — the submitted address goes nowhere.
 *
 * This mirrors the current production behaviour (the original page did the
 * same) and is a deliberate, temporary state: the plan is to wire a backend
 * next. Until then the success message shown to the user is not truthful, so
 * this should not stay in production long.
 *
 * To make it real, replace the body of `submitEmail` with a POST to a route
 * handler and surface a genuine failure state. Everything else here —
 * validation, the honeypot, the pending/success/error states, the analytics
 * event — is already backend-ready.
 */
async function submitEmail(email: string): Promise<void> {
  // TODO(waitlist): POST to /api/waitlist and persist. See README.
  void email;
  await new Promise((resolve) => setTimeout(resolve, 450));
}

type Status = "idle" | "pending" | "success" | "error";

/** Deliberately permissive — real validation belongs on the server. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields, humans can't see them.
    if (data.get("company")) {
      setStatus("success");
      setMessage(cta.successMessage);
      return;
    }

    const email = String(data.get("email") ?? "").trim();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setMessage(cta.errorMessage);
      return;
    }

    setStatus("pending");
    try {
      await submitEmail(email);
      setStatus("success");
      setMessage(cta.successMessage);
      // The only metric a pre-launch page has: signups per visitor.
      track("waitlist_submit");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <p
        role="status"
        className="text-lime font-mono text-sm tracking-[0.06em]"
      >
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-2.5">
        <label htmlFor="waitlist-email" className="sr-only">
          {cta.emailLabel}
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={cta.emailPlaceholder}
          aria-invalid={status === "error"}
          aria-describedby="waitlist-status"
          className="focus:border-lime w-[min(340px,80vw)] rounded-full border border-white/[0.18] bg-white/[0.08] px-[22px] py-3.5 text-[15px] text-white transition-colors outline-none placeholder:text-[#8d85a8] focus:bg-white/[0.12]"
        />

        {/* Honeypot — hidden from users and assistive tech, visible to bots. */}
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor="waitlist-company">Company</label>
          <input id="waitlist-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button
          type="submit"
          disabled={status === "pending"}
          className="bg-lime text-lime-ink inline-flex items-center rounded-full px-[26px] py-3.5 text-[15px] font-semibold transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "pending" ? "Adding you…" : cta.submitLabel}
        </button>
      </div>

      {/* aria-live so errors are announced, not just shown. */}
      <p
        id="waitlist-status"
        role={status === "error" ? "alert" : undefined}
        aria-live="polite"
        className={`mt-3.5 text-[13px] ${
          status === "error" ? "text-pink" : "text-[#9d95b8]"
        }`}
      >
        {status === "error" ? message : cta.privacyNote}
      </p>
    </form>
  );
}
