/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#76cbf0',
        textHover: '#374151',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}