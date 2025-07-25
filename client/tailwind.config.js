/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFB900', // Jumia yellow
        },
        secondary: {
          DEFAULT: '#fff', // white
        },
        accent: {
          DEFAULT: '#000', // black
        },
        neutral: {
          light: '#f5f5f5', // light grey
          DEFAULT: '#444444', // dark grey
        },
      },
    },
  },
  plugins: [],
};
