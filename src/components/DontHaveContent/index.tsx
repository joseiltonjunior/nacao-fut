import Image from 'next/image'
import { Container } from './styles'
import Link from 'next/link'

import soccerPlayer from '@/assets/icon-soccer-white.png'
import badIcon from '@/assets/bad.png'

interface dontHaveContentProps {
  restrictions?: boolean
}

export function DontHaveContent({ restrictions }: dontHaveContentProps) {
  return (
    <Container>
      {restrictions ? (
        <Image
          src={badIcon}
          alt="bad icon"
          width={100}
          height={100}
          style={{ marginBottom: '1rem' }}
        />
      ) : (
        <Image
          src={soccerPlayer}
          alt="soccer player"
          width={300}
          height={300}
        />
      )}
      <h3>
        {restrictions
          ? 'Oops, it was not possible to fetch the data because your API key has some restrictions.'
          : 'Conduct a search and stay informed about all the statistics of your team.'}
      </h3>
      {restrictions && (
        <Link href={'https://dashboard.api-football.com/'} target="_blank">
          Visit API Sports
        </Link>
      )}
    </Container>
  )
}
