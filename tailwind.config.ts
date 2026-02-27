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
        primary: {
          DEFAULT: '#10B981',      // main green (your PRIMARY_GREEN)
          hover: '#0da673',        // darker hover variant
          light: '#34d399',        // optional lighter variant
          dark: '#047857',         // optional darker variant
        },
      },
    },
  },
  plugins: [],
}