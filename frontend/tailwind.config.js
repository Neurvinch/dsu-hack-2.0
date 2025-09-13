import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ✅ keep all Tailwind default colors (cyan, blue, etc.)
        ...colors,

        // ✅ add your custom colors
        deepNavy: "#0B1220",
        surface: "rgba(255,255,255,0.04)",
        glass: "rgba(255,255,255,0.06)",
        textPrimary: "#E6F3FF",
        textMuted: "#9CB3C9",
        primary: "#22D3EE",
        secondary: "#60A5FA",
        accent: "#8B5CF6",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        cyberGreen: "#00D4AA",
        steelBlue: "#1E40AF",
        slateDark: "#0F172A",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        heading: ["Sora", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "24px",
      },
      boxShadow: {
        "soft-xl": "0 10px 30px rgba(0, 200, 255, 0.08)",
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(135deg, #22D3EE, #60A5FA 50%, #8B5CF6)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
