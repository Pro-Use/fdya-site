/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'offBlack': '#201E21',
      'transparent': 'transparent',
      'current': 'currentColor',
      'black': '#000',
      'white': '#ffffff',
    },
    extend: {
      fontFamily: {
        DMregular: ['dm-mono-regular',  'monospace']
      }
    }
  },
  plugins: [],
}

