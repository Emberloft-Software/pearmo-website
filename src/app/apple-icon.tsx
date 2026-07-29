import { ImageResponse } from "next/og";

/** Home-screen icon for iOS. 180×180 is the size Safari asks for. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#17131f",
        }}
      >
        {/* Inline SVG rather than an emoji: emoji glyphs would need a remote
            font fetch at build time, which can fail in CI. */}
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4c.3-1.4 1.3-2.3 2.8-2.5"
            stroke="#8fbf00"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M12 4.5c-1.6-1-3.4-.8-4.6.4C6.2 6.1 6 7.9 7 9.4 4.6 10.8 3.4 13.4 4 16c.7 3.2 3.7 5.6 8 5.6s7.3-2.4 8-5.6c.6-2.6-.6-5.2-3-6.6 1-1.5.8-3.3-.4-4.5-1.2-1.2-3-1.4-4.6-.4Z"
            fill="url(#appleIconGradient)"
          />
          <defs>
            <linearGradient
              id="appleIconGradient"
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
      </div>
    ),
    size,
  );
}
