/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDF8F4',
          100: '#F9E9D9',
          200: '#F5DBBE',
          300: '#F1CCA3',
          400: '#EDBD88',
          500: '#D4A574',
          600: '#C19A6B',
          700: '#A67C52',
          800: '#8B5E39',
          900: '#704020',
        },
        green: {
          50: '#E8F5F1',
          100: '#C1E5D5',
          200: '#9AD5B9',
          300: '#73C59D',
          400: '#4CB581',
          500: '#1B5E47',
          600: '#0A4D3C',
          700: '#083D30',
          800: '#062D24',
          900: '#041D18',
        }
      },
      fontFamily: {
        'cairo': ['Cairo', 'sans-serif'],
        'tajawal': ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
