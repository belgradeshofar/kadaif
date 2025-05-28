// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ovde po potrebi možeš dodati custom boje ili font-family
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
