/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        netflix: "#E50914",
        ink: "#141414",
        card: "#1F1F1F",
        searchbar: "#0B1218",
        muted: "#808080",
      },
      fontFamily: {
        sans: ["Inter", "Netflix Sans", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["Bebas Neue", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
