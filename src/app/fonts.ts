import { Montserrat, Roboto } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal"],
  display: "swap",
  variable: "--font-montserrat",
  fallback: ["Arial", "Helvetica", "sans-serif"]
});
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  display: "swap",
  variable: "--font-roboto",
  fallback: ["Arial", "Helvetica", "sans-serif"]
});
