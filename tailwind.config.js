/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkmode: 'class',
  theme: {
    extend: {
      fontFamily: {
        chronicle:['Chronicle', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

