/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/

const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
      extend: {
        height: theme => ({
          "100": "30rem",
          "screen/2": "50vh",
          "screen/3": "calc(100vh / 3)",
          "screen/4": "calc(100vh / 4)",
          "screen/5": "calc(100vh / 5)",
        }),
      },
      fontFamily: {
       'sans': ['"Inter var experimental"', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.coolGray,
        red: colors.red,
        green: colors.green,
        yellow: colors.amber,
        blue: colors.blue,
        pink: colors.pink,
        purple: colors.purple,
        fuchsia: colors.fuchsia,
        indigo: colors.indigo,

        primary: {
          DEFAULT: '#007f32',
          80: '#33995b',
          60: '#66b284',
          40: '#99ccad',
          20: '#cce5d6'
        },
        secondary: {
          DEFAULT: '#ffb300',
          80: '#ffc233',
          60: '#ffd166',
          40: '#ffe199',
          20: '#fff0cc'
        },
        ugreen: {
          DEFAULT: '#91b943',
          80: '#a7c769',
          60: '#bdd58e',
          40: '#d3e3b4',
          20: '#e9f1d8'
        },
        ublue: {
          DEFAULT: '#a0c6e6',
          80: '#b3d1eb',
          60: '#c6ddf0',
          40: '#d9e8f5',
          20: '#ecf4fa'
        },
        upink: {
          DEFAULT: '#c7004c',
          80: '#d23370',
          60: '#dd6694',
          40: '#e999b7',
          20: '#f4ccdb'
        }
      }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}