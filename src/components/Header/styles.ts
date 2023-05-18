import { styled } from '@/styles'

export const Container = styled('div', {
  width: '100%',
  height: '4rem',
  background: '$orange500',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '1rem',

  a: {
    color: '$gray800',
  },

  strong: {
    color: '$gray800',
  },
})
