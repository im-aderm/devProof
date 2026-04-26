import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#04170D",
        primary: "#54E98A",
        "primary-container": "#2ECC71",
        "on-surface": "#E5E2E1",
        "on-surface-variant": "#BBCBBB",
        "surface-container-lowest": "#011208",
        "surface-container-low": "#0B1F14",
        "surface-container-high": "#1A2E22",
        "surface-container-highest": "#25392D",
        outline: "#908FA0",
        "outline-variant": "rgba(144, 143, 160, 0.15)", // Ghost border rule
        error: "#FFB4AB",
      },
      borderRadius: {
        DEFAULT: "0.375rem", // md
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      spacing: {
        px: "1px",
        0: "0",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "700" }],
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "700" }],
        "display-md": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-lg": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-md": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        "headline-sm": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "label-md": ["0.75rem", { lineHeight: "1.5", fontWeight: "500", letterSpacing: "0.05em" }],
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, #54E98A 0%, #2ECC71 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")],
};
export default config;
