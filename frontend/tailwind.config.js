/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#087F8C',
          dark: '#075B66',
          light: '#E6F4F6',
        },
        secondary: {
          DEFAULT: '#2563A6',
          dark: '#1D4E83',
          light: '#EAF1F9',
        },
        accent: {
          DEFAULT: '#B8E7D0',
          dark: '#76C59E',
          light: '#EDF9F3',
        },
        surface: '#FFFFFF',
        background: '#F5FAFA',
        'text-primary': '#18313B',
        'text-secondary': '#647681',
        border: '#DCE8E9',
        success: '#237A57',
        warning: '#A96A12',
        danger: '#B42332',
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Lato', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(8, 127, 140, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 2px 12px rgba(24, 49, 59, 0.06)',
        'hover': '0 10px 25px -3px rgba(8, 127, 140, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
