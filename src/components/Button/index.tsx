import React from 'react'
import ReactLoading from 'react-loading'

import { Container } from './styles'
import { ButtonProps } from '@/types/button'

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
