import Link from 'next/link'
import { Container } from './styles'
import { GoSignOut } from 'react-icons/go'

interface headerProps {
  title: string
}

export function Header({ title }: headerProps) {
  return (
    <Container>
      <strong>{title}</strong>

      <Link href={'/'}>
        <GoSignOut size={20} />
      </Link>
    </Container>
  )
}
