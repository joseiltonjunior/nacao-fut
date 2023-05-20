import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '@media (max-width: 900px)': {
    display: 'none',
  },

  variants: {
    mobile: {
      true: {
        '@media (max-width: 900px)': {
          display: 'flex',
        },
      },
    },
  },
})
