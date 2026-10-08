import { Instrument_Serif, Schibsted_Grotesk } from "next/font/google";

/** Direction B: Instrument Serif as the display face, roman and italic. */
export const instrumentSerifB = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif-b",
  display: "swap",
});

export const schibstedB = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-schibsted",
  display: "swap",
});
