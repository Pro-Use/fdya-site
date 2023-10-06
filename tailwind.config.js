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
      'black': '#000000',
      'white': '#ffffff',
    },
    extend: {
      fontFamily: {
        DMregular: ['dm-mono-regular',  'monospace']
      },
      gridTemplateColumns: {
        'header': '48px 1fr 48px',
      },
      boxShadow: {
        'default': '2px 2px 4px 0px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: [],
}

