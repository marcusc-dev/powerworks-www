/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        power: {
          blue: '#1e3a8a',
          red: '#dc2626',
          dark: '#111827',
          light: '#f3f4f6',
        }
      }
    }
  },
  plugins: [],
}
