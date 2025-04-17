/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "bege-claro": "#EEDDC8",
        "bege-escuro": "#a24c5e",
        "verde-escuro": "#1D2B20",
        // Adicionando novas cores sugeridas
        primary: "#1D2B20",       // Verde escuro
        secondary: "#EEDDC8",     // Bege claro
        accent: "#a24c5e",        // Bege escuro
        danger: "#EF4444"         // Vermelho para erros
      },
      backgroundImage: {
        "home": "url('/assets/img')"
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.2s ease-in'
      }
    },
  },
  plugins: [],
}