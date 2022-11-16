/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./public/index.html", "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      'myFonts': [ 'Montserrat', '"Source Sans Pro"', 'Roboto', 'Quicksand' ],
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
