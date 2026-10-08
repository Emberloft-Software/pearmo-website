import Link from "next/link";

const DESIGNS = [
  { key: "a", label: "A · Same app" },
  { key: "b", label: "B · After Dark" },
  { key: "c", label: "C · Duet (live)" },
] as const;

/**
 * The bar on top of /design/a, /design/b and /design/c for comparing the
 * three directions in the real build. Not shown on the live home page.
 */
export function DesignSwitcher({ current }: { current: "a" | "b" | "c" }) {
  return (
    <div
      role="region"
      aria-label="Design preview"
      className="relative z-60 flex flex-wrap items-center gap-x-3.5 gap-y-2 bg-[#2b2438] px-4 py-2 text-[13px] font-medium text-[#ede9f7]"
      style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}
    >
      <b className="font-bold">Design preview</b>
      <nav aria-label="Designs" className="flex flex-wrap gap-1.5">
        {DESIGNS.map((d) => (
          <Link
            key={d.key}
            href={`/design/${d.key}`}
            aria-current={d.key === current ? "page" : undefined}
            className={`rounded-full border px-2.5 py-1 ${
              d.key === current
                ? "border-[#ede9f7] bg-[#ede9f7] text-[#2b2438]"
                : "border-[#4a4060] text-[#ede9f7]"
            }`}
          >
            {d.label}
          </Link>
        ))}
      </nav>
      <span className="opacity-80">Not indexed. The live home page is design C.</span>
      <Link href="/" className="ml-auto underline underline-offset-2">
        Go to the live page
      </Link>
    </div>
  );
}
