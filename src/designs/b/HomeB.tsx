import Image from "next/image";
import Link from "next/link";

import { LogoMark } from "@/components/Logo";
import { QrCode } from "@/components/QrCode";
import { Icon } from "@/components/ui/Icon";
import { ScenePicture } from "@/components/ui/ScenePicture";
import {
  actions,
  avatars,
  beta,
  faq,
  footer,
  getApp,
  hero,
  how,
  icebreakers,
  nav,
  personality,
  safety,
  strip,
  why,
} from "@/content/site-content";
import { getUrlLabel, site } from "@/lib/site";
import { RADAR, axisLines, labelPositions, ringPolygons, scorePolygon } from "@/lib/radar";
import { PreviewMenu } from "@/designs/PreviewMenu";
import { NavShell } from "@/designs/b/NavShell";
import { Spotlight } from "@/designs/b/Spotlight";

import "./design-b.css";

/*
 * PREVIEW ONLY: direction B, "After Dark", at /design/b.
 * Same content and launch rules as the live page; plain links (no analytics
 * events) so previews don't skew the numbers.
 */

const ICON_FOR = { "eye-off": "eye-off", lock: "lock", shield: "shield", flag: "flag" } as const;

function Radar() {
  const t = personality.traits;
  const { points, dots } = scorePolygon(t.map((x) => x.score), personality.scoreMax);
  const labels = labelPositions(t.length);
  return (
    <svg viewBox={RADAR.viewBox} role="img" aria-label={personality.radarLabel} style={{ width: "100%", height: "auto" }}>
      <desc>{t.map((x) => `${x.name}: ${x.score} out of ${personality.scoreMax}`).join(". ")}</desc>
      <g stroke="rgb(250 248 255 / .14)" fill="none">
        {ringPolygons(t.length).map((r, i) => <polygon key={i} points={r} />)}
        {axisLines(t.length).map((a, i) => <line key={i} x1={RADAR.cx} y1={RADAR.cy} x2={a.x2} y2={a.y2} />)}
      </g>
      <g data-radar={`${RADAR.cx} ${RADAR.cy}`}>
        <polygon points={points} fill="rgb(198 255 61 / .16)" stroke="#C6FF3D" strokeWidth="2.5" strokeLinejoin="round" />
        {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="4.5" fill="#C6FF3D" />)}
      </g>
      {t.map((x, i) => {
        const p = labels[i];
        if (!p) return null;
        return (
          <g key={x.name} textAnchor={p.anchor} fontSize="13">
            <text x={p.x} y={p.y - 6} fill="#FAF8FF" fontWeight="600">{x.short}</text>
            <text x={p.x} y={p.y + 11} fill="#B9B0CC">{x.score.toFixed(1)}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Lights() {
  return (
    <div className="wrap lights" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => <i key={i} />)}
    </div>
  );
}

export function HomeB() {
  const live = site.webAppUrl;
  const who: string[] = [...beta.who];
  who.splice(3, 0, live ? beta.deviceWithWebApp : beta.deviceAndroidOnly);
  const figs = (copy: boolean) =>
    avatars.map((a) => (
      <figure key={a.slug + (copy ? "c" : "")} aria-hidden={copy || undefined}>
        <Image src={`/assets/avatars/${a.slug}.png`} alt="" width={84} height={84} sizes="76px" />
        <figcaption><b>{a.name.replace("The ", "")}</b>{a.trait}</figcaption>
      </figure>
    ));

  return (
    <>
      <NavShell>
        <div className="wrap">
          <a className="brand" href="#top" aria-label={nav.logoLabel}>
            <LogoMark tone="light" className="h-8 w-auto" />
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
          <a className="btn line sm" href={site.betaFormUrl}>{actions.joinBeta}</a>
          <PreviewMenu buttonClass="menu-btn" sheetClass="sheet">
            {nav.links.map((l) => <a key={l.href} className="row" href={l.href}>{l.label}</a>)}
            <a className="btn" href={site.betaFormUrl}>{actions.joinBeta}</a>
            {live && <p className="alt">{actions.invited} <a className="link" href={live}>{actions.openApp}</a></p>}
          </PreviewMenu>
        </div>
      </NavShell>

      <main id="main">
        <section className="hero" id="top">
          <Spotlight className="still" mode="load">
            <ScenePicture scene="cafe" who="avatar" priority sizes="100vw" />
            <ScenePicture scene="cafe" who="person" priority sizes="100vw" className="over" />
          </Spotlight>
          <div className="hero-copy">
            <div className="wrap">
              <div>
                <p className="tag"><i />{hero.badge}</p>
                <h1>{hero.titleLead} <em>{hero.titleEmphasis}</em>,<br />{hero.titleMid} <s>{hero.titleStruck}</s>.</h1>
                <p className="lead">{hero.lead}</p>
                <div className="cta">
                  <a className="btn" href={site.betaFormUrl}>{actions.joinBeta}</a>
                  <span className="note">{actions.joinBetaNote}</span>
                </div>
                {live ? (
                  <p className="invited touch-only">{actions.invited} <a className="link" href={live}>{actions.openApp} →</a><small>{actions.noStore}</small></p>
                ) : (
                  <p className="invited"><a className="link" href="#beta">{actions.howBeta} ↓</a></p>
                )}
              </div>
              {live && (
                <div className="qr-card desk-only">
                  <QrCode px={176} />
                  <b>{actions.invited}<br />{actions.scan}</b>
                  <span className="url">{getUrlLabel}</span>
                  <span className="note">or <a className="link" href={live}>{actions.openHere}</a></span>
                </div>
              )}
            </div>
          </div>
        </section>
        <p className="wrap reveal-cap"><Icon name="lock" className="h-4 w-4" />{hero.revealCaption}</p>

        <div className="strip">
          <div className="wrap"><p className="strip-label">{strip.label}</p></div>
          <div className="marquee"><div className="track">{figs(false)}{figs(true)}</div></div>
        </div>
        <Lights />

        <section className="sec" id="why">
          <div className="wrap">
            <div className="why-grid" data-reveal="">
              <div><p className="tag"><i />{why.kicker}</p><h2>{why.titleLead} <em>{why.titleMark}</em> {why.titleTrail}</h2></div>
              <p className="lead">{why.lead}</p>
            </div>
            <div className="numbers" data-stagger="">
              {why.stats.map((s) => <div key={s.value}><b>{s.value}</b><span>{s.label}</span></div>)}
            </div>
            <blockquote className="pull" data-reveal="">{why.quote}<cite>{why.quoteSource}</cite></blockquote>
          </div>
        </section>
        <Lights />

        <section className="sec" id="how">
          <div className="wrap">
            <p className="tag"><i />{how.kicker}</p>
            <h2>{how.titleLead} <em>{how.titleEmphasis}</em></h2>
            <p className="lead">{how.lead}</p>
            <div className="scenes">
              {how.steps.map((s, i) => (
                <div className="scene-row" key={s.title} data-reveal="">
                  <div className="glow">
                    <div className="phone">
                      <Image src={s.image} alt={s.alt} width={how.shotWidth} height={how.shotHeight} sizes="300px" className="shot-crop" />
                    </div>
                  </div>
                  <div><span className="step-n">{i + 1}</span><h3>{s.title}</h3><p>{s.body}</p></div>
                </div>
              ))}
            </div>
            <div className="show" data-reveal="">
              <Image src={how.showcase.image} alt={how.showcase.alt} width={how.showcase.width} height={how.showcase.height} sizes="(min-width: 1024px) 700px, 92vw" />
              <div><p className="tag"><i />{how.showcase.kicker}</p><h3>{how.showcase.title}</h3><p className="lead">{how.showcase.body}</p></div>
            </div>
          </div>
        </section>

        <section className="ice" id="icebreakers">
          <Spotlight className="ice-still" mode="scroll">
            <ScenePicture scene="sofa" who="avatar" sizes="100vw" />
            <ScenePicture scene="sofa" who="person" sizes="100vw" className="over" />
          </Spotlight>
          <div className="ice-copy">
            <div className="wrap">
              <div>
                <p className="tag"><i />{icebreakers.kicker}</p>
                <h2>{icebreakers.titleLead} {icebreakers.titleMark}{icebreakers.titleTrail}</h2>
                <p className="lead">{icebreakers.body}</p>
                <p className="games">{icebreakers.games.map((g) => <span key={g}>{g}</span>)}</p>
                <p className="note" style={{ fontSize: 15 }}>{icebreakers.note}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="personality">
          <div className="wrap pers-grid">
            <div className="pers-copy">
              <p className="tag"><i />{personality.kicker}</p>
              <h2>{personality.titleLead} <em>{personality.titleEmphasis}</em></h2>
              <p className="lead">{personality.lead}</p>
              <p className="private"><Icon name="lock" />{personality.privacyNote}</p>
            </div>
            <div className="pcard" data-reveal="">
              <span className="lab">{personality.exampleLabel}</span>
              <div className="radar"><Radar /></div>
              <div className="bars">
                {personality.traits.map((t) => (
                  <div key={t.name} style={{ ["--w" as string]: `${(t.score / 5) * 100}%` }}>
                    {t.name}<output>{t.score.toFixed(1)}</output><i /><span>{t.blurb}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Lights />

        <section className="sec" id="safety">
          <div className="wrap">
            <p className="tag"><i />{safety.kicker}</p>
            <h2>{safety.titleLead} {safety.titleMark}</h2>
            <p className="lead">{safety.lead}</p>
            <div className="safe-grid" data-stagger="">
              {safety.cards.map((c) => (
                <div className="safe" key={c.title}>
                  <span className="ic"><Icon name={ICON_FOR[c.icon]} /></span>
                  <small>{c.chip}</small>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec faq" id="faq" style={{ paddingTop: 0 }}>
          <div className="wrap faq-grid">
            <div className="faq-side">
              <p className="tag"><i />{faq.kicker}</p>
              <h2>{faq.titleLead} <em>{faq.titleEmphasis}</em></h2>
              <p className="lead">Still curious? Email <a className="link" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. It reaches the team directly.</p>
            </div>
            <div>
              {faq.items.map((f) => <details key={f.q}><summary>{f.q}<Icon name="plus" className="h-5.5 w-5.5" /></summary><p>{f.a}</p></details>)}
            </div>
          </div>
        </section>

        <section className="sec beta" id="beta">
          <div className="wrap">
            <div className="beta-head">
              <div><p className="tag"><i />{beta.kicker}</p><h2>{beta.titleLead} <em>{beta.titleEmphasis}</em></h2><p className="lead">{beta.lead}</p></div>
              <div className="cta"><a className="btn" href={site.betaFormUrl}>{actions.joinBeta}</a><span className="note">{actions.joinBetaNote}</span></div>
            </div>
            <ol className="steps" data-stagger="0.15">
              {beta.steps.map((s, i) => <li key={s.title}><span className="n">{i + 1}</span><b>{s.title}</b><span>{s.body}</span></li>)}
            </ol>
            <div className="lists">
              <div className="box"><h3>{beta.whoTitle}</h3><ul className="ticks">{who.map((w) => <li key={w}><Icon name="check" className="h-4.5 w-4.5" strokeWidth={2.6} /><span>{w}</span></li>)}</ul></div>
              <div className="box"><h3>{beta.expectTitle}</h3><div className="expect">{beta.expect.map((e) => <div key={e.title}><b>{e.title}</b><span>{e.body}</span></div>)}</div></div>
            </div>
            <p className="dataline"><Icon name="lock" /><span>{beta.data} <Link className="link" href="/beta-terms">{beta.termsLink}</Link></span></p>
            <p className="team">{beta.team}</p>
          </div>
        </section>

        {live && (
          <section className="sec" id="get">
            <div className="wrap get-grid">
              <div className="get-qr">
                <div className="desk-only" style={{ display: "grid", gap: 12, justifyItems: "center" }}>
                  <div className="tile"><QrCode px={232} /></div>
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
                <p className="tag"><i />{getApp.kicker}</p>
                <h2>{getApp.title}</h2>
                <p className="lead">{getApp.lead}</p>
                <ol className="gsteps">{getApp.steps.map((s, i) => <li key={s.title}><span className="n">{i + 1}</span><b>{s.title}</b><span>{s.body}</span></li>)}</ol>
                <div className="fine"><span>{getApp.noStores}</span><span>{getApp.signIn}</span><span>{getApp.notInvited} <a className="link" href="#beta">{actions.joinBeta}</a>.</span></div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer>
        <div className="wrap">
          <div className="foot">
            <div>
              <Link className="brand" href="/" aria-label="Pearmo home"><LogoMark tone="light" className="h-8 w-auto" />pearmo</Link>
              <p>{footer.tagline}</p>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              <nav aria-label="Footer">{footer.links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}</nav>
              <span>{footer.contactLabel}: <a className="link" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></span>
            </div>
            {live && <div className="fqr desk-only"><QrCode px={112} /><span><b>{footer.qrLabel}</b>{getUrlLabel}</span></div>}
          </div>
          <p className="copy">{footer.copyright}</p>
        </div>
      </footer>
    </>
  );
}
