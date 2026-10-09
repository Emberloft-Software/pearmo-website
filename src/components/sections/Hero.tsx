import Image from "next/image";

import { OpenAppLine, QrCard } from "@/components/AppLinks";
import { BetaLink } from "@/components/BetaLink";
import { Compare } from "@/components/ui/Compare";
import { Icon } from "@/components/ui/Icon";
import { ScenePicture } from "@/components/ui/ScenePicture";
import { Tag } from "@/components/ui/Tag";
import { block, button, lead, wrap } from "@/components/ui/styles";
import { actions, hero } from "@/content/site-content";
import { site } from "@/lib/site";

/** A small avatar set into the headline, like the sender of a message. */
function HeadlineAvatar({ slug, className }: { slug: string; className: string }) {
  return (
    <Image
      src={`/assets/avatars/${slug}.png`}
      alt=""
      width={128}
      height={128}
      sizes="(min-width: 1024px) 96px, 48px"
      loading="eager"
      data-parallax="-0.35"
      data-parallax-scope=""
      className={`inline-block h-[0.62em] w-[0.62em] rounded-full object-cover object-top border-[0.04em] border-paper bg-violet-soft align-[0.04em] shadow-[0_0_0_0.03em_var(--color-line)] ${className}`}
    />
  );
}

/**
 * The headline is a two-line exchange, the fox's line on the left and the
 * wolf's on the right. Above the fold, so nothing here starts hidden: the
 * entrance is a transform-only CSS rise that paints on the first frame.
 */
export function Hero() {
  return (
    <>
      <section id="top" className={`${wrap} pt-4 pb-5.5`}>
        <Tag>{hero.badge}</Tag>
        <h1 className="font-display animate-rise text-[clamp(40px,9vw,142px)] leading-[0.94] font-extrabold tracking-tighter">
          <span className="block">
            <HeadlineAvatar slug="fox-f" className="mr-[0.14em]" />
            {hero.titleLead}{" "}
            <span className="mark-lime">
              <span className="serif-accent">{hero.titleEmphasis}</span>
            </span>
            ,
          </span>
          <span className="block text-right">
            {hero.titleMid} <span className="strike">{hero.titleStruck}</span>.
            <HeadlineAvatar slug="wolf-m" className="ml-[0.14em]" />
          </span>
        </h1>
      </section>

      <section
        aria-label="Get started"
        className={`${wrap} grid gap-3.5 pb-5 lg:grid-cols-2 lg:gap-4.5 xl:grid-cols-[5fr_7fr]`}
      >
        <div className={`${block} flex flex-col gap-4 bg-lime text-ink`}>
          <p className={lead}>{hero.lead}</p>
          <BetaLink event="beta_form_hero" className={`${button.ink} desk:self-start`} />
          <p className="desk:text-left text-center text-[13.5px] text-ink-2">
            {actions.joinBetaNote}
          </p>

          <OpenAppLine event="open_app_hero" />
          <QrCard className="mt-auto" />
          {!site.webAppUrl && (
            <a
              href="#beta"
              className="inline-flex items-center gap-1.5 self-start font-semibold underline underline-offset-3"
            >
              {actions.howBeta}
              <Icon name="arrow-down" className="h-4 w-4" />
            </a>
          )}
        </div>

        <Compare
          nudge
          label={hero.compareLabel}
          beforeLabel={hero.compareAvatar}
          afterLabel={hero.comparePerson}
          caption={hero.revealCaption}
          className="aspect-4/5 rounded-block bg-[#2a1a4d] sm:aspect-1509/937"
          before={
            <ScenePicture
              scene="cafe"
              who="avatar"
              priority
              sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 50vw, 100vw"
            />
          }
          after={
            // Eager but not high priority: the avatar layer underneath is the
            // LCP element, so it gets the bandwidth first.
            <ScenePicture
              scene="cafe"
              who="person"
              eager
              sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 50vw, 100vw"
            />
          }
        />
      </section>
    </>
  );
}
