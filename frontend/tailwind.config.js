/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'midnight': '#121063',
        'gmx': {
          'dark': '#101124',
          'medium': '#16182E',
          'light': '#20243F',
          'blue': '#2E3ED3',
          'text': '#9B9EA9',
          'gray': '#696B73',
          'break': '#2B3054',
        },
        'green': 'rgba(14, 204, 131, 1.0)',
        'red': 'rgba(250, 60, 88, 1.0)',
      },
      screens: {
        'tosm': {'max': '639px'}
      }
    },
  },
  plugins: [],
}
