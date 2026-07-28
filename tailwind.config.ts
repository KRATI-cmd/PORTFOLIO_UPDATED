import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#090D16",
        night: "#0B0F17",
        surface: "#111827",
        line: "#1F2937",
        mist: "#9CA3AF",
        neon: {
          green: "#10B981",
          cyan: "#06B6D4",
          violet: "#8B5CF6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 28px rgba(16, 185, 129, 0.24)",
        cyanGlow: "0 0 28px rgba(6, 182, 212, 0.22)",
        violetGlow: "0 0 28px rgba(139, 92, 246, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
