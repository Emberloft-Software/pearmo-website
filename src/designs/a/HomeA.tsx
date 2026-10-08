import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { LogoMark } from "@/components/Logo";
import { QrCode } from "@/components/QrCode";
import { Icon } from "@/components/ui/Icon";
import { ScenePicture } from "@/components/ui/ScenePicture";
import {
  actions,
  avatars,
  beta,
  faq,
  getApp,
  hero,
  how,
  icebreakers,
  nav,
  personality,
  safety,
  strip,
  why,
  footer,
} from "@/content/site-content";
import { getUrlLabel, site } from "@/lib/site";
import { RADAR, axisLines, labelPositions, ringPolygons, scorePolygon } from "@/lib/radar";
import { PreviewMenu } from "@/designs/PreviewMenu";
import { RevealToggle } from "@/designs/a/RevealToggle";
import { StickySteps } from "@/designs/a/StickySteps";

import "./design-a.css";

/*
 * PREVIEW ONLY: direction A, "Same app, bigger screen", at /design/a.
 * Same content and launch rules as the live page; plain links (no analytics
 * events) so previews don't skew the numbers.
 */

const ICON_FOR = { "eye-off": "eye-off", lock: "lock", shield: "shield", flag: "flag" } as const;

function Shot({ src, alt }: { src: string; alt: string }) {
  return (
    <Image src={src} alt={alt} width={how.shotWidth} height={how.shotHeight} sizes="340px" className="shot-crop" />
  );
}

function Radar() {
  const t = personality.traits;
  const { points, dots } = scorePolygon(t.map((x) => x.score), personality.scoreMax);
  const labels = labelPositions(t.length);
  return (
    <svg viewBox={RADAR.viewBox} role="img" aria-label={personality.radarLabel} style={{ width: "100%", height: "auto" }}>
      <desc>{t.map((x) => `${x.name}: ${x.score} out of ${personality.scoreMax}`).join(". ")}</desc>
      <g stroke="#E7E1F5" fill="none">
        {ringPolygons(t.length).map((r, i) => <polygon key={i} points={r} />)}
        {axisLines(t.length).map((a, i) => <line key={i} x1={RADAR.cx} y1={RADAR.cy} x2={a.x2} y2={a.y2} />)}
      </g>
      <g data-radar={`${RADAR.cx} ${RADAR.cy}`}>
        <polygon points={points} fill="rgb(108 76 241 / .18)" stroke="#6C4CF1" strokeWidth="2.5" strokeLinejoin="round" />
        {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="4.5" fill="#6C4CF1" />)}
      </g>
      {t.map((x, i) => {
        const p = labels[i];
        if (!p) return null;
        return (
          <g key={x.name} textAnchor={p.anchor} fontSize="13">
            <text x={p.x} y={p.y - 6} fill="#3B3350" fontWeight="600">{x.short}</text>
            <text x={p.x} y={p.y + 11} fill="#5E5670">{x.score.toFixed(1)}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function HomeA() {
  const live = site.webAppUrl;
  const who: string[] = [...beta.who];
  who.splice(3, 0, live ? beta.deviceWithWebApp : beta.deviceAndroidOnly);
  const chips = (copy: boolean) =>
    avatars.map((a) => (
      <span key={a.slug + (copy ? "c" : "")} aria-hidden={copy || undefined}>
        <Image src={`/assets/avatars/${a.slug}.png`} alt="" width={40} height={40} sizes="40px" />
        {a.name} <em>{a.trait}</em>
      </span>
    ));

  return (
    <>
      <header className="nav">
        <div className="wrap">
          <a className="brand" href="#top" aria-label={nav.logoLabel}>
            <LogoMark className="h-8 w-auto" />
            pearmo
          </a>
          <nav className="links" aria-label="Main">
            {nav.links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          {live && (
            <details className="navqr desk-only">
              <summary><Icon name="qr" className="h-4.5 w-4.5" /> {actions.getApp}</summary>
              <div className="navqr-panel">
                <QrCode px={180} />
                <b>{actions.invited}</b>
                <span>{actions.scan}</span>
                <span className="navqr-url">{getUrlLabel}</span>
                <a href={live}>or {actions.openHere}</a>
              </div>
            </details>
          )}
          <a className="btn sm" href={site.betaFormUrl}>{actions.joinBeta}</a>
          <PreviewMenu buttonClass="menu-btn" sheetClass="sheet">
            {nav.links.map((l) => <a key={l.href} className="row" href={l.href}>{l.label}</a>)}
            <a className="btn" href={site.betaFormUrl}>{actions.joinBeta}</a>
            {live && <p className="alt">{actions.invited} <a className="link" href={live}>{actions.openApp}</a></p>}
          </PreviewMenu>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="wrap">
            <div>
              <span className="chip lime"><i style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ink)" }} />{hero.badge}</span>
              <h1>
                {hero.titleLead} <em>{hero.titleEmphasis}</em>,<br /> {hero.titleMid} <s>{hero.titleStruck}</s>.
              </h1>
              <p className="lead">{hero.lead}</p>
              <div className="cta-col">
                <a className="btn" href={site.betaFormUrl}>{actions.joinBeta}</a>
                <span className="note">{actions.joinBetaNote}</span>
              </div>
              {live ? (
                <>
                  <p className="invited touch-only">
                    {actions.invited} <a className="link" href={live}>{actions.openApp} →</a>
                    <small>{actions.noStore}</small>
                  </p>
                  <div className="qr-card desk-only">
                    <div className="tile"><QrCode px={164} /></div>
                    <div>
                      <b>{actions.invited} {actions.scan}</b>
                      <div className="url">{getUrlLabel}</div>
                      <span className="note">or <a className="link" href={live}>{actions.openHere}</a></span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="invited"><a className="link" href="#beta">{actions.howBeta} ↓</a></p>
              )}
            </div>
            <figure className="card" style={{ margin: 0 }}>
              <div className="card-head">
                <Image src="/assets/avatars/fox-f.png" alt="" width={88} height={88} sizes="44px" priority />
                <div><b>The Fox, 26</b><small>{personality.exampleLabel}</small></div>
                <span className="chip wash"><Icon name="lock" className="h-3.25 w-3.25" strokeWidth={2.4} />Photo hidden</span>
              </div>
              <RevealToggle sceneClass="scene" auto="load" photoLocked>
                <ScenePicture scene="cafe" who="avatar" priority sizes="(min-width: 1024px) 520px, 100vw" />
                <ScenePicture scene="cafe" who="person" priority sizes="(min-width: 1024px) 520px, 100vw" className="over" />
              </RevealToggle>
              <figcaption className="cap">{hero.revealCaption}</figcaption>
              <div className="facts"><span>Looking for something serious</span><span>Ages 24–30</span><span>Values: emotional depth</span></div>
            </figure>
          </div>
        </section>

        <div className="strip">
          <div className="strip-in">
            <p className="strip-label">{strip.label}</p>
            <div className="marquee" tabIndex={0} role="region" aria-label={strip.label}><div className="track">{chips(false)}{chips(true)}</div></div>
          </div>
        </div>

        <section className="sec why" id="why">
          <div className="wrap">
            <div data-reveal="">
              <p className="kicker">{why.kicker}</p>
              <h2>{why.titleLead} <em>{why.titleMark}</em> {why.titleTrail}</h2>
              <p className="lead">{why.lead}</p>
            </div>
            <div>
              <div className="stats" data-stagger="">
                {why.stats.map((s) => <div className="stat" key={s.value}><b>{s.value}</b><span>{s.label}</span></div>)}
              </div>
              <blockquote className="quote" data-reveal="">
                <small>{why.heardLabel}</small>
                <p>“{why.quote}”</p>
                <cite>{why.quoteSource}</cite>
              </blockquote>
            </div>
          </div>
        </section>

        <section className="sec" id="how" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <p className="kicker">{how.kicker}</p>
            <h2>{how.titleLead} <em>{how.titleEmphasis}</em></h2>
            <p className="lead">{how.lead}</p>
            <div className="rail" tabIndex={0} role="region" aria-label={`${how.kicker}, step by step`}>
              {how.steps.map((s, i) => (
                <article key={s.title}>
                  <div className="phone"><Shot src={s.image} alt={s.alt} /></div>
                  <span className="num">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p className="note" style={{ fontSize: 15.5, margin: 0 }}>{s.body}</p>
                </article>
              ))}
            </div>
            <StickySteps
              steps={how.steps.map((s, i) => (
                <Fragment key={s.title}>
                  <span className="num">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </Fragment>
              ))}
              shots={how.steps.map((s) => <Shot key={s.image} src={s.image} alt={s.alt} />)}
            />
            <div className="showcase" data-reveal="">
              <Image src={how.showcase.image} alt={how.showcase.alt} width={how.showcase.width} height={how.showcase.height} sizes="(min-width: 1024px) 700px, 92vw" />
              <div>
                <p className="kicker">{how.showcase.kicker}</p>
                <h3 style={{ fontSize: 28, letterSpacing: "-.03em" }}>{how.showcase.title}</h3>
                <p className="lead">{how.showcase.body}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sec ice" id="icebreakers">
          <div className="wrap">
            <div data-reveal="">
              <p className="kicker">{icebreakers.kicker}</p>
              <h2>{icebreakers.titleLead} {icebreakers.titleMark}{icebreakers.titleTrail}</h2>
              <p className="lead">{icebreakers.body}</p>
              <div className="games">
                {icebreakers.games.map((g, i) => (
                  <span key={g}><i style={{ background: ["var(--violet)", "var(--pink)", "var(--magenta)", "#7BB300"][i] }} />{g}</span>
                ))}
              </div>
              <p className="note" style={{ fontSize: 15 }}>{icebreakers.note}</p>
            </div>
            <figure className="card" style={{ margin: 0 }}>
              <RevealToggle sceneClass="scene scene-wide" auto="view">
                <ScenePicture scene="sofa" who="avatar" sizes="(min-width: 1024px) 640px, 100vw" />
                <ScenePicture scene="sofa" who="person" sizes="(min-width: 1024px) 640px, 100vw" className="over" />
              </RevealToggle>
            </figure>
          </div>
        </section>

        <section className="sec pers" id="personality">
          <div className="wrap">
            <div className="sticky-copy">
              <p className="kicker">{personality.kicker}</p>
              <h2>{personality.titleLead} <em>{personality.titleEmphasis}</em></h2>
              <p className="lead">{personality.lead}</p>
              <p className="private"><Icon name="lock" />{personality.privacyNote}</p>
            </div>
            <div className="pcard" data-reveal="">
              <span className="lab">Personality · {personality.exampleLabel}</span>
              <div className="radar"><Radar /></div>
              <div className="traits">
                {personality.traits.map((t) => (
                  <div className="trait" key={t.name}>
                    <b>{t.name}</b><span>{t.blurb}</span>
                    <output style={{ ["--w" as string]: `${(t.score / 5) * 100}%` }}>{t.score.toFixed(1)}<i /></output>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="safety" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <p className="kicker">{safety.kicker}</p>
            <h2>{safety.titleLead} {safety.titleMark}</h2>
            <p className="lead">{safety.lead}</p>
            <div className="safety-grid" data-stagger="">
              {safety.cards.map((c) => (
                <div className="safe" key={c.title}>
                  <span className="chip wash"><Icon name={ICON_FOR[c.icon]} className="h-3.75 w-3.75" strokeWidth={2.2} />{c.chip}</span>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec faq" id="faq" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="side">
              <p className="kicker">{faq.kicker}</p>
              <h2>{faq.titleLead} <em>{faq.titleEmphasis}</em></h2>
              <p className="lead">Still curious? Email <a className="link" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. It reaches the team directly.</p>
            </div>
            <div className="faq-list">
              {faq.items.map((f) => (
                <details key={f.q}><summary>{f.q}<Icon name="plus" className="h-5.5 w-5.5" /></summary><p>{f.a}</p></details>
              ))}
            </div>
          </div>
        </section>

        <section className="sec beta" id="beta">
          <div className="wrap">
            <div className="beta-top">
              <div>
                <p className="kicker">{beta.kicker}</p>
                <h2>{beta.titleLead} <em>{beta.titleEmphasis}</em></h2>
                <p className="lead">{beta.lead}</p>
                <div className="beta-cta">
                  <a className="btn lime" href={site.betaFormUrl}>{actions.joinBeta}</a>
                  <span className="note">{actions.joinBetaNote}</span>
                </div>
                <p className="team">{beta.team}</p>
              </div>
              <div className="steps3">
                <ol>
                  {beta.steps.map((s, i) => <li key={s.title}><span className="n">{i + 1}</span><b>{s.title}</b><span>{s.body}</span></li>)}
                </ol>
              </div>
            </div>
            <div className="beta-grid">
              <div className="panel">
                <h3>{beta.whoTitle}</h3>
                <ul className="ticks">{who.map((w) => <li key={w}><Icon name="check" strokeWidth={3} />{w}</li>)}</ul>
              </div>
              <div className="panel">
                <h3>{beta.expectTitle}</h3>
                <div className="expect">{beta.expect.map((e) => <div key={e.title}><b>{e.title}</b><span>{e.body}</span></div>)}</div>
              </div>
            </div>
            <p className="dataline"><Icon name="lock" />{beta.data} <Link href="/beta-terms">{beta.termsLink}</Link></p>
          </div>
        </section>

        {live && (
          <section className="sec" id="get">
            <div className="wrap">
              <div className="get-card">
                <div className="get-side">
                  <div className="desk-only" style={{ display: "grid", gap: 10, justifyItems: "center" }}>
                    <div className="big"><QrCode px={220} /></div>
                    <b>{getApp.scanTitle}</b>
                    <span className="url">{getUrlLabel}</span>
                    <span className="note">or <a className="link" href={live}>{actions.openHere}</a></span>
                  </div>
                  <div className="touch-only" style={{ display: "grid", gap: 10, width: "100%" }}>
                    <a className="btn" href={live}>{actions.openApp} <Icon name="arrow" className="h-4.5 w-4.5" /></a>
                    <span className="note">{actions.noStore}</span>
                  </div>
                </div>
                <div>
                  <p className="kicker">{getApp.kicker}</p>
                  <h2>{getApp.title}</h2>
                  <p className="lead">{getApp.lead}</p>
                  <ol className="get-steps">{getApp.steps.map((s, i) => <li key={s.title}><span className="n">{i + 1}</span><b>{s.title}</b><span>{s.body}</span></li>)}</ol>
                  <div className="fine"><span>{getApp.noStores}</span><span>{getApp.signIn}</span><span>{getApp.notInvited} <a className="link" href="#beta">{actions.joinBeta}</a>.</span></div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer>
        <div className="wrap">
          <div className="foot">
            <div>
              <Link className="brand" href="/" aria-label="Pearmo home"><LogoMark className="h-8 w-auto" />pearmo</Link>
              <p>{footer.tagline}</p>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              <nav aria-label="Footer">{footer.links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}</nav>
              <span className="mail">{footer.contactLabel}: <a className="link" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></span>
            </div>
            {live && <div className="fqr desk-only"><QrCode px={112} /><span><b>{footer.qrLabel}</b>{getUrlLabel}</span></div>}
          </div>
          <p className="copy">{footer.copyright}</p>
        </div>
      </footer>
    </>
  );
}
