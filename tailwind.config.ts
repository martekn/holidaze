import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import containerQueries from "@tailwindcss/container-queries";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/styles/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    screens: { xs: "25rem", sm: "40rem", md: "48rem", lg: "64rem", xl: "80rem", "2xl": "96rem" },
    fontFamily: {
      base: ["var(--font-montserrat)"],
      accent: ["var(--font-roboto)"]
    },
    fontSize: {
      sm: ["0.83125rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      xl: ["1.2rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.4375rem", { lineHeight: "2rem" }],
      "3xl": ["1.725rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.075rem", { lineHeight: "2.5rem" }],
      "5xl": ["2.4875rem", { lineHeight: "2.75rem" }]
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600"
    },
    spacing: {
      px: "1px",
      "0": "0px",
      "2": "0.125rem",
      "4": "0.25rem",
      "8": "0.5rem",
      "12": "0.75rem",
      "16": "1rem",
      "20": "1.25rem",
      "24": "1.5rem",
      "32": "2rem",
      "40": "2.5rem",
      "48": "3rem",
      "64": "4rem",
      "96": "6rem",
      "128": "8rem"
    },
    colors: {
      transparent: "transparent",
      neutral: {
        800: "hsl(var(--neutral-800))",
        700: "hsl(var(--neutral-700))",
        600: "hsl(var(--neutral-600))",
        500: "hsl(var(--neutral-500))",
        400: "hsl(var(--neutral-400))",
        300: "hsl(var(--neutral-300))",
        200: "hsl(var(--neutral-200))",
        100: "hsl(var(--neutral-100))"
      },
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))"
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))"
      },
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
        500: "hsl(var(--primary-500))",
        400: "hsl(var(--primary-400))",
        300: "hsl(var(--primary-300))"
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
        300: "hsl(var(--secondary-300))",
        200: "hsl(var(--secondary-200))",
        100: "hsl(var(--secondary-100))"
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
        400: "hsl(var(--accent-400))"
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))"
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))"
      },
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      chart: {
        "1": "hsl(var(--chart-1))",
        "2": "hsl(var(--chart-2))",
        "3": "hsl(var(--chart-3))",
        "4": "hsl(var(--chart-4))",
        "5": "hsl(var(--chart-5))"
      },
      alert: {
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))",
        information: "hsl(var(--information))",
        success: "hsl(var(--success))"
      }
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
      full: "50%"
    }
  },
  plugins: [tailwindcssAnimate, containerQueries]
};
export default config;
