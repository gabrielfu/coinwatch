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
        'extradark': '#101124',
        'dark': '#20243F',
        'medium': '#2A2E62',
        'light': '#3C428C',
        'highlight': '#2E3ED3',
        'text': '#BABAC1',
        'highlight_text': '#FFFFFF',
        'disabled_text': '#454759',
        'shadow': '#212439',
        'tick_green': 'rgba(14, 204, 131, 1.0)',
        'tick_red': 'rgba(250, 60, 88, 1.0)',
        'gmx': {
          'dark': '#101124',
          'medium': '#16182E',
          'light': '#20243F',
          'extralight': '#363A68',
          'blue': '#2E3ED3',
          'text': '#9B9EA9',
          'gray': '#696B73',
          'break': '#2B3054',
        },
        'green': 'rgba(14, 204, 131, 1.0)',
        'red': 'rgba(250, 60, 88, 1.0)',
      },
      screens: {
        'screen800': '800px',
        'screen900': '900px',
      },
    },
  },
  plugins: [],
}
