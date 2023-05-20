import { Title, Redirect } from '../styles'
import { Container } from './styles'

interface LinksProps {
  mobile?: boolean
}

export function Links({ mobile }: LinksProps) {
  return (
    <Container mobile={mobile}>
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
    </Container>
  )
}
