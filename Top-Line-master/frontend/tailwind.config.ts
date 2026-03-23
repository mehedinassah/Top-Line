import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      colors: {
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#efefef",
          300: "#e5e5e5",
          400: "#d4d4d4",
          500: "#a3a3a3",
          600: "#737373",
          700: "#525252",
          800: "#292929",
          900: "#212121"
        }
      },
      boxShadow: {
        minimal: "0 1px 3px rgba(0, 0, 0, 0.1)"
      },
      borderRadius: {
        xl: "0.25rem"
      },
      backgroundImage: {
        "gradient-light": "linear-gradient(to bottom, #ffffff, #fafafa)",
        "gradient-minimal": "linear-gradient(to bottom right, #ffffff, #fafafa)"
      }
    }
  },
  plugins: []
};

export default config;

