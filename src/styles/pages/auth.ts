import { styled } from '..'

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 600px',

  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',

  transition: 'all 0.2s',

  main: {
    margin: '0 auto',

    h3: {
      fontSize: '$xl',
    },

    form: {
      marginTop: '1rem',
      maxWidth: 600,
      minWidth: 320,
      gap: '1rem',
      display: 'flex',
      flexDirection: 'column',
    },
  },

  aside: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '$gray800',
    height: '100vh',

    img: {
      width: 'auto',
      height: 'auto',

      objectFit: 'contain',
      right: 0,
    },
  },

  '@media (max-width: 1000px)': {
    gridTemplateColumns: '1fr',
    height: '100vh',
    padding: '1rem',

    main: {
      h3: {
        fontSize: '$lg',
      },
    },

    aside: {
      display: 'none',
    },
  },
})
