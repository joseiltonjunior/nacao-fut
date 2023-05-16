import { createStitches } from '@stitches/react'

export const {
  config,
  styled,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  css,
} = createStitches({
  theme: {
    colors: {
      white: '#fff',

      gray100: '#e1e1e6',
      gray300: '#c4c4cc',
      gray500: '#2E2E35',
      gray800: '#202024',
      gray900: '#121214',

      blue100: '#E0FFFF',

      green300: '#00b37e',
      green500: '#00875f',
      greenNeon: '#c1fe05',
      greenSwamp: '#799f03',
      orange500: '#FFBA00',
      purple300: '#750592',
      purple500: '#58046e',

      red500: '#ff4040',
    },

    fontSizes: {
      sm: '1rem',
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
  },
})
