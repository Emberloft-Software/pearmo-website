import { Bricolage_Grotesque, Schibsted_Grotesk } from "next/font/google";

/** Direction A uses the app's own faces. Instrument Serif comes from the root layout. */
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  // Variable, because the optical-size axis needs it (and covers 700/800).
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

export const schibstedA = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-schibsted",
  display: "swap",
});
