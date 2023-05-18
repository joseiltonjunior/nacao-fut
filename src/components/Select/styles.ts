import { styled } from '@/styles'

export const Container = styled('div', {
  width: '100%',

  position: 'relative',
})

export const DropdownSelection = styled('button', {
  backgroundColor: '$white',
  padding: '0.5rem',
  borderRadius: 8,
  height: 40,

  width: '100%',
  cursor: 'pointer',
  border: 'none',

  position: 'relative',

  '::before': {
    content: '',
    position: 'absolute',
    width: '6px',
    height: '6px',
    border: ' 2px solid $gray900',
    right: 10,
    top: '30%',
    borderTop: '1px solid transparent',
    borderRight: '1px solid transparent',
    transform: 'rotate(-45deg)',
    transition: 'all 0.2s',
  },

  variants: {
    isDisabled: {
      true: {
        cursor: 'default',
        backgroundColor: '$gray500',
      },
    },
    isOpen: {
      true: {
        borderRadius: '8px 8px 0 0',

        '::before': {
          top: '40%',
          transform: 'rotate(-225deg)',
        },
      },
    },
  },
})

export const SelectedItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

export const SelectedItemName = styled('span', {
  fontWeight: '600',
  fontSize: '1rem',
  color: '$gray900',
})

export const DropdownItem = styled('div', {
  cursor: 'pointer',
  fontWeight: '400',
  margiBottom: '0.5rem',
  color: '$gray800',
  padding: '0.5rem',
  display: 'flex',

  '&:hover': {
    background: '$gray800',
    color: '$orange500',
  },
})

export const DropdownItemName = styled('div', {
  padding: '0.2rem 0.5rem',

  fontSize: '$md',
})

export const DropdownContainer = styled('div', {
  position: 'absolute',
  backgroundColor: '$white',
  border: '1px solid $gray800',
  overflow: 'hidden',

  boxShadow: '-1px 5px 5px 0px rgba(0,0,0,0.3)',
  '-webkitBoxShadow': '-1px 5px 5px 0px rgba(0,0,0,0.3)',
  '-mozBoxShadow': '-1px 5px 5px 0px rgba(0,0,0,0.3)',

  width: '15rem',
  maxHeight: '20rem',
  overflowY: 'scroll',

  top: 40,

  zIndex: '1000',
})
