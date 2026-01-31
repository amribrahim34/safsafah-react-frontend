/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
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
  },
  plugins: [],
};