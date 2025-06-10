/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        fadeInDelay1: 'fadeIn 0.5s ease-out 0.1s',
        fadeInDelay2: 'fadeIn 0.5s ease-out 0.2s',
        fadeInDelay3: 'fadeIn 0.5s ease-out 0.3s',
      }
    }
  },
  plugins: [],
}