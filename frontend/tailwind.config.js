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
        'backdrop': '#101124',
        'primary': '#20243F',
        'secondary': '#2A2E62',
        'tertiary': '#3C428C',
        'highlight': '#2E3ED3',
        'border': '#BABAC1',
        'text': '#BABAC1',
        'highlight_text': '#FFFFFF',
        'disabled_text': '#454759',
        'shadow': '#212439',
        'tick_up': 'rgba(14, 204, 131, 1.0)',
        'tick_down': 'rgba(250, 60, 88, 1.0)',
      },
      screens: {
        'screen800': '800px',
        'screen900': '900px',
      },
    },
  },
  plugins: [],
}
