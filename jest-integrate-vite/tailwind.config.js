/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Orbitron', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        /** ProDegenFlow cyber-punk neon set **/
        brand: {
          bg:   '#0d0d0f',   // near-black base
          pink: '#ff007c',   // hot-magenta
          blue: '#00e8ff',   // neon-cyan
          lime: '#a4ff00',   // electric-lime (accents)
          gray: '#8c8c8c',   // slate text
        },
      },
    },
  },
  plugins: [],
};