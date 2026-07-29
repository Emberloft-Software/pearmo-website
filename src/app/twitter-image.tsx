/**
 * X/Twitter reuses the Open Graph card art — one image to maintain, and the
 * 1200×630 ratio is what summary_large_image crops from anyway.
 *
 * `dynamic` is declared here rather than re-exported: Next parses route segment
 * config statically and rejects a re-exported one.
 */
export { default, alt, size, contentType } from "./opengraph-image";

export const dynamic = "force-static";
