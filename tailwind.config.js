/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...colors,
      "primary": "#2d2d2d",
      "secondary": "#F16667",
      "danger": "#CD0000",
      "success": "#1DD719",
      "primary-dark": "#131313",
      "primary-dark-2": "#232323",
      "primary-dark-3": "#1F1F1F",
      "primary-dark-4": "#626262",
      "primary-dark-5": "#555555",
      "primary-dark-6": "#383838",
      "primary_border": "#535353",
      "green-active": "#3Da73A",
      "tinder-1": "#FF695B",
      "tinder-2": "#FE426F",
      "neutral": "#414141"
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "xs": "420px"
      }
    },

  },
  plugins: [],
};
