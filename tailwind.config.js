/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        primary: "#ffffff",
        secondary: "#aaaaaa",
        accent: "#00FFD1",
        danger: "#FF4C4C",
        success: "#16c784",
        highlight: "#805AD5"
      }
    }
  },
  plugins: [],
}