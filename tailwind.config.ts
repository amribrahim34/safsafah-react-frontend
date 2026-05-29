import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#288880',
          dark: '#1c5f59',
          light: '#34b0a6',
          accent: '#28a69e',
          teal: '#007F75',
          coral: '#FF4757',
          sage: '#8DA78A',
          cream: '#FAF7F2',
          charcoal: '#2C2C2C',
          terracotta:"#D65A47",
        },
      },
      fontFamily: {
        sans: ['var(--font-cairo)', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
};

export default config;
