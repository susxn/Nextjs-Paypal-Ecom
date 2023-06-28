/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        titol: '#723d46', // Color personalizado 1
        rosat: '#e26d5c', // Color personalizado 2
        beix: '#ffe1a8', // Color personalizado 3
        fons: '#c9cba3', // Color personalizado 4
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
