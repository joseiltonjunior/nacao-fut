import { teamResponseProps } from '@/types/home'
import Image from 'next/image'

interface statisticsTeamProps {
  team: teamResponseProps
}

export function StatisticsTeam({ team }: statisticsTeamProps) {
  return (
    <header>
      <Image
        src={team.logo}
        alt="logo team"
        width={80}
        height={80}
        style={{ borderRadius: 6 }}
      />
      <div>
        <strong>
          {team.name} - {team.code}
        </strong>
        <p>
          {team.country}, {team.founded}
        </p>
      </div>
    </header>
  )
}
