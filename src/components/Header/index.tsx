import Link from 'next/link'
import { Container } from './styles'
import { GoSignOut } from 'react-icons/go'
import logo from '@/assets/soccer-player.png'
import Image from 'next/image'

interface headerProps {
  isAuth?: boolean
}

export function Header({ isAuth }: headerProps) {
  return (
    <Container>
      <div>
        <Image src={logo} alt="logo" width={40} height={40} />
        <strong>I Love Football - ILF</strong>
      </div>

      {!isAuth && (
        <Link href={'/'} title="SignOut">
          <GoSignOut size={20} />
        </Link>
      )}
    </Container>
  )
}
