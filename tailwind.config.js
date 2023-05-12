/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'damion': ['NotoSans_medium'],
        'sans': ["'Karla', NotoSans"],
      }
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "secondary": "#8533ff",
          "primary": "#ffffff",
          "accent": "#763cd8",
          "neutral": "#444444",
          "base-100": "#0b090a",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272"
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp"), require('tailwind-scrollbar-hide')],
};
