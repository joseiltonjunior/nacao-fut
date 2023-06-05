import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  height: 'calc(100vh - 17rem)',

  h3: {
    maxWidth: 500,
  },

  a: {
    color: '$orange500',
    marginTop: '0.5rem',
    textDecoration: 'none',
    fontSize: '$md',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
})
