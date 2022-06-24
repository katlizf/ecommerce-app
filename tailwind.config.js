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
        'dark-blue': '#233A80',
        'orange': '#FF7C1F',
        'red': '#E01600',
        'purple': '#783F8E',
        'yellow': '#F4E409',
        'black': '#050000',
        'white': '#ffffff',
        'grey': '#949494',
        'light-grey': '#bebebe',
        'reddish-orange': '#F5653D'
    }
  },
  plugins: [
    require('tailwindcss-text-fill-stroke')()
  ],
}
