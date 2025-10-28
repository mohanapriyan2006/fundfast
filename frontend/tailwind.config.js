/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}" , "./screens/**/*.{js,jsx,ts,tsx}" , "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00CA73",
          dark: "#005631",
          light: "#98FFD2",
          mid: "#00673A",
          lighter: "#4CD080",
        },
        accent: {
          DEFAULT: "#F5F5F5",
          dark: "#8F92A1",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};