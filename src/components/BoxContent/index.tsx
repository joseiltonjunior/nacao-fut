import { PropsWithChildren } from 'react'
import { Container } from './styles'

export function BoxContent({ children }: PropsWithChildren) {
  return <Container>{children}</Container>
}
