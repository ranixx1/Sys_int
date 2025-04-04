/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "bege-claro": "#EEDDC8",
        "bege-escuro": "#a24c5e",
        "verde-escuro":"#1D2B20",
      },
      backgroundImage:{
        "home": "url('/assets/img')"
      }
    },
  },
  plugins: [],
}

