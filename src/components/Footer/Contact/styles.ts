import { styled } from '@/styles'

export const Container = styled('div', {
  display: 'flex',
  gap: '4rem',
  height: '100%',

  '@media (max-width: 900px)': {
    gap: '3rem',
  },
})
