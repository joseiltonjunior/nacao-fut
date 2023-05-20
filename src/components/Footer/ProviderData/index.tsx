import { Redirect } from '../styles'
import { Container } from './styles'

export function ProviderData() {
  return (
    <Container>
      <strong>Data provided by</strong>
      <Redirect target="_blank" href={'https://dashboard.api-football.com/'}>
        API Sports
      </Redirect>
    </Container>
  )
}
