/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        gray:{
          100: "#a3a5ad",
          200: "#1b2a39",
          300: "#3a3c3e"
        },
        purple:{
          100: "#6800e7",
          200: "#dee5fe",
          300: "#5c04c0"
        }
      }
    },
  },
  plugins: [],
}

