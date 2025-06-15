import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  // content: ["./app/**/*.{ts,tsx}", "./sanity/**/*.{ts,tsx}"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sanity/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': "var(--primary-color)",
        'primaryTextColor': "var(--primary-text)",
        'green': '#04c904',
      },
      fontFamily: {
        // "Atkinson": ["Atkinson Regular", ...defaultTheme.fontFamily.sans],
        primary: ['var(--font-primary)'],
        secondary: ['var(--font-secondary)'],
      },
      fontSize: {
        sm: '0.8rem',
        base: '0.9rem',
        xl: '1.1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 255, 0, 0.7)',
      }
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
