import React, { ButtonHTMLAttributes } from 'react'
import ReactLoading from 'react-loading'

import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export function Button({ children, isLoading, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      {isLoading ? (
        <ReactLoading type="bars" color={'#fff'} width={40} height={40} />
      ) : (
        children
      )}
    </Container>
  )
}
