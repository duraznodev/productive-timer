/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  //Safe List Used as Solution for Changing Colors with Template Literals
  safelist: [
    { pattern: /bg-(slate|orange)-(100|900)/ },
    { pattern: /border-(slate|orange)-(100|900)/ },
    { pattern: /text-(slate|orange)-(100|900)/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
