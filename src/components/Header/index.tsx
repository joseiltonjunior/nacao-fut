import Link from 'next/link'
import { Container } from './styles'
import { GoSignOut } from 'react-icons/go'
import logo from '@/assets/icon-soccer-white.png'
import Image from 'next/image'

interface headerProps {
  isAuth?: boolean
}

export function Header({ isAuth }: headerProps) {
  return (
    <Container>
      <div>
        <Image src={logo} alt="logo" width={40} height={40} />
        <strong>Nação Fut</strong>
      </div>

      {!isAuth && (
        <Link href={'/'} title="Logout">
          <GoSignOut size={20} />
        </Link>
      )}
    </Container>
  )
}
