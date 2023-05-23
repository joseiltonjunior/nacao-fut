import Image from 'next/image'

import { Title, Info, Redirect } from '../styles'
import { Container } from './styles'

export function Contact() {
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
        }}
      >
        <Image
          src={`https://avatars.githubusercontent.com/u/47725788?v=4`}
          alt=""
          width={70}
          height={70}
          style={{ borderRadius: 70, border: '3px solid #e1e1e6' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Title>Junior Ferreira</Title>
          <Info>Software Developer</Info>
        </div>
      </div>
      <div style={{ flexDirection: 'column', display: 'flex' }}>
        <Title>Contatos</Title>
        <Redirect target="_blank" href={'https://www.instagram.com/dvlp.code'}>
          Instagram
        </Redirect>

        <Redirect
          target="_blank"
          href={'https://www.linkedin.com/in/joseilton-junior'}
        >
          Linkedln
        </Redirect>
      </div>
    </Container>
  )
}
