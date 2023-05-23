import { styled } from '@/styles'

export const Container = styled('div', {
  width: '100%',
  height: '4rem',
  background: '$green500',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '1rem',

  div: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  img: {
    background: '$gray800',
    borderRadius: 6,
  },

  a: {
    color: '$gray800',
  },

  strong: {
    color: '$white',
  },
})
