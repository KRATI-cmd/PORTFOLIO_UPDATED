import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Ocean
        void: "#060B14",
        night: "#0E1626",
        surface: "#111C2E",
        line: "#1E293B",
        mist: "#94A3B8",
        ocean: {
          sky: "#38BDF8",
          cyan: "#22D3EE",
          teal: "#2DD4BF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 28px rgba(56, 189, 248, 0.26)",
        cyanGlow: "0 0 28px rgba(34, 211, 238, 0.24)",
        tealGlow: "0 0 28px rgba(45, 212, 191, 0.24)",
        lift: "0 24px 50px -24px rgba(0, 0, 0, 0.85)",
      },
      letterSpacing: {
        eyebrow: "0.28em",
      },
      keyframes: {
        blink: {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(2.1)", opacity: "0" },
          "100%": { transform: "scale(2.1)", opacity: "0" },
        },
        // Slow, organic drift for the background aurora blobs
        "aurora-a": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(6vw, 4vh, 0) scale(1.12)" },
          "66%": { transform: "translate3d(-4vw, 7vh, 0) scale(0.94)" },
        },
        "aurora-b": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1.05)" },
          "33%": { transform: "translate3d(-7vw, 5vh, 0) scale(0.92)" },
          "66%": { transform: "translate3d(5vw, -4vh, 0) scale(1.15)" },
        },
        "aurora-c": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(0.98)" },
          "50%": { transform: "translate3d(4vw, -6vh, 0) scale(1.18)" },
        },
      },
      animation: {
        blink: "blink 1.2s steps(1, end) infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.2, 0.7, 0.4, 1) infinite",
        "aurora-a": "aurora-a 26s ease-in-out infinite",
        "aurora-b": "aurora-b 32s ease-in-out infinite",
        "aurora-c": "aurora-c 38s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
