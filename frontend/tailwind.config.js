/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  }, theme: {
    extend:
    {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'gilda': ['Gilda Display', 'serif']
      },
    },
  },
  plugins: [],
}