import { TrackedLink } from "@/components/TrackedLink";
import { actions } from "@/content/site-content";
import { site } from "@/lib/site";

/**
 * "Join the beta": always the Google Form, in the same tab. Safe to import
 * from client components (no server-only dependencies).
 */
export function BetaLink({
  event,
  className,
  children = actions.joinBeta,
}: {
  /** Analytics event, one per placement: beta_form_hero, beta_form_nav, … */
  event: string;
  className: string;
  children?: React.ReactNode;
}) {
  return (
    <TrackedLink href={site.betaFormUrl} event={event} className={className}>
      {children}
    </TrackedLink>
  );
}
