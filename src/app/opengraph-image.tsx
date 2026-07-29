import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

/**
 * The og:image every WhatsApp, Instagram, Facebook and X share of pearmo.com
 * will render. Generated at build time (`force-static`) rather than per
 * request, so it costs nothing to serve.
 *
 * 1200×630 is the size all four platforms crop from. Everything is drawn with
 * plain divs and inline styles — Satori (the renderer behind next/og) supports
 * only a subset of CSS, and no Tailwind.
 */
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#17131f",
          padding: "70px 80px",
          position: "relative",
        }}
      >
        {/* Brand gradient glow, top-right. */}
        <div
          style={{
            position: "absolute",
            top: -280,
            right: -160,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "linear-gradient(120deg, #6c5ce7 0%, #8f4fe0 45%, #c2258f 100%)",
            opacity: 0.55,
            filter: "blur(120px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Inline SVG, not an emoji — emoji would require a remote font
              fetch at build time. */}
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 4c.3-1.4 1.3-2.3 2.8-2.5"
              stroke="#8fbf00"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M12 4.5c-1.6-1-3.4-.8-4.6.4C6.2 6.1 6 7.9 7 9.4 4.6 10.8 3.4 13.4 4 16c.7 3.2 3.7 5.6 8 5.6s7.3-2.4 8-5.6c.6-2.6-.6-5.2-3-6.6 1-1.5.8-3.3-.4-4.5-1.2-1.2-3-1.4-4.6-.4Z"
              fill="url(#ogPearGradient)"
            />
            <defs>
              <linearGradient
                id="ogPearGradient"
                x1="4"
                y1="4"
                x2="20"
                y2="22"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8b7bff" />
                <stop offset="1" stopColor="#e0359f" />
              </linearGradient>
            </defs>
          </svg>
          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            pearmo
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Meet the person,
          </div>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              color: "#c8f135",
              display: "flex",
            }}
          >
            not the picture.
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 29,
              color: "#c9c2e0",
              lineHeight: 1.4,
              maxWidth: 900,
              display: "flex",
            }}
          >
            Anonymous, psychology-matched dating. No swiping, no public photos,
            verified people only.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 9999,
              padding: "12px 22px",
              fontSize: 21,
              color: "#ffffff",
              letterSpacing: "0.04em",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: "#c2258f",
              }}
            />
            Pre-launch · Sri Lanka
          </div>
          <div style={{ fontSize: 21, color: "#8d85a8", display: "flex" }}>
            pearmo.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
