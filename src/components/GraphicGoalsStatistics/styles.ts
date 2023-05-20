import { styled } from '@/styles'

export const GraphicContent = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2rem',
  marginTop: '2rem',

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
})
