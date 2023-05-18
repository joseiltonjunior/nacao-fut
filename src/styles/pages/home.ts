import { styled } from '..'

export const Container = styled('main', {
  width: '100%',

  padding: '2rem',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  margin: '0 auto',
})

export const Form = styled('div', {
  marginTop: '0.5rem',

  display: 'grid',
  gridTemplateColumns: '250px 200px 1fr 1fr',
  gap: '1rem',
})

export const Content = styled('div', {
  width: '100%',

  padding: '1rem',
  background: '$gray800',
  borderRadius: 8,

  marginTop: '2rem',
})

export const NoContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  height: 'calc(100vh - 17rem)',
})
