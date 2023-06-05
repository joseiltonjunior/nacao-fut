import { styled } from '@/styles'

export const Container = styled('div', {
  background: '$gray900',
  height: '100%',
  borderRadius: 8,
  overflow: 'hidden',

  header: {
    display: 'flex',
    background: '$green500',
    justifyContent: 'space-between',
    padding: '0.5rem',
    borderRadius: '8px 8px 0 0',
  },
})
