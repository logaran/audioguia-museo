/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkmode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '270px'
      },
      fontFamily: {
        chronicle: ['Chronicle', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

