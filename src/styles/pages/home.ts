import { styled } from '..'

export const Container = styled('div', {
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

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
})

export const Main = styled('main', {
  width: '100%',

  padding: '1rem',
  background: '$gray800',
  borderRadius: 8,

  marginTop: '2rem',

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
})

export const NoContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  height: 'calc(100vh - 17rem)',

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

export const BoxContent = styled('div', {
  background: '$gray900',

  borderRadius: 8,

  h4: {
    color: '$gray800',

    background: '$orange500',
    padding: '0.5rem',
    borderRadius: '8px 8px 0 0',
  },
})

export const ContentGrid = styled('div', {
  padding: '0.5rem 0',
  gap: '1rem',

  variants: {
    flex: {
      true: {
        display: 'flex',
        justifyContent: 'space-between',
      },
    },
    grid: {
      true: {
        display: 'grid',
        gridTemplateColumns: '1fr 30px 100px',
      },
    },
    borderBottom: {
      true: {
        borderBottom: '1px solid $orange500',
      },
    },
  },
})

export const ContentGridStatistics = styled('div', {
  display: 'grid',
  gap: '2rem',
})

export const ContentBox = styled('div', {
  padding: '1rem',
})

export const Content = styled('div', {})

export const StatisticsContent = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2rem',
  marginTop: '2rem',

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
})

export const GraphicContent = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2rem',
  marginTop: '2rem',

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
})
