/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F4EAE8",
          100: "#DCBCB8",
          200: "#CB9C96",
          300: "#B36F66",
          400: "#A45348",
          500: "#8D281A",
          600: "#802418",
          700: "#641C12",
          800: "#4E160E",
          900: "#3B110B",
        },
        stroke: "#BCBCBC",
        placeholder: "#878787",
      },
    },
    fontFamily: {
      book: ["GothamBook", "sans-serif"],
      medium: ["GothamMedium", "sans-serif"],
      bold: ["GothamBold", "sans-serif"],
      black: ["GothamBlack", "sans-serif"],
    },
  },
  plugins: [],
};
