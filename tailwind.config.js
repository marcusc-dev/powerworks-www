/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        heading: ['Jost', 'sans-serif'],
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
