import Image from 'next/image'
import { Container } from './styles'
import bad from '@/assets/bad.png'
import { HTMLAttributes } from 'react'

export function DontHaveStatistics({
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <Container {...rest}>
      <Image src={bad} alt="icon bad" width={80} height={80} />
      <strong>No content to display.</strong>
    </Container>
  )
}
