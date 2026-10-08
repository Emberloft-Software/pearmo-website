import { QrCode } from "@/components/QrCode";
import { TrackedLink } from "@/components/TrackedLink";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { block, button, h2, lead, wrap } from "@/components/ui/styles";
import { actions, getApp } from "@/content/site-content";
import { getUrlLabel, site } from "@/lib/site";

/**
 * "Get Pearmo on your phone", for people who already have an invite. Renders
 * nothing until `site.webAppUrl` is set.
 *
 * A desktop with a mouse gets the big QR (the phone's camera is the fastest
 * way across); phones and tablets get a button, because you can't scan your
 * own screen. The QR encodes www.pearmo.com/get, never app.pearmo.com, so
 * a printed copy keeps working if the destination ever moves.
 */
export function GetPearmo() {
  if (!site.webAppUrl) return null;

  return (
    <section id="get" className={`${wrap} pt-16 lg:pt-24`}>
      <div className={`${block} grid items-center gap-7 bg-violet text-white lg:grid-cols-[340px_1fr] lg:gap-16`}>
        <div className="rounded-panel bg-paper p-6 text-center text-ink" data-reveal="">
          <div className="desk:grid hidden justify-items-center gap-2.5">
            <QrCode px={228} />
            <b className="font-display text-[20px] leading-[1.2] font-extrabold">{getApp.scanTitle}</b>
            <span className="font-display text-[24px] leading-none font-extrabold tracking-[-0.03em] text-violet-deep">
              {getUrlLabel}
            </span>
            <span className="text-[14px] text-ink-2">
              or{" "}
              <TrackedLink
                href={site.webAppUrl}
                event="open_app_desktop_link"
                className="font-semibold text-violet-deep underline underline-offset-3"
              >
                {actions.openHere}
              </TrackedLink>
            </span>
          </div>
          <div className="touch:grid hidden gap-2.5">
            <TrackedLink href={site.webAppUrl} event="open_app_final" className={`${button.ink} w-full`}>
              {actions.openApp}
              <Icon name="arrow" className="h-4.5 w-4.5" />
            </TrackedLink>
            <span className="text-[13.5px] text-ink-2">{actions.noStore}</span>
          </div>
        </div>

        <div>
          <Tag className="text-on-violet" dot="bg-lime">
            {getApp.kicker}
          </Tag>
          <h2 className={h2}>{getApp.title}</h2>
          <p className={`${lead} mt-4.5 text-on-violet`}>{getApp.lead}</p>
          <ol className="my-6 grid gap-3.5">
            {getApp.steps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[40px_1fr] gap-x-3.5 gap-y-0.5">
                <span className="font-display row-span-2 grid h-9 w-9 place-items-center rounded-full bg-lime text-[16px] font-extrabold text-ink">
                  {i + 1}
                </span>
                <b>{step.title}</b>
                <span className="text-[15.5px] text-on-violet">{step.body}</span>
              </li>
            ))}
          </ol>
          <div className="grid gap-2 border-t border-white/25 pt-4 text-[14.5px] text-on-violet">
            <p>{getApp.noStores}</p>
            <p>{getApp.signIn}</p>
            <p>
              {getApp.notInvited}{" "}
              <a href="#beta" className="font-semibold text-lime underline underline-offset-3">
                {actions.joinBeta}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
