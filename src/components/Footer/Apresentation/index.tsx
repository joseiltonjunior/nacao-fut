import Image from 'next/image'

import logo from '@/assets/icon-soccer-white.png'

import { Container } from './styles'

export function Apresetation() {
  return (
    <Container>
      <Image src={logo} alt="" height={40} />

      <span style={{ marginTop: '1rem' }}>
        Nação Fut é a sua dose diária de informações indispensáveis para todos
        os amantes do futebol.
      </span>
    </Container>
  )
}
