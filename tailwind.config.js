/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#288880",
          dark: "#1c5f59",
          light: "#34b0a6",
          accent: "#28a69e",
        },
      }
    },
    plugins: [],
  }
};