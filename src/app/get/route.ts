import { site } from "@/lib/site";

/**
 * /get — the stable address behind every QR code and printed link.
 *
 * 307, never 308: browsers cache permanent redirects indefinitely, so a 308
 * would pin every phone that ever scanned a code to today's destination. A
 * temporary redirect can be repointed at any time without reprinting.
 *
 * Until the web app launches (`site.webAppUrl` is null) it lands on the beta
 * section of the home page instead.
 */
export function GET(request: Request): Response {
  const destination = site.webAppUrl ?? new URL("/#beta", request.url).toString();

  return new Response(null, {
    status: 307,
    headers: {
      Location: destination,
      // Belt and braces: no shared or browser cache may hold on to the hop.
      "Cache-Control": "no-store",
    },
  });
}
