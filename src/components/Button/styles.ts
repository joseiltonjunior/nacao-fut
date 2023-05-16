import { styled } from '@stitches/react'

export const Container = styled('button', {
  marginTop: 'auto',
  background: '$orange500',
  border: 0,
  color: '$gray900',
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
    color: '$white',
  },

  svg: {
    height: '100%',
  },
})
