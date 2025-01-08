/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}","src/components/Navbar1.tsx"],
  theme: {
    extend: {
      animation: {
        'moveRight': 'moveRight 2s linear infinite',
      },
      keyframes: {
        moveRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}