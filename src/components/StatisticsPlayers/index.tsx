import { ContentBox, ContentGrid } from '@/styles/pages/home'
import { BoxContent } from '../BoxContent'
import { DontHaveStatistics } from '../DontHaveStatistics'
import { teamPlayerDataProps } from '@/types/home'

interface statisticsPlayersProps {
  players: teamPlayerDataProps[]
}

export function StatisticsPlayers({ players }: statisticsPlayersProps) {
  return (
    <BoxContent>
      <header>
        <h4>Jogadores</h4>
      </header>

      {players && players.length > 0 ? (
        <ContentBox>
          <ContentGrid borderBottom grid>
            <strong>Nome</strong>
            <strong>Idade</strong>
            <strong>Oriundo</strong>
          </ContentGrid>

          {players.map((player) => (
            <ContentGrid key={player.name} borderBottom grid>
              <p>{player.name}</p>
              <p>{player.age}</p>
              <p>{player.nationality}</p>
            </ContentGrid>
          ))}
        </ContentBox>
      ) : (
        <DontHaveStatistics />
      )}
    </BoxContent>
  )
}
