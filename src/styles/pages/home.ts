import { styled } from '..'

export const Container = styled('div', {
  width: '100%',

  padding: '2rem',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  margin: '0 auto 2rem',
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
