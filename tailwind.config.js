/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkgray: "#2B2B2B",
        spacegray: "#101010"
      },
      aspectRatio: {
        "book": "1 / 1.6",
        "movie": "3.2 / 5"
      },
      screens: {
        "xs": "480px"
      }
      , fontFamily: {
        "mono-game": ["VT323", "monospace"]
      }
    }
  },
  plugins: []
};
