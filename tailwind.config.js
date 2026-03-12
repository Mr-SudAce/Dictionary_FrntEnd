/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        maven: ["Maven Pro", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      colors: {
        primary: {
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
        secondary: {
          100: "#f1f5f9",
          300: "#cbd5e1",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        accent: {
          100: "#ffedd5",
          800: "#9a3412",
        },
      },
      boxShadow: {
        soft: "0 5px 20px rgba(0,0,0,0.05)",
        medium: "0 10px 30px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};