/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0070f3",
          foreground: "white",
        },
        destructive: {
          DEFAULT: "#ff4136",
          foreground: "white",
        },
        background: "#ffffff",
        card: {
          DEFAULT: "white",
          foreground: "black",
        },
      },
    },
  },
  plugins: [],
}