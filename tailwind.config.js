/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '120': '40rem',
        'half': '50vh'
      },
      gridTemplateColumns: {
        'auto-one': 'repeat(auto-fit, minmax(200px, auto))',
        'auto-two': 'repeat(auto-fit, minmax(165px, auto))',
      },
      colors: {
        'modal': 'rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [],
}

