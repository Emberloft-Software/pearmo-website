import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { hero } from "@/content/site-content";
import { LOGO_P_PATH, LOGO_PEAR_PATH, LOGO_VIEWBOX } from "@/lib/logo-paths";
import { site } from "@/lib/site";

/**
 * The og:image every WhatsApp, Instagram, Facebook and X share of pearmo.com
 * renders. Generated at build time (`force-static`), so it costs nothing to
 * serve.
 *
 * 1200×630 is the size all four platforms crop from. Text and two small
 * avatars only, never a photo: ImageResponse writes PNG, and a photographic
 * PNG at this size would blow past WhatsApp's ~300 KB preview limit.
 *
 * Satori (the renderer behind next/og) supports a subset of CSS, no Tailwind,
 * and only TTF/OTF/WOFF fonts, so the three faces are vendored as TTF in
 * ./_og (SIL Open Font License) and read from disk here: no network at build.
 */
export const alt = `${site.name} · ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const PAPER = "#faf8ff";
const INK = "#17101f";
const LIME = "#c6ff3d";

async function asset(...parts: string[]) {
  return readFile(join(process.cwd(), ...parts));
}

async function avatarDataUri(slug: string) {
  const png = await asset("public", "assets", "avatars", `${slug}.png`);
  return `data:image/png;base64,${png.toString("base64")}`;
}

export default async function OpengraphImage() {
  const [display, sans, serif, fox, wolf] = await Promise.all([
    asset("src", "app", "_og", "FunnelDisplay-ExtraBold.ttf"),
    asset("src", "app", "_og", "FunnelSans-Medium.ttf"),
    asset("src", "app", "_og", "InstrumentSerif-Italic.ttf"),
    avatarDataUri("fox-f"),
    avatarDataUri("wolf-m"),
  ]);

  const avatarStyle = {
    width: 96,
    height: 96,
    borderRadius: 9999,
    border: `5px solid ${PAPER}`,
    background: "#efeafe",
    boxShadow: "0 0 0 2px #e3dcf3",
  } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "56px 72px",
          fontFamily: "Funnel Sans",
          color: INK,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="38" height="50" viewBox={LOGO_VIEWBOX}>
            <path fill="#ef4c56" fillRule="evenodd" d={LOGO_PEAR_PATH} />
            <path fill="#291450" fillRule="evenodd" d={LOGO_P_PATH} />
          </svg>
          <div style={{ fontFamily: "Funnel Display", fontSize: 40, letterSpacing: "-0.04em" }}>
            pearmo
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Funnel Display",
            fontSize: 112,
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori needs a plain img */}
            <img src={fox} alt="" style={avatarStyle} />
            <span>{hero.titleLead}</span>
            <span
              style={{
                fontFamily: "Instrument Serif",
                fontSize: 122,
                letterSpacing: "-0.01em",
                background: LIME,
                borderRadius: 18,
                padding: "0 14px 6px",
              }}
            >
              {hero.titleEmphasis}
            </span>
            <span style={{ marginLeft: -26 }}>,</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 22, alignSelf: "flex-end", marginTop: 10 }}>
            <span>{hero.titleMid}</span>
            <span style={{ display: "flex", position: "relative", color: "#5e5670" }}>
              {hero.titleStruck}
              <span
                style={{
                  position: "absolute",
                  left: -6,
                  right: -6,
                  top: 58,
                  height: 10,
                  borderRadius: 99,
                  background: "#6c4cf1",
                  transform: "rotate(-3deg)",
                }}
              />
            </span>
            <span style={{ marginLeft: -18 }}>.</span>
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori needs a plain img */}
            <img src={wolf} alt="" style={avatarStyle} />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: LIME,
              borderRadius: 9999,
              padding: "14px 26px",
              fontSize: 26,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#ff3d7f" }} />
            {hero.badge}
          </div>
          <div style={{ fontSize: 26, color: "#3b3350" }}>
            Anonymous, psychology-matched dating · pearmo.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Funnel Display", data: display, weight: 800, style: "normal" },
        { name: "Funnel Sans", data: sans, weight: 500, style: "normal" },
        { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
      ],
    },
  );
}
