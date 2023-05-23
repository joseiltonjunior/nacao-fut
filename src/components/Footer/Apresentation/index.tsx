import Image from 'next/image'

import logo from '@/assets/icon-soccer-white.png'

import { Container } from './styles'

export function Apresetation() {
  return (
    <Container>
      <Image src={logo} alt="" height={40} />

      <span style={{ marginTop: '1rem' }}>
        To stay updated on the world of football and the statistics of your
        favorite team.
      </span>
    </Container>
  )
}
