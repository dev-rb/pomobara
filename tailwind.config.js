module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'level-glow-color': 'rgb(199, 5, 5)'
      },

      backgroundImage: {
        'level-bara': "url('/capybara-pomo.png')"
      }
    },
  },
  plugins: [],
}
