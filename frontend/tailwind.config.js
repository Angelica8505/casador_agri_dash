const { colors } = require('./src/theme/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: colors.primary.main,
          light: colors.primary.light,
          dark: colors.primary.dark,
        },
        secondary: {
          main: colors.secondary.main,
          light: colors.secondary.light,
          dark: colors.secondary.dark,
        },
        background: {
          default: colors.background.default,
          paper: colors.background.paper,
          dark: colors.background.dark,
        },
        text: {
          primary: colors.text.primary,
          secondary: colors.text.secondary,
          light: colors.text.light,
        },
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
        soil: colors.soil,
        sky: colors.sky,
        wheat: colors.wheat,
        leaf: colors.leaf,
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 