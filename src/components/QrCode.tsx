import QRCode from "qrcode";

import { getUrl } from "@/lib/site";

/**
 * QR code for www.pearmo.com/get, generated on the server as inline SVG.
 *
 * Never an external QR service: the CSP blocks third-party images, and it
 * would hand every visitor's IP to someone else. Built from the module grid
 * rather than the library's SVG string so the markup is ours: one path, runs
 * of dark modules merged per row, `crispEdges` so modules don't blur.
 *
 * Scanning rules it follows: dark modules on a white tile whatever the page
 * colour, a 4-module quiet zone, error correction M (no logo in the middle,
 * so H isn't needed), and callers render it at 160px or more, except the
 * deliberately small footer copy.
 */
const QUIET = 4;

function modulesPath(): { d: string; size: number } {
  const qr = QRCode.create(getUrl, { errorCorrectionLevel: "M" });
  const n = qr.modules.size;
  let d = "";
  for (let y = 0; y < n; y++) {
    let x = 0;
    while (x < n) {
      if (!qr.modules.get(y, x)) {
        x++;
        continue;
      }
      let run = 1;
      while (x + run < n && qr.modules.get(y, x + run)) run++;
      d += `M${x + QUIET} ${y + QUIET}h${run}v1h-${run}z`;
      x += run;
    }
  }
  return { d, size: n + QUIET * 2 };
}

// The URL never changes at runtime, so the grid is computed once per build.
const { d, size } = modulesPath();

const SYMBOL_ID = "pearmo-get-qr";

/**
 * The QR's modules, defined once per page as an SVG <symbol>. Every QrCode
 * on the page draws it with <use>, so the 2 KB path appears once in the HTML
 * (and once in Next's hydration data) instead of once per QR. Rendered by
 * the root layout whenever the web app is switched on.
 */
export function QrDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
      <symbol id={SYMBOL_ID} viewBox={`0 0 ${size} ${size}`}>
        <rect width={size} height={size} fill="#ffffff" />
        <path d={d} fill="#17101f" shapeRendering="crispEdges" />
      </symbol>
    </svg>
  );
}

export function QrCode({
  px,
  className = "",
}: {
  /** Rendered width and height in CSS pixels. */
  px: number;
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={px}
      height={px}
      role="img"
      aria-label={`QR code. Scan it to open ${getUrl.replace("https://", "")} on your phone.`}
      className={`block rounded-[14px] ${className}`}
    >
      <use href={`#${SYMBOL_ID}`} />
    </svg>
  );
}
