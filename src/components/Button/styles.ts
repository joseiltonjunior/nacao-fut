import { styled } from '@stitches/react'

export const Container = styled('button', {
  marginTop: 'auto',
  background: '$green500',
  border: 0,
  color: '$gray800',
  borderRadius: 8,
  padding: '1.25rem',
  cursor: 'pointer',
  fontWeight: 'bolder',
  fontSize: '$md',
  height: '3rem',
  width: '100%',
  transition: 'all 0.3s',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    color: '$gray100',
  },

  svg: {
    height: '100%',
  },
})
