/**
 * The Pearmo pear mark. `gradientId` must be unique per instance — duplicate
 * SVG gradient ids on one page make the second mark render unfilled.
 */
export function LogoMark({
  gradientId,
  className = "",
}: {
  gradientId: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 4c.3-1.4 1.3-2.3 2.8-2.5"
        stroke="#6a8a00"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 4.5c-1.6-1-3.4-.8-4.6.4C6.2 6.1 6 7.9 7 9.4 4.6 10.8 3.4 13.4 4 16c.7 3.2 3.7 5.6 8 5.6s7.3-2.4 8-5.6c.6-2.6-.6-5.2-3-6.6 1-1.5.8-3.3-.4-4.5-1.2-1.2-3-1.4-4.6-.4Z"
        fill={`url(#${gradientId})`}
      />
      <defs>
        <linearGradient id={gradientId} x1="4" y1="4" x2="20" y2="22">
          <stop stopColor="#6c5ce7" />
          <stop offset="1" stopColor="#c2258f" />
        </linearGradient>
      </defs>
    </svg>
  );
}
