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
          style={{ borderRadius: 70 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Title>Junior Ferreira</Title>
          <Info>Fullstack Developer</Info>
        </div>
      </div>
      <div style={{ flexDirection: 'column', display: 'flex' }}>
        <Title>Contato</Title>
        <Redirect target="_blank" href={'https://www.instagram.com/dvlp.code'}>
          Instagram
        </Redirect>
        <Redirect
          target="_blank"
          href={'https://www.youtube.com/channel/UCeJD8gJRoNW_2__3E_vizvQ'}
        >
          Youtube
        </Redirect>
        <Redirect
          target="_blank"
          href={'https://www.linkedin.com/in/joseilton-junior'}
        >
          Linkedln
        </Redirect>
        <Redirect target="_blank" href={'https://github.com/joseiltonjunior'}>
          Github
        </Redirect>
      </div>
    </Container>
  )
}
