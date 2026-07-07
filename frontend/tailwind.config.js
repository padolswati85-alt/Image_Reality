/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#2E4A5A",
        teal: "#4F7F7A",
        sky: "#BFD6DF",
        beige: "#EDE7DE",
        offwhite: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
