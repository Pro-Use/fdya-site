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
      'black-40': 'rgba(0,0,0,.4)',
      'white': '#ffffff',
      'yellow': '#B8F33A',
      'blue': '#2086E3',
      'lightBlue': '#80BFF9'
    },
    extend: {
      fontFamily: {
        DMregular: ['dm-mono-regular',  'monospace'],
        Monaco: ['monaco', 'serif']
      },
      height: {
        'fill-available': '-webkit-fill-available',
      },
      minHeight: {
        'fill-available': '-webkit-fill-available',
      },
      gridTemplateColumns: {
        'header': '48px 1fr 48px',
        'modal': '1fr 70px',
        'modal-xl': '1fr 100px'
      },
      boxShadow: {
        'default': '2px 2px 4px 0px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: [],
}

