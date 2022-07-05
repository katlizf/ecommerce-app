/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
    fontFamily: {
        'custom': ['Kdam Thmor Pro', 'sans-serif']
    },
    colors: {
        'green': '#1EAE5A',
        'light-blue': '#29b6f6',
        'orange': '#FF7C1F',
        'red': '#E01600',
        'white': '#ffffff',
        'light-grey': '#DEDEDE'
    }
  },
  plugins: [],
}
