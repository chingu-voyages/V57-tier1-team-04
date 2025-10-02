/** @type {import('tailwindcss').Config} */
export default {

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
      smooch: ["'Smooch Sans'", "sans-serif"],
    },
      colors: {
        primary: "#60B8DE",
      },
    },
  },
  plugins: [],
  
}
// tailwind.config.js
