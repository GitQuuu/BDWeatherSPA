/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      keyframes: {
        horizontalSpin: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        gradientFade: {
          '0%': { opacity: 0.6 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0.6 },
        },
      },
      animation: {
        'horizontal-spin': 'horizontalSpin 4s linear infinite',
        'fade-bg': 'gradientFade 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-primeui')]
}

