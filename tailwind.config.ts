import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f8f5",
          100: "#dcefe4",
          200: "#baddc8",
          300: "#92c7a8",
          400: "#68ad83",
          500: "#4b8d67",
          600: "#386f50",
          700: "#2e5941",
          800: "#274735",
          900: "#203a2d"
        },
        sand: "#f6edd9",
        lake: "#17364d",
        sunrise: "#eb7b3f"
      },
      boxShadow: {
        card: "0 24px 60px rgba(13, 31, 44, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
