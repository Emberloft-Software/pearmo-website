/** The small label above each section heading, with a coloured dot. */
export function Tag({
  children,
  dot = "bg-pink",
  className = "text-ink-2",
}: {
  children: React.ReactNode;
  dot?: string;
  className?: string;
}) {
  return (
    <p
      className={`mb-4 inline-flex items-center gap-2 text-[13.5px] leading-none font-semibold ${className}`}
    >
      <i aria-hidden="true" className={`h-2.25 w-2.25 rounded-full ${dot}`} />
      {children}
    </p>
  );
}
