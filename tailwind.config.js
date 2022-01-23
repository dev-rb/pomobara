module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'level-glow-color': 'rgb(199, 5, 5)',
        'focus-glow': 'rgb(199, 5, 5)',
        'short-break-glow': 'rgb(255, 255, 255)',
        'long-break-glow': 'rgb(40, 129, 217)'
      },

      backgroundImage: {
        'level-bara': "url('/capybara-pomo.png')"
      },

      keyframes: {
        modalSlideIn: {
          '0%': {
            transform: 'translateY(100vh)'
          },
          '100%': {
            transform: 'translateY(0px)'
          }
        }
      },

      animation: {
        modalSlideIn: 'modalSlideIn 0.5s ease'
      }
    },
  },
  plugins: [],
}
